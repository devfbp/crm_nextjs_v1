"use client"

import React, { useRef } from 'react';
import { stateSchema } from '../../../lib/validation';
import { toast } from 'react-toastify';
import { form_submit_call } from '../utils/common-client';
import { useRouter } from 'next/navigation';
import { STATE_MENU_ID } from "@/data/constants";
import { accessMenuCheck } from "@/component/utils/common";
import { useEffect, useState } from "react";

interface InputFormProps {
  records?: {
    state_id: string;
    state_name: string;
  };
  setRecords?: React.Dispatch<React.SetStateAction<any>>;
}

const InputForm: React.FC<InputFormProps> = ({ records }) => {
  const [hasAccess, setHasAccess] = useState(false);
  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null);

  // Form state
  const [form, setForm] = useState({ state_name: "", slug: "" });

  // Tracks whether we are adding (1) or editing (2)
  const [sendDatas, setSendDatas] = useState({ action: 1, endpoint: "state" });

  // Validation errors
  const [errors, setErrors] = useState<Record<string, string[]>>({});

  // If `records` exist, populate the form for editing
  useEffect(() => {
    if (records) {
      setForm({
        slug: records.state_id,
        state_name: records.state_name
      });
      setSendDatas(prev => ({ ...prev, action: 2 }));
    }
  }, [records]);

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data = { state_name: form.state_name };

    const result = stateSchema.safeParse(data);

    if (!result.success) {
      const fieldErrors = result.error.flatten().fieldErrors;
      setErrors(fieldErrors);
      // toast.error(fieldErrors.state_name?.[0] || "Validation error");
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

      // toast.success(sendDatas.action === 1 ? "state added!" : "state updated!");

      // Reset form
      setForm({ state_name: "", slug: "" });
      setSendDatas({ action: 1, endpoint: "state" });

      // Navigate back to state list
      router.push("/" + sendDatas.endpoint);
      router.refresh();

    } catch (err: any) {
      console.error("Submit error:", err);
      toast.error(err?.message || "Failed to submit");
    }
  };

  // Handle reset button
  const handleReset = () => {
    setForm({ state_name: "", slug: "" });
    setSendDatas({ action: 1, endpoint: "state" });
    setErrors({});
    formRef.current?.reset();
  };

  useEffect(() => {
    setHasAccess(accessMenuCheck(STATE_MENU_ID, sendDatas.action === 1 ? 2 : 3));
  }, []);

  return (
    <>
      {hasAccess &&
        <div className="card mb-20">
          <div className="card-header">{sendDatas.action === 1 ? "Add New State" : "Edit State"}</div>
          <div className="card-body">
            <form className="row g-3" ref={formRef} onSubmit={handleSubmit}>
              {/* Hidden ID for editing */}
              <input type="hidden" name="slug" value={form.slug} />

              <div className="col-md-12">
                <label htmlFor="state_name" className="form-label">State Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="state_name"
                  name="state_name"
                  value={form.state_name}
                  onChange={(e) => setForm({ ...form, state_name: e.target.value })}
                />
                {errors.state_name && <p className="text-danger">{errors.state_name[0]}</p>}
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
