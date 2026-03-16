"use client"
import Link from "next/link";
import { accessMenuCheck } from "@/component/utils/common";
import { useEffect, useState } from "react";

export default function EditAction(props) {
    const [hasAccess, setHasAccess] = useState(false);
    useEffect(() => {
        setHasAccess(accessMenuCheck(props?.menu_id, 3));
    }, []);
    const getData = async (id) => {
        const edit_url = process.env.NEXT_PUBLIC_API_URL + props?.page + "?id=" + id;
        const response = await fetch(edit_url, {
            method: 'GET',
        });
        if (response.ok) {
            const result = await response.json();
            if (props?.setRecords) {
                props.setRecords(result);
            }
        }
    };
    return (
        <>
            {hasAccess &&
                <>
                    {props?.type === "link" ?
                        <Link title="Edit" className={`btn btn-sm btn-icon ${props?.iconclass ? "" : "btn-primary"}`} href={props?.link}>
                            <i className={`fa-light fa-edit ${props?.iconclass ? "text-info" : ""}`}></i>
                        </Link>
                        :
                        <button className={`btn btn-sm btn-icon ${props?.iconclass ? "" : "btn-primary"}`} onClick={() => getData(props?.id)}>
                            <i className={`fa-light fa-edit ${props?.iconclass ? "text-info" : ""}`}></i>
                        </button >
                    }
                </>
            }
        </>
    )
}