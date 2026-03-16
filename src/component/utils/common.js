import { useRouter } from 'next/navigation';
import Cryptr from "cryptr";
import Cookies from 'js-cookie';

export function navigatePage(path) {
    //   const router = useRouter();
    //   router.push(path);
    if (typeof window !== 'undefined') {
        window.location.href = path;
    }
}
export function getUserSessionData() {
    const cookieValue = Cookies.get("7hLIAH2Jk3hGd6s");
    if (cookieValue) {
        return JSON.parse(cookieValue);
    }
    return null;
}

export function accessMenuCheck(menu_id, access = 1) {
    const sessionData = getUserSessionData();
    var menu_id_str = menu_id?.toString();
    // console.log("accessMenuCheck sessionData:", sessionData);
    if (sessionData?.role_id === 1) {
        return true;
    }
    if (menu_id_str && sessionData && sessionData.access_menu && sessionData.role_id) {
        // const accessMenu = JSON.parse(sessionData.access_menu);
        var checkAccess = null;
        if (access === 0) {
            checkAccess = sessionData.access_menu?.parent_menu;
        }
        if (access === 1) {
            checkAccess = sessionData.access_menu?.view;
        }
        if (access === 2) {
            checkAccess = sessionData.access_menu?.create;
        }
        if (access === 3) {
            checkAccess = sessionData.access_menu?.edit;
        }
        if (access === 4) {
            checkAccess = sessionData.access_menu?.delete;
        }

        // console.log("checkAccess :" + menu_id, checkAccess);
        if (checkAccess?.includes(menu_id_str)) {
            if (menu_id_str === "10") {
                // console.log("action", access);
            }
            return true;
        }
        // if(accessMenu[menu_id] && accessMenu[menu_id].includes(access)){
        //     return true;
        // }
    }
    return false;
}