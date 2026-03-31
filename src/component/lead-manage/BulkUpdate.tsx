import { Modal, Button, Form } from "react-bootstrap";
import LeadStatusList from "./LeadStatusList";
import UserList from "./UserList2";
import { useState } from "react";

const initialFormState = {
    lead_status_id: "",
    rm_user_id: "",
    status_remarks: ""
};

const BulkUpdateModal = ({
    show,
    handleClose,
    handleSubmit,
    bulkStatus,
    setBulkStatus,
    uniqueStatuses
}: any) => {
    const [form, setForm] = useState(initialFormState);
    setBulkStatus((prev: any) => ({
        ...prev,
        lead_status_id: form.lead_status_id,
        rm_user_id: form.rm_user_id,
        status_remarks: form.status_remarks
    }));
    return (
        <Modal show={show} onHide={handleClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>Bulk Update Leads</Modal.Title>
            </Modal.Header>

            <Modal.Body>

                {/* <Form.Group>
                    <Form.Label>Select Status</Form.Label>
                    <select
                        id="lead_status_id"
                        name="lead_status_id"
                        className="form-select border-white"
                        value={bulkStatus?.lead_status_id || ""}
                        onChange={(e) => setBulkStatus({ ...bulkStatus, lead_status_id: e.target.value })}
                    >
                        <LeadStatusList
                            name="lead_status_id"
                        />
                    </select>
                    <datalist id="statusList">
                        {uniqueStatuses.map((s: any) => (
                            <option key={s} value={s} />
                        ))}
                    </datalist>
                </Form.Group>

                <div className="col-md-12 pb-3">
                    <label htmlFor="source_id" className="form-label">
                        Source
                    </label>
                    <UserList form={form} setForm={setForm} />
                    <input type="hidden"
                        id="rm_user_id"
                        name="rm_user_id"
                        value={form.rm_user_id}
                    />
                </div>
                <div className="col-sm-6 ol-6">
                    <label htmlFor="remarks" className="form-label">Status Remarks</label>
                    <textarea
                        className="form-control"
                        id="status_remarks"
                        name="status_remarks"
                        value={form.status_remarks}
                        onChange={(e) => setForm({ ...form, status_remarks: e.target.value })}>
                    </textarea>
                </div> */}
            </Modal.Body>

            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Cancel
                </Button>
                <Button variant="primary" onClick={handleSubmit}>
                    Update
                </Button>
            </Modal.Footer>
        </Modal>
    );
};
export default BulkUpdateModal;