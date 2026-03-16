"use client"
import React from 'react'
import { useState, useEffect } from 'react'
import EditAction from '../action/Edit'
import DeleteAction from "../action/Delete"
import SourceName from './SourceName'
import { SUB_SOURCE_MENU_ID } from "@/data/constants";
const Admin = (props: any) => {
    const [data, setData] = useState<Array<any>>([]);
    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(process.env.NEXT_PUBLIC_API_URL + '/sub-source');
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
                                <th>Sub Source</th>
                                <th>State</th>
                                <th>Created At</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((item) => (
                                <tr key={item?.sub_source_id}>
                                    <td>{item?.sub_source_name}</td>
                                    <td><SourceName source_id={item?.source_id} /></td>
                                    <td>{new Date(item?.created_at).toLocaleDateString(process.env.NEXT_PUBLIC_DATE_FORMAT)}</td>
                                    <td>
                                        <div className="btn-box">
                                        <EditAction menu_id={SUB_SOURCE_MENU_ID} id={item?.sub_source_id} page="sub-source" setRecords={props?.setRecords} />
                                        <DeleteAction menu_id={SUB_SOURCE_MENU_ID} id={item?.sub_source_id} page="sub-source" setRefresh={props?.setRefresh} />
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