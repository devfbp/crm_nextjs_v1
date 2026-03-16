import React from "react";
import { Modal, Button } from "react-bootstrap";
type Props = {
  show: boolean;
  handleClose: () => void;
  handleDelete: () => void;
};
const DeleteConfirmationModal = ({
  show,
  handleClose,
  handleDelete,
}: Props) => {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Confirm Delete</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p className="delete-confirmation">
          Are you sure you want to delete the event?
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancel
        </Button>
        <Button variant="danger" onClick={handleDelete}>
          Delete
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DeleteConfirmationModal;
