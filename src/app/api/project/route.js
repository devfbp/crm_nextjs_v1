import prisma from '../../../../lib/prisma';
import { getSessionFromToken } from "../session";

/**
 * @swagger
 * /project:
 *   get:
 *     summary: Get projects
 *     tags: [Projects]
 *     parameters:
 *       - in: query
 *         name: id
 *         schema:
 *           type: integer
 *       - in: query
 *         name: project_id
 *         schema:
 *           type: integer
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *       - in: query
 *         name: orderBy
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of projects
 */
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = parseInt(searchParams.get('id'));
    const project_id = parseInt(searchParams.get('project_id'));
    const search = searchParams.get('search');
    var limit = parseInt(searchParams.get('limit')) || 10000;
    var orderBy = searchParams.get('orderBy') || 'project_name';
    // console.log(search);
    if (id) {
      const dataItem = await prisma.project.findUnique({
        where: { project_id: id },
      });
      return Response.json(dataItem);
    }
    var where = { flag: 0 }
    if (project_id) {
      where.project_id = project_id;
    }
    if (search) {
      where.project_name = {
        contains: search.toString(),
      };
    }
    // console.log("Where clause for project query:", where);
    const dataItems = await prisma.project.findMany({
      where: where,
      take: limit,
      orderBy: {
        [orderBy]: 'asc'
      }
    });
    return Response.json(dataItems);
  } catch (error) {
    console.error('Error fetching projects:', error);
    return Response.json({ success: false, message: error.message }, { status: 500 });
  }
}


/**
 * @swagger
 * /project:
 *   post:
 *     summary: Create a new project
 *     tags: [Projects]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - project_name
 *               - city_id
 *             properties:
 *               project_name:
 *                 type: string
 *               city_id:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Project created successfully
 */
export async function POST(request) {
  const token = getSessionFromToken();
  try {
    const req = await request.json();
    const newproject = await prisma.project.create({
      data: {
        project_name: req.project_name,
        city_id: parseInt(req.city_id),
        created_at: new Date(),
        created_by: token?.user_id || null
      }
    });
    return Response.json(newproject);
  } catch (error) {
    console.error('Error creating project:', error);
    return Response.json({ success: false, message: error.message }, { status: 500 });
  }
}

/**
 * @swagger
 * /project:
 *   put:
 *     summary: Update a project
 *     tags: [Projects]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - slug
 *             properties:
 *               slug:
 *                 type: integer
 *               project_name:
 *                 type: string
 *               city_id:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Project updated successfully
 */
export async function PUT(request) {
  const token = getSessionFromToken();
  try {
    const { searchParams } = new URL(request.url);
    
    const req = await request.json();
    const id = req.slug;
    const updatedproject = await prisma.project.update({
      where: { project_id: id },
      data: {
        project_name: req.project_name,
        city_id: parseInt(req.city_id),
        modified_at: new Date(),
        modified_by: token?.user_id || null
      }
    });
    return Response.json(updatedproject);
  } catch (error) {
    console.error('Error updating project:', error);
    return Response.json({ success: false, message: error.message }, { status: 500 });
  }
}

/**
 * @swagger
 * /project:
 *   delete:
 *     summary: Delete a project
 *     tags: [Projects]
 *     parameters:
 *       - in: query
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Project deleted successfully
 */
export async function DELETE(request) {
  const token = getSessionFromToken();
  try {
    const { searchParams } = new URL(request.url);
    const id = parseInt(searchParams.get('id'));
    //console.log("Deleting project with id:", id);
    const deletedproject = await prisma.project.update({
      where: { project_id: id },
      data: { flag: 1, modified_at: new Date(), modified_by: token?.user_id || null }
    });
    return Response.json(deletedproject);
  } catch (error) {
    console.error('Error deleting project:', error);
    return Response.json({ success: false, message: error.message }, { status: 500 });
  }
}


export const dynamic = "force-dynamic";