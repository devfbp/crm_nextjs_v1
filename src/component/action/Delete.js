"use client"
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation';
import { accessMenuCheck } from "@/component/utils/common";

export default function DeleteAction(props) {
    const [hasAccess, setHasAccess] = useState(false);
    useEffect(() => {
        setHasAccess(accessMenuCheck(props?.menu_id, 4));
    }, []);
    const router = useRouter();
    const [isDeleteId, setIsDeleteId] = useState(null)
    const MySwal = withReactContent(Swal);
    const deleteRole = async (id) => {
        MySwal.fire({
            title: "Are you sure?",
            text: "Do you want to do this action?",
            icon: "warning",
            showCancelButton: !0,
            confirmButtonText: "Yes, Do it!",
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
                setIsDeleteId(id)
            }
        });

    };

    useEffect(() => {
        deleteData();
    }, [isDeleteId]);
    const deleteData = async () => {
        if (isDeleteId) {
            const delete_url = process.env.NEXT_PUBLIC_API_URL + props?.page + "?id=" + isDeleteId;
            const response = await fetch(delete_url, {
                method: 'DELETE',
            });
            if (response.ok) {
                //setData(data.filter(item => item.role_id !== id));
                //toast.error("Record deleted");
                // props?.setRefresh((prev) => !prev);
                
                if (typeof window !== "undefined" && props?.reload) {
                    window.location.reload();
                } else {
                    router.refresh();
                }
            }
        }
    };
    return (
        <>
            {hasAccess &&
                <>
                    <button title="Delete" className={`btn btn-sm btn-icon ${props?.iconclass ? "" : "btn-danger"}`} onClick={() => deleteRole(props?.id)}>
                        <i className={`fa-light fa-trash-can ${props?.iconclass ? "text-danger" : ""}`}></i>
                    </button>
                </>

            }
        </>
    )
}