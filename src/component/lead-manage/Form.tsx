"use client";

import React, { useState, useRef, useEffect } from "react";
import { toast } from "react-toastify";
import SubSourceList from "./SubSourceList2";
import LeadStatusList from "./LeadStatusList";
import UserList from "./UserList2";
import ProjectList from "./ProjectList2";
import SourceList from "./SourceList2";
import { leadSchema } from "../../../lib/validation";
import DatePicker from "react-datepicker";
import { form_submit_call, displayDate, parseDate } from "../utils/common-client";
import "react-datepicker/dist/react-datepicker.css";

interface InputFormProps {
  records?: {
    slug: any,
    lead_id: string,
    customer_name: string,
    mobile_no: string,
    email_id: string,
    alternate_no: string,
    // whatsapp_no: string,
    alternate_email: string,
    project_id: any,
    source_id: any,
    sub_source_id: any,
    rm_user_id: any,
    lead_status_id: string,
    lead_file_id: string,
    remarks: string,
    schedule_date: any,
  },
  setRecords?: (records: any) => void;
  editid: any;

}

const initialFormState = {
  slug: "",
  lead_id: "",
  customer_name: "",
  mobile_no: "",
  email_id: "",
  alternate_no: "",
  // whatsapp_no: "",
  alternate_email: "",
  project_id: "",
  source_id: "",
  sub_source_id: "",
  rm_user_id: "",
  lead_status_id: "",
  lead_file_id: "",
  remarks: "",
  schedule_date: "",
};

