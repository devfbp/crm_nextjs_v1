"use client";

import React, { useState, useRef, useEffect } from "react";
import { toast } from "react-toastify";
import SourceList from "./SourceList";
import { subSourceSchema } from "../../../lib/validation";
import { form_submit_call } from "../utils/common-client";
import { SUB_SOURCE_MENU_ID } from "@/data/constants";
import { accessMenuCheck } from "@/component/utils/common";

interface InputFormProps {
  records?: {
    sub_source_id: string;
    sub_source_name: string;
    source_id: number;
  };
  setRecords?: React.Dispatch<React.SetStateAction<any>>;
}

const initialFormState = {
  sub_source_name: "",
  slug: "",
  source_id: 0,
};

const InputForm: React.FC<InputFormProps> = ({ records }) => {
  const [hasAccess, setHasAccess] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const [form, setForm] = useState(initialFormState);
  const [submitConfig, setSubmitConfig] = useState({
    action: 1, // 1 = add, 2 = edit
    endpoint: "sub-source",
  });
  const [errors, setErrors] = useState<Record<string, string[]>>({});

  // Populate form when editing
  useEffect(() => {
    if (!records) return;

    setForm({
      slug: records.sub_source_id,
      sub_source_name: records.sub_source_name,
      source_id: records.source_id || 0,
    });

    setSubmitConfig((prev) => ({ ...prev, action: 2 }));
  }, [records]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const validation = subSourceSchema.safeParse({
      sub_source_name: form.sub_source_name,
      source_id: form.source_id,
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
      setSubmitConfig({ action: 1, endpoint: "sub-source" });
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
    setSubmitConfig({ action: 1, endpoint: "sub-source" });
    setErrors({});
    formRef.current?.reset();
  };

  useEffect(() => {
    setHasAccess(accessMenuCheck(SUB_SOURCE_MENU_ID, submitConfig.action === 1 ? 2 : 3));
  }, []);

  return (
    <>
      {hasAccess &&

        <div className="card mb-20">
          <div className="card-header">
            {submitConfig.action === 1 ? "Add New Sub Source" : "Edit Sub Source"}
          </div>

          <div className="card-body">
            <form className="row g-3" ref={formRef} onSubmit={handleSubmit}>
              {/* Hidden ID for edit */}
              <input type="hidden" name="slug" value={form.slug} />

              <div className="col-md-6">
                <label htmlFor="source_id" className="form-label">
                  Source
                </label>
                <select
                  id="source_id"
                  name="source_id"
                  className="form-select border-white"
                  value={form.source_id}
                  onChange={(e) =>
                    setForm({ ...form, source_id: Number(e.target.value) })
                  }
                >
                  <SourceList
                    name="source_id"
                    selected_options={form.source_id}
                  />
                </select>
                {errors.source_id && (
                  <p className="text-danger">{errors.source_id[0]}</p>
                )}
              </div>

              <div className="col-md-6">
                <label htmlFor="sub_source_name" className="form-label">
                  Sub Source Name
                </label>
                <input
                  type="text"
                  id="sub_source_name"
                  name="sub_source_name"
                  className="form-control"
                  value={form.sub_source_name}
                  onChange={(e) =>
                    setForm({ ...form, sub_source_name: e.target.value })
                  }
                />
                {errors.sub_source_name && (
                  <p className="text-danger">{errors.sub_source_name[0]}</p>
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
