export const runtime = "nodejs";

import * as XLSX from "xlsx";
import fs from "fs";
import path from "path";
import prisma from "../../../../lib/prisma";
import { getSessionFromToken } from "../session";

export async function GET(request) {
  const token = getSessionFromToken();
  // console.log("Session in GET:", token?.user_id);
  return Response.json({ message: "Lead upload endpoint" });
}

// Generic upsert helper
const getOrCreate = async (
  model,
  uniqueField,
  name,
  extraData = {},
  token
) => {
  if (!name) return null;

  const data = {
    [uniqueField]: name,
    created_at: new Date(),
    created_by: token?.user_id ?? null,
    ...extraData,
  };

  const record = await prisma[model].upsert({
    where: { [uniqueField]: name },
    update: {},
    create: data,
    select: { [`${model}_id`]: true },
  });

  return record[`${model}_id`];
};

export async function POST(request) {
  const token = getSessionFromToken();

  try {
    const formData = await request.formData();
    const file = formData.get("file");

    if (!file)
      return Response.json({ error: "No file uploaded" }, { status: 400 });

    const buffer = Buffer.from(await file.arrayBuffer());
    const uploadDir = path.join(process.cwd(), "src/uploads/leads");

    if (!fs.existsSync(uploadDir))
      fs.mkdirSync(uploadDir, { recursive: true });

    const fileName = `${Date.now()}_${file.name}`;
    const filePath = path.join(uploadDir, fileName);
    fs.writeFileSync(filePath, buffer);

    const workbook = XLSX.read(buffer, { type: "buffer" });
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    const rows = XLSX.utils.sheet_to_json(sheet);

    const leadFile = await prisma.lead_file.create({
      data: {
        lead_file_name: fileName,
        file_path: filePath,
        created_at: new Date(),
        created_by: token?.user_id ?? null,
      },
    });

    if (!leadFile)
      return Response.json(
        { error: "Failed to save file metadata" },
        { status: 500 }
      );

    // Insert each lead row
    let duplicateCount = []
    let rowIndex = 1; // Start from 1 to account for header row
    for (const row of rows) {
      let rm_user_id = token?.user_id ?? null;
      if(row.user_name) {
        const user_data = await prisma.user.findFirst({
          where: {
            name: String(row.user_name ?? "").trim()
          }
        });
        if(user_data) {
          rm_user_id = user_data?.user_id;
        }
      }
      const projectId = await getOrCreate(
        "project",
        "project_name",
        String(row.project),
        { city_id: 1 },
        token
      );

      const sourceId = await getOrCreate(
        "source",
        "source_name",
        String(row.source),
        {},
        token
      );

      const subSourceId = await getOrCreate(
        "sub_source",
        "sub_source_name",
        String(row.sub_source),
        { source_id: sourceId },
        token
      );

      const duplicateLead = await prisma.lead.findFirst({
        where: {
          mobile_no: String(row.mobile_no),
          project_id: parseInt(projectId),
          flag: 0
        }
      });
      if (duplicateLead && process.env.NEXT_PUBLIC_DUPLICATE_LEADS === "yes") {
        duplicateCount.push({ row: rowIndex, customer_name: row.customer_name, mobile_no: row.mobile_no, project: String(row.project) });
      } else {
        const lead_data = await prisma.lead.create({
          data: {
            created_at: new Date(),
            customer_name: row.customer_name,
            mobile_no: String(row.mobile_no ?? ""),
            email_id: row.email_id ?? null,
            alternate_no: String(row.alternate_no ?? ""),
            whatsapp_no: String(row.mobile_no ?? ""),
            alternate_email: row.email_id ?? null,
            project_id: projectId ?? 0,
            source_id: Number(sourceId) ?? 0,
            sub_source_id: Number(subSourceId) ?? 0,
            rm_user_id: rm_user_id,
            lead_status_id: 1,
            lead_file_id: leadFile.lead_file_id,
            remarks: row.remarks ?? "",
            created_by: token?.user_id ?? null,
          },
        });
        if (lead_data) {
          await prisma.lead_status_entry.create({
            data: {
              lead_id: lead_data?.lead_id,
              created_by: token?.user_id ?? null,
              created_at: new Date(),
              from_status_id: 0,
              to_status_id: 1,
              rm_user_id: rm_user_id,
            },
          });
        }
      }
      rowIndex++;
    }
    console.log("Duplicate Leads:", duplicateCount);
    let message = `Docs uploaded successfully. ${duplicateCount.length} duplicate leads found.`;
    return Response.json({
      message: message,
      file: fileName,
      duplicate_leads: duplicateCount
    });
  } catch (error) {
    console.error("UPLOAD ERROR:", error);
    return Response.json({ error: "Upload failed" }, { status: 500 });
  }
}

export const dynamic = "force-dynamic";