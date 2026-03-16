"use client";

import React, { useState, useRef, useEffect } from "react";
import { toast } from "react-toastify";
import CityList from "./CityList";
import { projectSchema } from "../../../lib/validation";
import { form_submit_call } from "../utils/common-client";
import { PROJECTS_MENU_ID } from "@/data/constants";
import { accessMenuCheck } from "@/component/utils/common";

interface InputFormProps {
  records?: {
    project_id: string;
    project_name: string;
    city_id: number;
  };
  setRecords?: (records: any) => void;
}

const initialFormState = {
  project_name: "",
  slug: "",
  city_id: 0,
};

const InputForm: React.FC<InputFormProps> = ({ records }) => {
  const [hasAccess, setHasAccess] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const [form, setForm] = useState(initialFormState);
  const [submitConfig, setSubmitConfig] = useState({
    action: 1, // 1 = add, 2 = edit
    endpoint: "project",
  });
  const [errors, setErrors] = useState<Record<string, string[]>>({});

  // Populate form when editing
  useEffect(() => {
    if (!records) return;

    setForm({
      slug: records.project_id,
      project_name: records.project_name,
      city_id: records.city_id || 0,
    });

    setSubmitConfig((prev) => ({ ...prev, action: 2 }));
  }, [records]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const validation = projectSchema.safeParse({
      project_name: form.project_name,
      city_id: form.city_id,
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
      setSubmitConfig({ action: 1, endpoint: "project" });
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
    setSubmitConfig({ action: 1, endpoint: "project" });
    setErrors({});
    formRef.current?.reset();
  };
  useEffect(() => {
    setHasAccess(accessMenuCheck(PROJECTS_MENU_ID, submitConfig.action === 1 ? 2 : 3));
  }, []);

  return (
    <>
      {hasAccess &&

        <div className="card mb-20">
          <div className="card-header">
            {submitConfig.action === 1 ? "Add New Project" : "Edit Project"}
          </div>

          <div className="card-body">
            <form className="row g-3" ref={formRef} onSubmit={handleSubmit}>
              {/* Hidden ID for edit */}
              <input type="hidden" name="slug" value={form.slug} />

              <div className="col-md-6">
                <label htmlFor="project_name" className="form-label">
                  Project Name
                </label>
                <input
                  type="text"
                  id="project_name"
                  name="project_name"
                  className="form-control"
                  value={form.project_name}
                  onChange={(e) =>
                    setForm({ ...form, project_name: e.target.value })
                  }
                />
                {errors.project_name && (
                  <p className="text-danger">{errors.project_name[0]}</p>
                )}
              </div>
              <div className="col-md-6">
                <label htmlFor="city_id" className="form-label">
                  City
                </label>
                <select
                  id="city_id"
                  name="city_id"
                  className="form-select border-white"
                  value={form.city_id}
                  onChange={(e) =>
                    setForm({ ...form, city_id: Number(e.target.value) })
                  }
                >
                  <CityList
                    name="city_id"
                    selected_options={form.city_id}
                  />
                </select>
                {errors.city_id && (
                  <p className="text-danger">{errors.city_id[0]}</p>
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
