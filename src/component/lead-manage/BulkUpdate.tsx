import { Modal, Button, Form } from "react-bootstrap";
import UserList from "./UserList2";
import { useState, useEffect } from "react";

interface BulkUpdateModalProps {
  show: boolean;
  lead_id: string;
  selectedLeads?: string[]; // array of lead IDs
}

interface LeadStatus {
  lead_status_id: string;
  lead_status_name: string;
}

const BulkUpdateModal = ({
  show,
  selectedLeads,
}: BulkUpdateModalProps) => {
  const [bulkForm, setBulkForm] = useState({
    lead_status_id: "",
    rm_user_id: "",
    status_remarks: "",
  });

  const [data, setData] = useState<LeadStatus[]>([]);

  // Fetch lead statuses once
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          process.env.NEXT_PUBLIC_API_URL + "/lead-status"
        );
        const result = await response.json();
        setData(result);
      } catch (err) {
        console.error("Failed to fetch lead statuses:", err);
      }
    };

    fetchData();
  }, []);

  // Submit bulk update
  const submitBulkUpdate = async () => {
    try {
      const ids: string[] = selectedLeads ?? [];

      const response = await fetch(
        process.env.NEXT_PUBLIC_API_URL + "/lead/bulk-update",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            lead_ids: ids,
            lead_status_id: bulkForm.lead_status_id,
            rm_user_id: bulkForm.rm_user_id,
            status_remarks: bulkForm.status_remarks,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Bulk update failed");
      }

      console.log("Bulk update successful");
    } catch (err) {
      console.error("Error:", err);
    } finally {
      // optional refresh logic
      if (typeof window !== "undefined") {
        window.location.reload();
      }
    }
  };

  return (
    <Modal show={show} onHide={() => {}} centered>
      <Modal.Header closeButton>
        <Modal.Title>Bulk Update Leads</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        {/* Status Selector */}
        <Form.Group className="mb-3">
          <Form.Label>Select Status</Form.Label>
          <select
            className="form-select"
            value={bulkForm.lead_status_id}
            onChange={(e) =>
              setBulkForm({
                ...bulkForm,
                lead_status_id: e.target.value,
              })
            }
          >
            <option value="">Select Status</option>
            {data.map((item) => (
              <option
                key={item.lead_status_id}
                value={item.lead_status_id}
              >
                {item.lead_status_name}
              </option>
            ))}
          </select>
        </Form.Group>

        {/* Assign User */}
        <Form.Group className="mb-3">
          <Form.Label>Assign User</Form.Label>
          <UserList form={bulkForm} setForm={setBulkForm} />
        </Form.Group>

        {/* Remarks */}
        <Form.Group className="mb-3">
          <Form.Label>Status Remarks</Form.Label>
          <textarea
            className="form-control"
            value={bulkForm.status_remarks}
            onChange={(e) =>
              setBulkForm({
                ...bulkForm,
                status_remarks: e.target.value,
              })
            }
          />
        </Form.Group>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={() => {}}>
          Cancel
        </Button>

        <Button variant="primary" onClick={submitBulkUpdate}>
          Update
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default BulkUpdateModal;