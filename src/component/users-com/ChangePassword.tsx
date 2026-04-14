"use client";

import React, { useState, useRef, useEffect } from "react";
import { toast } from "react-toastify";
import { userPasswordSchema } from "../../../lib/validation";
import { form_submit_call } from "../utils/common-client";
interface InputFormProps {
  records?: {
    user_id: string,
    old_password: string,
    new_password: string,
    confirm_password: string,
  },
  setRecords?: (records: any) => void;
  editid: any;
}

const initialFormState = {
  id: "",
  old_password: "",
  new_password: "",
  confirm_password: "",
};

const InputForm: React.FC<InputFormProps> = ({ records, editid }) => {
  const formRef = useRef<HTMLFormElement>(null);

  const [oldpasswordVisible, setOldPasswordVisible] = useState<boolean>(false);
  const [newpasswordVisible, setNewPasswordVisible] = useState<boolean>(false);
  const [confirmpasswordVisible, setConfirmPasswordVisible] = useState<boolean>(false);

  const [form, setForm] = useState(initialFormState);
  const [submitConfig, setSubmitConfig] = useState({
    action: 2, // 1 = add, 2 = edit
    endpoint: "user/change-password",
  });
  const [errors, setErrors] = useState<Record<string, string[]>>({});

  // Populate form when editing
  useEffect(() => {
    setForm({ id: editid, old_password: "", new_password: "", confirm_password: "" });
    if (!records) return;

    setForm({
      id: editid,
      old_password: "",
      new_password: "",
      confirm_password: "",
    });

    setSubmitConfig((prev) => ({ ...prev, action: 2 }));
  }, [records]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const validation = userPasswordSchema.safeParse({
      old_password: form.old_password,
      new_password: form.new_password,
      confirm_password: form.confirm_password,
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
      if (typeof window !== "undefined" && process.env.NEXT_PUBLIC_REFRESH_PAGE === "yes") {
        window.location.href = "/login";
      }
    } catch (err: any) {
      console.error("Submit error:", err);
      toast.error(err?.message || "Failed to submit");
    }
  };

  const handleReset = () => {
    setForm(initialFormState);
    setSubmitConfig({ action: 2, endpoint: "user/change-password" });
    setErrors({});
    formRef.current?.reset();
  };

  const togglePasswordVisibility = (passwordType: 'old' | 'new' | 'confirm') => {
    switch (passwordType) {
      case 'old':
        setOldPasswordVisible((prev) => !prev);
        break;
      case 'new':
        setNewPasswordVisible((prev) => !prev);
        break;
      case 'confirm':
        setConfirmPasswordVisible((prev) => !prev);
        break;
    }
  };

  return (
    <>
      <form className="row g-3" ref={formRef} onSubmit={handleSubmit}>
        <input type="hidden" name="id" value={editid} />
        <div className="row">
          <div className="col-lg-4">
            <div className="card ">
              <div className="card-header">
                Change Password
              </div>
              <div className="card-body">
                <div className="col-md-12 pt-3">
                  <label htmlFor="old_password" className="form-label">
                    Old Password
                  </label>
                  <div className="input-group-with-icon">
                    <input
                      type={oldpasswordVisible ? "text" : "password"}
                      id="old_password"
                      name="old_password"
                      className="form-control"
                      value={form.old_password}
                      onChange={(e) =>
                        setForm({ ...form, old_password: e.target.value })
                      }
                      autoComplete="off"
                    />
                    <span className="input-icon">
                      <a
                        role="button"
                        className="password-show"
                        onClick={() => togglePasswordVisibility('old')}
                      >
                        <i className={`fa-duotone ${oldpasswordVisible ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                      </a>
                    </span>
                    {errors.old_password && (
                      <p className="text-danger">{errors.old_password[0]}</p>
                    )}
                  </div>
                </div>
                <div className="col-md-12 pt-3">
                  <label htmlFor="new_password" className="form-label">
                    New Password
                  </label>
                  <div className="input-group-with-icon">
                    <input
                      type={newpasswordVisible ? "text" : "password"}
                      id="new_password"
                      name="new_password"
                      className="form-control"
                      value={form.new_password}
                      onChange={(e) =>
                        setForm({ ...form, new_password: e.target.value })
                      }
                      autoComplete="off"
                    />
                    <span className="input-icon">
                      <a
                        role="button"
                        className="password-show"
                        onClick={() => togglePasswordVisibility('new')}
                      >
                        <i className={`fa-duotone ${newpasswordVisible ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                      </a>
                    </span>
                    {errors.new_password && (
                      <p className="text-danger">{errors.new_password[0]}</p>
                    )}
                  </div>
                </div>

                <div className="col-md-12 pt-3">
                  <label htmlFor="confirm_password" className="form-label">
                    Confirm Password
                  </label>
                  <div className="input-group-with-icon">
                    <input
                      type={confirmpasswordVisible ? "text" : "password"}
                      id="confirm_password"
                      name="confirm_password"
                      className="form-control"
                      value={form.confirm_password}
                      onChange={(e) =>
                        setForm({ ...form, confirm_password: e.target.value })
                      }
                      autoComplete="off"
                    />
                    <span className="input-icon">
                      <a
                        role="button"
                        className="password-show"
                        onClick={() => togglePasswordVisibility('confirm')}
                      >
                        <i className={`fa-duotone ${confirmpasswordVisible ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                      </a>
                    </span>
                    {errors.confirm_password && (
                      <p className="text-danger">{errors.confirm_password[0]}</p>
                    )}
                  </div>
                </div>

              </div>
              <div className="col-md-12 pt-3">
                <div className="clearfix">&nbsp;</div>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-4 offset-lg-4 d-flex justify-content-center">
            <button type="submit" className="btn btn-primary me-2">
              Change Password
            </button>
            <button type="button" className="btn btn-danger" onClick={handleReset}>
              Reset
            </button>
          </div>
        </div>
      </form >
    </>
  );
};

export default InputForm;
