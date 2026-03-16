"use client";

import React, { useState, useRef, useEffect } from "react";
import { toast } from "react-toastify";
import StateList from "./StateList";
import { citySchema } from "../../../lib/validation";
import { form_submit_call } from "../utils/common-client";
import { CITY_MENU_ID } from "@/data/constants";
import { accessMenuCheck } from "@/component/utils/common";

interface InputFormProps {
  records?: {
    city_id: string;
    city_name: string;
    state_id: any;
  };
  setRecords?: React.Dispatch<React.SetStateAction<any>>;
}

const initialFormState = {
  city_name: "",
  slug: "",
  state_id: "",
};

const InputForm: React.FC<InputFormProps> = ({ records }) => {
  const [hasAccess, setHasAccess] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const [form, setForm] = useState(initialFormState);
  const [submitConfig, setSubmitConfig] = useState({
    action: 1, // 1 = add, 2 = edit
    endpoint: "city",
  });
  const [errors, setErrors] = useState<Record<string, string[]>>({});

  // Populate form when editing
  useEffect(() => {
    if (!records) return;

    setForm({
      slug: records.city_id,
      city_name: records.city_name,
      state_id: records.state_id || 0,
    });

    setSubmitConfig((prev) => ({ ...prev, action: 2 }));
  }, [records]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const validation = citySchema.safeParse({
      city_name: form.city_name,
      state_id: form.state_id,
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

      setForm(initialFormState);
      setSubmitConfig({ action: 1, endpoint: "city" });
      if (typeof window !== "undefined") {
        window.location.reload();
      }

    } catch (err: any) {
      console.error("Submit error:", err);
      toast.error(err?.message || "Failed to submit");
    }
  };

  const handleReset = () => {
    setForm(initialFormState);
    setSubmitConfig({ action: 1, endpoint: "city" });
    setErrors({});
    formRef.current?.reset();
  };
  useEffect(() => {
    setHasAccess(accessMenuCheck(CITY_MENU_ID, submitConfig.action === 1 ? 2 : 3));
  }, []);
  return (
    <>
      {hasAccess &&
        <div className="card mb-20">
          <div className="card-header">
            {submitConfig.action === 1 ? "Add New City" : "Edit City"}
          </div>

          <div className="card-body">
            <form className="row g-3" ref={formRef} onSubmit={handleSubmit}>
              {/* Hidden ID for edit */}
              <input type="hidden" name="slug" value={form.slug} />

              <div className="col-md-6">
                <label htmlFor="state_id" className="form-label">
                  State
                </label>
                <select
                  id="state_id"
                  name="state_id"
                  className="form-select border-white"
                  value={form.state_id}
                  onChange={(e) =>
                    setForm({ ...form, state_id: e.target.value })
                  }
                >
                  <StateList
                    name="state_id"
                    selected_options={form.state_id}
                  />
                </select>
                {errors.state_id && (
                  <p className="text-danger">{errors.state_id[0]}</p>
                )}
              </div>

              <div className="col-md-6">
                <label htmlFor="city_name" className="form-label">
                  City Name
                </label>
                <input
                  type="text"
                  id="city_name"
                  name="city_name"
                  className="form-control"
                  value={form.city_name}
                  onChange={(e) =>
                    setForm({ ...form, city_name: e.target.value })
                  }
                />
                {errors.city_name && (
                  <p className="text-danger">{errors.city_name[0]}</p>
                )}
              </div>
              <div className='col-12 custom-btn-box'>
                <div className="">
                  <button type="submit" className="btn btn-primary btn-sm">
                    {submitConfig.action === 1 ? "Submit" : "Update"}
                  </button>
                </div>

                <div className="">
                  <button
                    type="button"
                    onClick={handleReset}
                    className="btn btn-danger btn-sm"
                  >
                    Reset
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      }
    </>
  );
};

export default InputForm;
