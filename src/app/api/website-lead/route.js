import { link } from 'fs';
import prisma from '../../../../lib/prisma';
import { getSessionFromToken } from "../session";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = parseInt(searchParams.get('id'));
    const website_leads_id = parseInt(searchParams.get('website_leads_id'));
    if (id) {
      const dataItem = await prisma.website_leads.findUnique({
        where: { website_leads_id: id },
      });
      return Response.json(dataItem);
    }
    var where = { flag: 0 }
    if (website_leads_id) {
      where.website_leads_id = website_leads_id;
    }
    const dataItems = await prisma.website_leads.findMany({
      where: where
    });
    return Response.json(dataItems);
  } catch (error) {
    console.error('Error fetching website_leadss:', error);
    return Response.json({ success: false, message: error.message }, { status: 500 });
  }
}


export async function POST(request) {
  const token = getSessionFromToken();
  try {
    const req = await request.json();
    const newwebsite_leads = await prisma.website_leads.create({
      data: {
        name: req.name,
        email: req.email,
        phone: req.phone,
        message: req.message,
        form_type: req.form_type,
        ipaddress: req.ipaddress || null,
        link: req.link || null,
        created_at: new Date(),
        created_by: 0,
        modified_at: new Date(),
        modified_by: 0,
        flag: 0,
        company_id: 0
      }
    });
    return Response.json(newwebsite_leads);
  } catch (error) {
    console.error('Error creating website_leads:', error);
    return Response.json({ success: false, message: error.message }, { status: 500 });
  }
}

// export async function PUT(request) {
//   const token = getSessionFromToken();
//   try {
//     const { searchParams } = new URL(request.url);

//     const req = await request.json();
//     const id = req.slug;
//     const updatedwebsite_leads = await prisma.website_leads.update({
//       where: { website_leads_id: id },
//       data: {
//         website_leads_name: req.website_leads_name,
//         state_id: parseInt(req.state_id),
//         modified_at: new Date(),
//         modified_by: token?.user_id || null
//       }
//     });
//     return Response.json(updatedwebsite_leads);
//   } catch (error) {
//     console.error('Error updating website_leads:', error);
//     return Response.json({ success: false, message: error.message }, { status: 500 });
//   }
// }

// export async function DELETE(request) {
//   const token = getSessionFromToken();
//   try {
//     const { searchParams } = new URL(request.url);
//     const id = parseInt(searchParams.get('id'));
//     //console.log("Deleting website_leads with id:", id);
//     const deletedwebsite_leads = await prisma.website_leads.update({
//       where: { website_leads_id: id },
//       data: { flag: 1, modified_by: token?.user_id || null, modified_at: new Date() }
//     });
//     return Response.json(deletedwebsite_leads);
//   } catch (error) {
//     console.error('Error deleting website_leads:', error);
//     return Response.json({ success: false, message: error.message }, { status: 500 });
//   }
// }


export const dynamic = "force-dynamic";