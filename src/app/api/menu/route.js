import prisma from '../../../../lib/prisma';

export async function GET() {
  // Groups with their menu items in one query (it used to be one query for the
  // groups plus one more per group).
  const menugroupItems = await prisma.menu_group.findMany({
    where: {
      flag: 0
    },
    select: {
      menu_group_id: true,
      menu_group_name: true,
      link: true,
      menu: {
        where: {
          parent_menu_id: {
            gt: -1
          }
        },
        orderBy: {
          sort_no: 'asc'
        }
      }
    },
    orderBy: {
      sort_no: 'asc'
    }
  });

  const menuItems = menugroupItems.map((group) => ({
    menu_group_name: group.menu_group_name,
    link: group.link,
    icon: "",
    menu_group_id: group.menu_group_id,
    menuItems: group.menu
  }));
  return Response.json(menuItems);
}
export const dynamic = "force-dynamic";
