"use client";

import React, { useState, useRef, useEffect } from "react";
import { toast } from "react-toastify";
import RoleList from "./RoleList";
import { userSchema } from "../../../lib/validation";
import { form_submit_call } from "../utils/common-client";
import ManagerList from "./ManagerList";

interface InputFormProps {
  records?: {
    user_id: string,
    name: string,
    role_id: any,
    email: string,
    phone_no: string,
    password: string,
    reporting_to_id: any,
    general_manager_id: any,
  },
  setRecords?: (records: any) => void;
  editid: any;
}

const initialFormState = {
  slug: "",
  name: "",
  role_id: "",
  email: "",
  phone_no: "",
  password: "",
  confirm_password: "",
  reporting_to_id: "",
  general_manager_id: "",
};

const InputForm: React.FC<InputFormProps> = ({ records, editid }) => {
  const formRef = useRef<HTMLFormElement>(null);

  const [form, setForm] = useState(initialFormState);
  const [submitConfig, setSubmitConfig] = useState({
    action: 1, // 1 = add, 2 = edit
    endpoint: "user",
  });
  const [errors, setErrors] = useState<Record<string, string[]>>({});

  // Populate form when editing
  useEffect(() => {
    if (!records) return;

    setForm({
      slug: records.user_id,
      name: records.name,
      role_id: records.role_id || 0,
      email: records.email,
      phone_no: records.phone_no,
      reporting_to_id: records.reporting_to_id || 0,
      general_manager_id: records.general_manager_id || 0,
      password: "",
      confirm_password: "",
    });

    setSubmitConfig((prev) => ({ ...prev, action: 2 }));
  }, [records]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const validation = userSchema.safeParse({
      name: form.name,
      role_id: form.role_id,
      email: form.email,
      phone_no: form.phone_no,
      password: form.password,
      confirm_password: form.confirm_password,
      general_manager_id: form.general_manager_id,
      reporting_to_id: form.reporting_to_id,
    });

    if (!validation.success) {
      setErrors(validation.error.flatten().fieldErrors);
      return;
    }

    setErrors({});  


    // console.log(data);
    const payload = {
      action: submitConfig.action,
      method: submitConfig.action === 1 ? "POST" : "PUT",
      endpoint: submitConfig.endpoint,
      data: form,
    };
    console.log("Submitting payload:", payload);
    try {

      await form_submit_call(payload);

      // setForm(initialFormState);
      // setSubmitConfig({ action: 1, endpoint: "user" });
      if (typeof window !== "undefined") {
        window.location.href = "/user";
      }

    } catch (err: any) {
      console.error("Submit error:", err);
      toast.error(err?.message || "Failed to submit");
    }
  };

  const handleReset = () => {
    setForm(initialFormState);
    setSubmitConfig({ action: 1, endpoint: "user" });
    setErrors({});
    formRef.current?.reset();
  };

  return (
    <React.Fragment>
      <form className="row g-3" ref={formRef} onSubmit={handleSubmit}>
        <input type="hidden" name="slug" value={form.slug} />

        <div className="row">
          <div className="col-lg-4">
            <div className="card ">
              <div className="card-header">
                Basic Information
              </div>

              <div className="card-body">
                {/* Hidden ID for edit */}

                <div className="col-md-12 pt-3">
                  <label htmlFor="name" className="form-label">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className="form-control"
                    value={form.name}
                    onChange={(e) =>
                      setForm({ ...form, name: e.target.value })
                    }
                    autoComplete="off"
                  />
                  {errors.name && (
                    <p className="text-danger">{errors.name[0]}</p>
                  )}
                </div>

                <div className="col-md-12 pt-3">
                  <label htmlFor="email" className="form-label">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="form-control"
                    value={form.email}
                    onChange={(e) =>
                      setForm({ ...form, email: e.target.value })
                    }
                    autoComplete="off"
                  />
                  {errors.email && (
                    <p className="text-danger">{errors.email[0]}</p>
                  )}
                </div>
                <div className="col-md-12 pt-3">
                  <label htmlFor="phone_no" className="form-label">
                    Phone No
                  </label>
                  <input
                    type="number"
                    id="phone_no"
                    name="phone_no"
                    className="form-control"
                    value={form.phone_no}
                    onChange={(e) =>
                      setForm({ ...form, phone_no: e.target.value })
                    }
                    autoComplete="off"
                  />
                  {errors.phone_no && (
                    <p className="text-danger">{errors.phone_no[0]}</p>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-4">
            <div className="card ">
              <div className="card-header">
                Office Information
              </div>

              <div className="card-body">

                <div className="col-md-12 pt-3">
                  <label htmlFor="role_id" className="form-label">
                    Designation
                  </label>
                  <select
                    id="role_id"
                    name="role_id"
                    className="form-select border-white"
                    value={form.role_id}
                    onChange={(e) =>
                      setForm({ ...form, role_id: e.target.value })
                    }
                  >
                    <RoleList
                      name="role_id"
                      selected_options={form.role_id}
                    />
                  </select>
                  {errors.role_id && (
                    <p className="text-danger">{errors.role_id[0]}</p>
                  )}
                </div>

                <div className="col-md-12 pt-3">
                  <label htmlFor="general_manager_id" className="form-label">
                    General Manager
                  </label>
                  <select
                    id="general_manager_id"
                    name="general_manager_id"
                    className="form-select border-white"
                    value={form.general_manager_id}
                    onChange={(e) =>
                      setForm({ ...form, general_manager_id: e.target.value })
                    }
                  >
                    <ManagerList
                      name="general_manager_id"
                      cuserid={editid}
                      manger="gmid"
                      selected_options={form.general_manager_id}
                    />
                  </select>
                  {errors.general_manager_id && (
                    <p className="text-danger">{errors.general_manager_id[0]}</p>
                  )}
                </div>

                <div className="col-md-12 pt-3">
                  <label htmlFor="reporting_to_id" className="form-label">
                    Reporting to
                  </label>
                  <select
                    id="reporting_to_id"
                    name="reporting_to_id"
                    className="form-select border-white"
                    value={form.reporting_to_id}
                    onChange={(e) =>
                      setForm({ ...form, reporting_to_id: e.target.value })
                    }
                  >
                    <ManagerList
                      name="reporting_to_id"
                      cuserid={editid}
                      manger="rmid"
                      selected_options={form.reporting_to_id}
                    />
                  </select>
                  {errors.reporting_to_id && (
                    <p className="text-danger">{errors.reporting_to_id[0]}</p>
                  )}
                </div>
              </div>
            </div>
          </div>

          <>
            {submitConfig.action === 1 ?
              <>
                <div className="col-lg-4">
                  <div className="card ">
                    <div className="card-header">
                      Auth Information
                    </div>
                    <div className="card-body">
                      <div className="col-md-12 pt-3">
                        <label htmlFor="user_name" className="form-label">
                          Password
                        </label>
                        <input
                          type="password"
                          id="password"
                          name="password"
                          className="form-control"
                          value={form.password}
                          onChange={(e) =>
                            setForm({ ...form, password: e.target.value })
                          }
                          autoComplete="off"
                        />
                        {errors.password && (
                          <p className="text-danger">{errors.password[0]}</p>
                        )}
                      </div>
                      <div className="col-md-12 pt-3">
                        <label htmlFor="user_name" className="form-label">
                          Confirm Password
                        </label>
                        <input
                          type="password"
                          id="confirm_password"
                          name="confirm_password"
                          className="form-control"
                          value={form.confirm_password}
                          onChange={(e) =>
                            setForm({ ...form, confirm_password: e.target.value })
                          }
                          autoComplete="off"
                        />
                        {errors.confirm_password && (
                          <p className="text-danger">{errors.confirm_password[0]}</p>
                        )}
                      </div>
                      <div className="col-md-12 pt-3">
                        <div className="clearfix">&nbsp;</div>
                      </div>
                    </div>
                  </div>
                </div>
              </>
              :
              <>
                <div className="col-lg-4">
                  <div className="card ">
                    <div className="card-header">
                      Change Password
                    </div>
                    <div className="card-body">
                      <div className="col-md-12 pt-3">
                        <label htmlFor="user_name" className="form-label">
                          Click to change password
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            }
          </>          
          <div className="col-lg-4 offset-lg-4 d-flex justify-content-center">
            <button type="submit" className="btn btn-primary me-2">
              {submitConfig.action === 1 ? "Add User" : "Update User"}
            </button>
            <button type="button" className="btn btn-danger" onClick={handleReset}>
              Reset
            </button>
          </div>
        </div>
      </form>
    </React.Fragment>
  );
};

export default InputForm;
