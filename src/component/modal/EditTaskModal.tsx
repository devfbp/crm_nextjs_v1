"use client";
import React from "react";
import { Modal, Button, Form } from "react-bootstrap";
import Select from "react-select";
import DynamicEditor from "../ck-editor/DynamicEditor";
import { editTaskModalOptions } from "@/data/data";
import { useDigiContext } from "@/context/DigiContext";

const EditTaskModal = () => {
  const { editTaskModalOpen, handleEditTaskModalClose } = useDigiContext();
  return (
    <div>
      <Modal
        show={editTaskModalOpen}
        onHide={handleEditTaskModalClose}
        size="lg"
        centered
      >
        <Modal.Header>
          <Modal.Title>Edit Task</Modal.Title>
          <Button
            variant="outline-primary"
            size="sm"
            onClick={handleEditTaskModalClose}
          >
            <i className="fa-light fa-times"></i>
          </Button>
        </Modal.Header>
        <Modal.Body>
          <div className="row g-3">
            <div className="col-12">
              <label htmlFor="editTaskName" className="form-label">
                Name
              </label>
              <input
                type="text"
                id="editTaskName"
                className="form-control form-control-sm"
                placeholder="Task Name"
                value="Web Design & Development"
              />
            </div>
            <div className="col-12">
              <label htmlFor="editTaskAttchment" className="form-label">
                Attach File
              </label>
              <input
                type="file"
                id="editTaskAttchment"
                className="form-control form-control-sm"
                multiple
              />
            </div>
            <div className="col-sm-6">
              <label htmlFor="editTaskStartDate" className="form-label">
                Start Date
              </label>
              <input
                type="text"
                id="editTaskStartDate"
                className="form-control form-control-sm date-picker"
                placeholder="Eg: 12 Feb, 20"
                value="12 Feb, 23"
                readOnly
              />
            </div>
            <div className="col-sm-6">
              <label htmlFor="editTaskEndDate" className="form-label">
                End Date
              </label>
              <input
                type="text"
                id="editTaskEndDate"
                className="form-control form-control-sm date-picker"
                placeholder="Eg: 12 Feb, 20"
                value="12 Mar, 23"
                readOnly
              />
            </div>
            <div className="col-sm-6">
              <label className="form-label">Priority</label>
              <Form.Select
                className="form-control form-control-sm"
                data-placeholder="Select Priority"
              >
                <option value="">Select Priority</option>
                <option value="low">Low</option>
                <option value="medium" selected>
                  Medium
                </option>
                <option value="high">High</option>
                <option value="urgent">Urgent</option>
              </Form.Select>
            </div>
            <div className="col-sm-6">
              <label className="form-label">Repeat every</label>
              <Form.Select
                className="form-control form-control-sm"
                data-placeholder="Select Time"
              >
                <option value="">Select Time</option>
                <option value="week">Week</option>
                <option value="2week" selected>
                  2 Weeks
                </option>
                <option value="month">1 Month</option>
                <option value="2months">2 Months</option>
                <option value="3months">3 Months</option>
                <option value="6months">6 Months</option>
                <option value="year">1 Year</option>
              </Form.Select>
            </div>
            <div className="col-12">
              <label className="form-label">Assign To</label>
              <Select
                isMulti
                options={editTaskModalOptions}
                placeholder="Eg: Natasha Hancock"
              />
            </div>
            <div className="col-12">
              <label className="form-label">Task Description</label>
              <DynamicEditor />
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleEditTaskModalClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleEditTaskModalClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default EditTaskModal;
