"use client"
import React from 'react'
import { useState, useEffect } from 'react'
import EditAction from '../action/Edit'
import DeleteAction from "../action/Delete"
import { LEAD_STATUS_MENU_ID } from "@/data/constants";

const Admin = (props: any) => {
    const [data, setData] = useState<Array<any>>([]);
    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(process.env.NEXT_PUBLIC_API_URL + '/lead-status');
            const result = await response.json();
            setData(result);
        };
        fetchData();
    }, [props]);   

    return (
        <div className="panel">
            {/* <div className="panel-header">
                <h5 className='underline'>Add New {props.title}</h5>
            </div> */}
            {/* <h1>Parent count:- {props.count}</h1> */}
            <div className="panel-body p-0">
                <div className="table-responsive">
                    <table className="table table-dashed table-hover digi-dataTable attendance-table table-striped">
                        <thead>
                            <tr>
                                <th>Lead Status</th>
                                <th>Created At</th>
                                <th>Action</th> 
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((item) => (
                                <tr key={item?.lead_status_id}>
                                    <td>{item?.lead_status_name}</td>
                                    <td>{new Date(item?.created_at).toLocaleDateString(process.env.NEXT_PUBLIC_DATE_FORMAT)}</td>
                                    <td>
                                        <div className="btn-box">
                                        <EditAction menu_id={LEAD_STATUS_MENU_ID} id={item?.lead_status_id} page="lead-status" setRecords={props?.setRecords} />
                                        <DeleteAction menu_id={LEAD_STATUS_MENU_ID} id={item?.lead_status_id} page="lead-status" setRefresh={props?.setRefresh} />
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div >
    )
}

export default Admin