const InputForm: React.FC<InputFormProps> = ({ records }) => {
  const formRef = useRef<HTMLFormElement>(null);

  const [form, setForm] = useState(initialFormState);
  const [submitConfig, setSubmitConfig] = useState({
    action: 1, // 1 = add, 2 = edit
    endpoint: "lead",
  });
  const [errors, setErrors] = useState<Record<string, string[]>>({});
  const [selectedSourceId, setSelectedSourceId] = useState(null);
  // Populate form when editing
  useEffect(() => {
    if (!records) return;

    setForm({
      slug: records.lead_id,
      lead_id: records.lead_id,
      customer_name: records.customer_name,
      mobile_no: records.mobile_no,
      email_id: records.email_id,
      alternate_no: records.alternate_no,
      // whatsapp_no: records.whatsapp_no,
      alternate_email: records.alternate_email,
      project_id: records.project_id,
      source_id: records.source_id,
      sub_source_id: records.sub_source_id,
      rm_user_id: records.rm_user_id,
      lead_status_id: records.lead_status_id,
      lead_file_id: records.lead_file_id,
      remarks: records.remarks,
      schedule_date: records.schedule_date,
    });

    setSubmitConfig((prev) => ({ ...prev, action: 2 }));
  }, [records]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const validation = leadSchema.safeParse({
      customer_name: form.customer_name,
      mobile_no: form.mobile_no,
      email_id: form.email_id,
      alternate_no: form.alternate_no,
      alternate_email: form.alternate_email,
      project_id: form.project_id,
      source_id: form.source_id,
      sub_source_id: form.sub_source_id,
      rm_user_id: form.rm_user_id,
      lead_status_id: form.lead_status_id
    });

    if (!validation.success) {
      setErrors(validation.error.flatten().fieldErrors);
      return;
    }

    setErrors({});

    const payload = {
      action: submitConfig.action,
      method: submitConfig.action === 1 ? "POST" : "PUT",
      endpoint: submitConfig.endpoint,
      data: form,
    };

    try {
      await form_submit_call(payload);
      // console.log("Form submitted successfully", payload);
      // setForm(initialFormState);
      // setSubmitConfig({ action: 1, endpoint: "lead" });
      if (typeof window !== "undefined") {
        // if (submitConfig.action === 2) {
        //   // toast.success("Lead added successfully!");
        //   window.location.href = "/leads";
        // } else {
        //   // toast.success("Lead updated successfully!");
        //   window.location.reload();
        // }
        // window.location.href = "/leads";
      }

    } catch (err: any) {
      console.error("Submit error:", err);
      toast.error(err?.message || "Failed to submit");
    }
  };

  const handleReset = () => {
    setForm(initialFormState);
    setSubmitConfig({ action: 1, endpoint: "lead" });
    setErrors({});
    formRef.current?.reset();
  };

  return (
    <div className="card mb-20">
      <div className="card-body">
        <form className="row g-3" ref={formRef} onSubmit={handleSubmit}>
          {/* Hidden ID for edit */}
          <input type="hidden" name="slug" value={form.slug} />

          <div className="col-md-4 pb-3">
            <label htmlFor="name" className="form-label">
              Customer Name
            </label>
            <input
              type="text"
              id="customer_name"
              name="name"
              className="form-control"
              value={form.customer_name}
              onChange={(e) =>
                setForm({ ...form, customer_name: e.target.value })
              }
              autoComplete="off"
              placeholder=""
            />
            {errors.customer_name && (
              <p className="text-danger">{errors.customer_name[0]}</p>
            )}
          </div>

          <div className="col-md-4 pb-3">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <div className="input-group-with-icon">
              <span className="input-icon">
                <i className="fa-light fa-envelope"></i>
              </span>
              <input
                type="email"
                id="email_id"
                name="email_id"
                className="form-control"
                value={form.email_id}
                onChange={(e) =>
                  setForm({ ...form, email_id: e.target.value })
                }
                autoComplete="off"
                placeholder="test@gmail"
              />

            </div>
            {errors.email_id && (
              <p className="text-danger">{errors.email_id[0]}</p>
            )}
          </div>
          <div className="col-md-4 pb-3">
            <label htmlFor="alternate_email" className="form-label">
              Alternate Email
            </label>
            <div className="input-group-with-icon">
              <span className="input-icon">
                <i className="fa-light fa-envelope"></i>
              </span>
              <input
                type="email"
                id="alternate_email"
                name="alternate_email"
                className="form-control"
                value={form.alternate_email}
                onChange={(e) =>
                  setForm({ ...form, alternate_email: e.target.value })
                }
                autoComplete="off"
                placeholder="test@gmail"
              />
            </div>
            {errors.alternate_email && (
              <p className="text-danger">{errors.alternate_email[0]}</p>
            )}
          </div>
          <div className="col-md-3 pb-3">
            <label htmlFor="phone_no" className="form-label">
              Mobile No
            </label>
            <div className="input-group-with-icon">
              <span className="input-icon">
                <i className="fa-light fa-phone"></i>
              </span>
              <input
                type="number"
                id="mobile_no"
                name="mobile_no"
                className="form-control"
                value={form.mobile_no}
                onChange={(e) =>
                  setForm({ ...form, mobile_no: e.target.value })
                }
                autoComplete="off"
                placeholder="9876543210"
              />
            </div>
            {errors.mobile_no && (
              <p className="text-danger">{errors.mobile_no[0]}</p>
            )}
          </div>
          <div className="col-md-3 pb-3">
            <label htmlFor="alternate_no" className="form-label">
              Alternate No
            </label>
            <div className="input-group-with-icon">
              <span className="input-icon">
                <i className="fa-light fa-phone"></i>
              </span>
              <input
                type="number"
                id="alternate_no"
                name="alternate_no"
                className="form-control"
                value={form.alternate_no}
                onChange={(e) =>
                  setForm({ ...form, alternate_no: e.target.value })
                }
                autoComplete="off"
                placeholder="9876543210"
              />
            </div>
            {errors.alternate_no && (
              <p className="text-danger">{errors.alternate_no[0]}</p>
            )}
          </div>
          {/* <div className="col-md-3 pb-3">
            <label htmlFor="whatsapp_no" className="form-label">
              Whatsapp No
            </label>
            <div className="input-group-with-icon">
              <span className="input-icon">
                <i className="fa-regular  fa-phone"></i>
              </span>
              <input
                type="number"
                id="whatsapp_no"
                name="whatsapp_no"
                className="form-control"
                value={form.whatsapp_no}
                onChange={(e) =>
                  setForm({ ...form, whatsapp_no: e.target.value })
                }
                autoComplete="off"
                placeholder="9876543210"
              />
            </div>
            {errors.whatsapp_no && (
              <p className="text-danger">{errors.whatsapp_no[0]}</p>
            )}
          </div> */}

          <>
            <div className="col-md-3 pb-3">
              <label htmlFor="project_id" className="form-label">
                Project
              </label>
              <ProjectList form={form} setForm={setForm} />
              <input type="hidden"
                id="project_id"
                name="project_id"
                value={form.project_id}
              />

              {errors.project_id && (
                <p className="text-danger">{errors.project_id[0]}</p>
              )}
            </div>
          </>

          <div className="col-md-3 pb-3">
            <label htmlFor="source_id" className="form-label">
              Source
            </label>
            <SourceList form={form} setForm={setForm} setSelectedSourceId={setSelectedSourceId} />
            <input type="hidden"
              id="source_id"
              name="source_id"
              value={form.source_id}
            />
            {errors.source_id && (
              <p className="text-danger">{errors.source_id[0]}</p>
            )}
          </div>

          <div className="col-md-3 pb-3">
            <label htmlFor="sub_source_id" className="form-label">
              Sub Source
            </label>
            <SubSourceList
              key={form.source_id}
              form={form}
              setForm={setForm}
              source_id={form.source_id}
            />
            <input type="hidden"
              id="sub_source_id"
              name="sub_source_id"
              value={form.sub_source_id}
            />
            {errors.sub_source_id && (
              <p className="text-danger">{errors.sub_source_id[0]}</p>
            )}
          </div>

          <div className="col-md-3 pb-3">
            <label htmlFor="rm_user_id" className="form-label">
              RM
            </label>
            <UserList form={form} setForm={setForm} />
            <input type="hidden"
              id="rm_user_id"
              name="rm_user_id"
              value={form.rm_user_id}
            />
            {errors.rm_user_id && (
              <p className="text-danger">{errors.rm_user_id[0]}</p>
            )}
          </div>

          <div className="col-md-3 pb-3">
            <label htmlFor="lead_status_id" className="form-label">
              Lead Status
            </label>
            <select
              id="lead_status_id"
              name="lead_status_id"
              className="form-select border-white"
              value={form.lead_status_id}
              onChange={(e) =>
                setForm({ ...form, lead_status_id: e.target.value })
              }
            >
              <LeadStatusList
                name="lead_status_id"
                selected_options={form.lead_status_id}
              />
            </select>
            {errors.lead_status_id && (
              <p className="text-danger">{errors.lead_status_id[0]}</p>
            )}
          </div>
          {submitConfig.action === 2 &&
            <>
              <div className="col-md-3 pb-3">
                <label htmlFor="schedule_date" className="form-label">
                  Schedule Date
                </label>
                <div className="input-group-with-icon">
                  <DatePicker
                    selected={form.schedule_date ? new Date(form.schedule_date) : null} // convert string to Date
                    onChange={(date) =>
                      setForm({
                        ...form,
                        schedule_date: date ? date.toISOString().split("T")[0] : "", // store as string YYYY-MM-DD
                      })
                    }
                    dateFormat="dd-MM-yyyy"
                    name="schedule_date"
                    id="schedule_date"
                    placeholderText="Click to select a date"
                  />
                </div>
                {errors.schedule_date && (
                  <p className="text-danger">{errors.schedule_date[0]}</p>
                )}
              </div>
            </>
          }
          <div className="col-sm-12">
            <div className="row">
              <div className="col-sm-6 ol-6">
                <label htmlFor="remarks" className="form-label">Remarks</label>
                <textarea
                  className="form-control"
                  id="remarks"
                  name="remarks"
                  value={form.remarks}
                  onChange={(e) => setForm({ ...form, remarks: e.target.value })}>
                </textarea>
              </div>

              <div className="col-3 custom-btn-box">
                <button type="submit" className="btn btn-primary btn-sm mt-5">
                  {submitConfig.action === 1 ? "Submit" : "Update"}
                </button>
                <button
                  type="button"
                  onClick={handleReset}
                  className="btn btn-danger btn-sm mt-5"
                >
                  Reset
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default InputForm;
