"use client"

import React, { useState, useRef, useEffect } from 'react';
import { sourceSchema } from '../../../lib/validation';
import { toast } from 'react-toastify';
import { form_submit_call } from '../utils/common-client';
import { useRouter } from 'next/navigation';
import { SOURCE_MENU_ID } from "@/data/constants";
import { accessMenuCheck } from "@/component/utils/common";
import { send } from 'process';

interface InputFormProps {
  records?: {
    source_id: string;
    source_name: string;
  };
  setRecords?: React.Dispatch<React.SetStateAction<any>>;
}

const InputForm: React.FC<InputFormProps> = ({ records }) => {
  const [hasAccess, setHasAccess] = useState(false);
  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null);

  // Form state
  const [form, setForm] = useState({ source_name: "", slug: "" });

  // Tracks whether we are adding (1) or editing (2)
  const [sendDatas, setSendDatas] = useState({ action: 1, endpoint: "source" });

  // Validation errors
  const [errors, setErrors] = useState<Record<string, string[]>>({});

  // If `records` exist, populate the form for editing
  useEffect(() => {
    if (records) {
      setForm({
        slug: records.source_id,
        source_name: records.source_name
      });
      setSendDatas(prev => ({ ...prev, action: 2 }));
    }
  }, [records]);

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data = { source_name: form.source_name };

    const result = sourceSchema.safeParse(data);

    if (!result.success) {
      const fieldErrors = result.error.flatten().fieldErrors;
      setErrors(fieldErrors);
      // toast.error(fieldErrors.source_name?.[0] || "Validation error");
      return;
    }

    // Clear previous errors
    setErrors({});

    // Prepare payload
    const payload = {
      action: sendDatas.action,
      data: form,
      method: sendDatas.action === 1 ? 'POST' : 'PUT',
      endpoint: sendDatas.endpoint
    };

    try {
      await form_submit_call(payload); // assuming this returns a promise

      // toast.success(sendDatas.action === 1 ? "Source added!" : "Source updated!");

      // Reset form
      setForm({ source_name: "", slug: "" });
      setSendDatas({ action: 1, endpoint: "source" });

      // Navigate back to source list
      router.push("/" + sendDatas.endpoint);
      router.refresh();

    } catch (err: any) {
      console.error("Submit error:", err);
      toast.error(err?.message || "Failed to submit");
    }
  };

  // Handle reset button
  const handleReset = () => {
    setForm({ source_name: "", slug: "" });
    setSendDatas({ action: 1, endpoint: "source" });
    setErrors({});
    formRef.current?.reset();
  };
  useEffect(() => {
    setHasAccess(accessMenuCheck(SOURCE_MENU_ID, sendDatas.action === 1 ? 2 : 3));
  }, []);

  return (
    <>
      {hasAccess &&

        <div className="card mb-20">
          <div className="card-header">{sendDatas.action === 1 ? "Add New Source" : "Edit Source"}</div>
          <div className="card-body">
            <form className="row g-3" ref={formRef} onSubmit={handleSubmit}>
              {/* Hidden ID for editing */}
              <input type="hidden" name="slug" value={form.slug} />

              <div className="col-md-12">
                <label htmlFor="source_name" className="form-label">Source Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="source_name"
                  name="source_name"
                  value={form.source_name}
                  onChange={(e) => setForm({ ...form, source_name: e.target.value })}
                />
                {errors.source_name && <p className="text-danger">{errors.source_name[0]}</p>}
              </div>
              <div className='col-12 custom-btn-box'>
                <div className="">
                  <button type="submit" className="btn btn-primary btn-sm">
                    {sendDatas.action === 1 ? "Submit" : "Update"}
                  </button>
                </div>

                <div className="">
                  <input type="button"
                    onClick={handleReset}
                    name="Reset"
                    className="btn btn-danger btn-sm"
                    value="Reset" />
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
