import { Modal, Button, Form } from "react-bootstrap";
import LeadStatusList from "./LeadStatusList";
import UserList from "./UserList2";
import { useState, useEffect } from "react";

interface BulkUpdateModalProps {
  show: boolean;
  handleClose: () => void;
  handleSubmit: () => void;
  bulkStatus: any;
  setBulkStatus: (status: any) => void;
  uniqueStatuses: any[];
}

const BulkUpdateModal = ({
  show,
  handleClose,
  handleSubmit,
  bulkStatus,
  setBulkStatus,
  uniqueStatuses
}: BulkUpdateModalProps) => {
  // Local form state
  const [form, setForm] = useState({
    lead_status_id: "",
    rm_user_id: "",
    status_remarks: ""
  });

  // Sync parent bulkStatus to local form when modal opens
  useEffect(() => {
    if (show) {
      setForm({
        lead_status_id: bulkStatus?.lead_status_id || "",
        rm_user_id: bulkStatus?.rm_user_id || "",
        status_remarks: bulkStatus?.status_remarks || ""
      });
    }
  }, [show, bulkStatus]);

  // Optional: Update parent state whenever form changes
  useEffect(() => {
    setBulkStatus(form);
  }, [form, setBulkStatus]);

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Bulk Update Leads</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        {/* Status Selector */}
        <Form.Group className="mb-3">
          <Form.Label>Select Status</Form.Label>
          <select
            className="form-select"
            value={form.lead_status_id}
            onChange={(e) => setForm({ ...form, lead_status_id: e.target.value })}
          >
            <option value="">Select Status</option>
            {uniqueStatuses.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </Form.Group>

        {/* Assigned User Selector */}
        <Form.Group className="mb-3">
          <Form.Label>Assign User</Form.Label>
          <UserList form={form} setForm={setForm} />
        </Form.Group>

        {/* Status Remarks */}
        <Form.Group className="mb-3">
          <Form.Label>Status Remarks</Form.Label>
          <textarea
            className="form-control"
            value={form.status_remarks}
            onChange={(e) => setForm({ ...form, status_remarks: e.target.value })}
          />
        </Form.Group>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancel
        </Button>
        <Button
          variant="primary"
          onClick={() => {
            handleSubmit(); // Submit parent handler
            handleClose(); // Close modal after submit
          }}
          disabled={!form.lead_status_id} // Disable if status not selected
        >
          Update
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default BulkUpdateModal;