import { Modal, Button, Form } from "react-bootstrap";
import LeadStatusList from "./LeadStatusList";
import { useEffect, useState } from "react";

const LeadHistory = ({
    show,
    handleClose,
    bulkStatus,
    setBulkStatus,
    uniqueStatuses,
    slug
}: any) => {
    const [records, setRecords] = useState<any>(null);
    // console.log("Lead History Slug:", slug);
    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(process.env.NEXT_PUBLIC_API_URL + '/lead-status-entry?lead_view=1&lead_id=' + slug?.lead_id);
            const result = await response.json();
            // console.log("Fetched Records:", result);
            setRecords(result);
        };
        fetchData();
    }, [slug]);
    return (
        <Modal show={show} onHide={handleClose} size="xl" top="true" >
            <Modal.Header closeButton>
                <Modal.Title>Lead History: {slug?.customer_name}, {slug?.mobile_no}</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <div className="col-12">
                    <div className="card">
                        <table
                            className="table table-dashed table-hover digi-dataTable leads-table table-striped"
                            id="leadsTable"
                        >
                            <thead>
                                <tr>
                                    <th>Created User</th>
                                    <th>Created Date</th>
                                    <th>From User</th>
                                    <th>To User</th>
                                    <th>From Status</th>
                                    <th>To Status</th>
                                    <th>Status Remarks</th>
                                </tr>
                            </thead>

                            <tbody>
                                {records &&
                                    records?.map((item: any, index: number) => {
                                        return (
                                            <tr key={index}>
                                                <td>{item.user_name}</td>
                                                <td>{item.display_created_at}</td>
                                                <td>{item.from_user_name}</td>
                                                <td>{item.user_name}</td>
                                                <td>{item.from_status}</td>
                                                <td>{item.to_status}</td>
                                                <td>{item.remarks}</td>
                                            </tr>
                                        );
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </Modal.Body>
            
        </Modal>
    );
};
export default LeadHistory;