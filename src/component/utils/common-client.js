"use client";
import Cookies from 'js-cookie';
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { toast } from "react-toastify";

export async function form_submit_call(props) {
    // console.log("SubmitCall props:", props);
    const res = await fetch(process.env.NEXT_PUBLIC_API_URL + "/" + props?.endpoint, {
        method: props?.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(props?.data),
    });
    if (res.ok) {
        const responseData = await res.json();
        toast.success(responseData.message || "Operation successful");
        return responseData;
        // alert(responseData.message);
        // navigatePage('/' + props?.endpoint);
    } else {
        const error = await res.json();
        toast.error(error.message || "Operation failed");
        return error;
        // alert(error.message);
    }
    return
}

export function getUserSessionData() {
    const cookieValue = Cookies.get("7hLIAH2Jk3hGd6s");
    if (cookieValue) {
        return JSON.parse(cookieValue);
    }
    return null;
}
export function displayDate(isoDate) {
    if (!isoDate) return "";
    const date = new Date(isoDate);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
};

export function parseDate(ddmmyyyy) {
    const [day, month, year] = ddmmyyyy.split("-");
    return `${year}-${month}-${day}`;
};

export function confrimAlert() {
    const MySwal = withReactContent(Swal);
    MySwal.fire({
        title: "Are you sure?",
        text: "Do you want to do this action?",
        icon: "warning",
        showCancelButton: !0,
        confirmButtonText: "Yes, delete it!",
        buttonsStyling: !1,
        showCloseButton: !0,
        closeButtonHtml: "<i class='fa-light fa-xmark'></i>",
        customClass: {
            closeButton: "btn btn-sm btn-icon btn-danger",
            confirmButton: "btn btn-sm btn-primary",
            cancelButton: "btn btn-sm btn-danger",
        },
    }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
            MySwal.fire("Saved!", "", "success");
            return true;
        }
        // else if (result.isDenied) {
        //     //Swal.fire("Changes are not saved", "", "info");
        // }
    });
    return false;
}
export async function getAll(endpoint) {
    if (!endpoint) {
        return [];
    }
    const response = await fetch(process.env.NEXT_PUBLIC_API_URL + '/' + endpoint);
    const data = await response.json();
    if (data.length === 0) {
        return '';
    }
    // console.log("getall:", data);
    return data;
}
export async function statusName(props) {
    const response = await fetch(process.env.NEXT_PUBLIC_API_URL + '/lead-status?status_id=' + props.status_id);
    const data = await response.json();
    if (data.length === 0) {
        return '';
    }
    return data[0].lead_status_name;
}
export async function projectName(props) {
    const response = await fetch(process.env.NEXT_PUBLIC_API_URL + '/project?project_id=' + props.project_id);
    const data = await response.json();
    if (data.length === 0) {
        return '';
    }
    return data[0].project_name;
}
export function showDateTime(isoDate) {
    if (!isoDate) return "";
    return new Date(isoDate).toLocaleString("en-IN", {
        timeZone: "Asia/Kolkata",
    })
}