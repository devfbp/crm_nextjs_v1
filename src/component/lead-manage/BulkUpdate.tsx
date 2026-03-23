import { Modal, Button, Form } from "react-bootstrap";
import LeadStatusList from "./LeadStatusList";

const BulkUpdateModal = ({
    show,
    handleClose,
    handleSubmit,
    bulkStatus,
    setBulkStatus,
    uniqueStatuses
}: any) => {
    return (
        <Modal show={show} onHide={handleClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>Bulk Update Leads</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Form.Group>
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