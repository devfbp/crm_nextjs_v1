import React from "react";
import prisma from '../../../../lib/prisma';
import { link } from "fs";

export async function GET() {
  const menugroupItems = await prisma.menu_group.findMany({
    where: {
      flag: 0
    },
    select: {
      ['menu_group_id']: true, ['menu_group_name']: true, ['link']: true
    },
    orderBy: {
      sort_no: 'asc'
    }
  });
  var menuItems = [];
  for (let i = 0; i < menugroupItems.length; i++) {
    const groupId = menugroupItems[i]?.menu_group_id;
    const groupName = menugroupItems[i]?.menu_group_name;
    const groupLink = menugroupItems[i]?.link;

    //menuItems.push(groupMenuHeader);
    const groupMenus = await prisma.menu.findMany({
      where: {
        menu_group_id: groupId,
        parent_menu_id: {
          gt: -1
        }
      },
      orderBy: {
        sort_no: 'asc'
      }
    });
    let groupMenuHeader = {
      menu_group_name: groupName,
      link: groupLink,
      icon: "",
      menu_group_id: groupId,
      menuItems: groupMenus
    }
    menuItems.push(groupMenuHeader);
  }
  // const menuItems = await prisma.menu.findMany({
  //   where : {
  //     parent_menu_id: {
  //       gt:-1
  //     }
  //   }
  // });
  // console.log("Menu Items:", menuItems);
  return Response.json(menuItems);
}
export const dynamic = "force-dynamic";