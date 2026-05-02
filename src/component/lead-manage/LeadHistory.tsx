import { Modal } from "react-bootstrap";
import History from "./History";

const LeadHistory = ({ show, handleClose, slug }: any) => {


    return (
        <Modal show={show} onHide={handleClose} size="xl">
            <Modal.Header closeButton>
                <Modal.Title>
                    Lead History: {slug?.customer_name}, {slug?.mobile_no}
                </Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <History lead_id={slug?.lead_id} />
            </Modal.Body>
        </Modal>
    );
};

export default LeadHistory;