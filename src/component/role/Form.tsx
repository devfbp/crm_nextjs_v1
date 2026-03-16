"use client"

import React, { useState, useRef, useEffect } from 'react';
import { roleSchema } from '../../../lib/validation';
import { toast } from 'react-toastify';
import { form_submit_call } from '../utils/common-client';
import { useRouter } from 'next/navigation';
import MenuAccess from "./MenuAccess";
import { MASTER_ROLE_MENU_ID } from "@/data/constants";
import { accessMenuCheck } from "@/component/utils/common";

interface InputFormProps {
  records?: {
    role_id: string;
    role_name: string;
  };
  setRecords?: React.Dispatch<React.SetStateAction<any>>;
}

const InputForm: React.FC<InputFormProps> = ({ records }) => {
  const [hasAccess, setHasAccess] = useState(false);
  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null);

  // Form state
  const [form, setForm] = useState({ role_name: "", slug: "" });

  // Tracks whether we are adding (1) or editing (2)
  const [sendDatas, setSendDatas] = useState({ action: 1, endpoint: "role" });

  // Validation errors
  const [errors, setErrors] = useState<Record<string, string[]>>({});

  // If `records` exist, populate the form for editing
  useEffect(() => {
    if (records) {
      setForm({
        slug: records.role_id,
        role_name: records.role_name
      });
      setSendDatas(prev => ({ ...prev, action: 2 }));
    }
  }, [records]);

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data = { role_name: form.role_name };

    const result = roleSchema.safeParse(data);

    if (!result.success) {
      const fieldErrors = result.error.flatten().fieldErrors;
      setErrors(fieldErrors);
      // toast.error(fieldErrors.role_name?.[0] || "Validation error");
      return;
    }

    // Clear previous errors
    setErrors({});

    const formData = new FormData(e.currentTarget);

    // For checkboxes, FormData will include only checked ones
    const menudata = {
      view: formData.getAll("view[]"),   // array of checked menu_ids
      create: formData.getAll("create[]"),
      edit: formData.getAll("edit[]"),
      delete: formData.getAll("delete[]"),
      parent_menu: formData.getAll("parent_menu[]")
    };
    const menuDataString = JSON.stringify(menudata);
    const finalData = {
      ...form,
      access_menu: menudata,
    };
    // console.log("Final payload data:", finalData);
    // Prepare payload
    const payload = {
      action: sendDatas.action,
      data: finalData,
      method: sendDatas.action === 1 ? 'POST' : 'PUT',
      endpoint: sendDatas.endpoint
    };

    try {
      await form_submit_call(payload); // assuming this returns a promise

      // toast.success(sendDatas.action === 1 ? "Role added!" : "Role updated!");

      // Reset form
      setForm({ role_name: "", slug: "" });
      setSendDatas({ action: 1, endpoint: "role" });

      // Navigate back to role list
      // router.push("/" + sendDatas.endpoint);
      // router.refresh();
      if (typeof window !== "undefined") {
        window.location.href = "/role";
      }

    } catch (err: any) {
      console.error("Submit error:", err);
      toast.error(err?.message || "Failed to submit");
    }
  };

  // Handle reset button
  const handleReset = () => {
    setForm({ role_name: "", slug: "" });
    setSendDatas({ action: 1, endpoint: "role" });
    setErrors({});
    formRef.current?.reset();
  };

  useEffect(() => {
    setHasAccess(accessMenuCheck(MASTER_ROLE_MENU_ID, sendDatas.action === 1 ? 2 : 3));
  }, []);
  return (
    <>
      {hasAccess &&
        <div className="card mb-20">
          <div className="card-header">{sendDatas.action === 1 ? "Add New Role" : "Edit Role"}</div>
          <div className="card-body">
            <form className="row g-3" ref={formRef} onSubmit={handleSubmit}>
              {/* Hidden ID for editing */}
              <input type="hidden" name="slug" value={form.slug} />

              <div className="col-md-12">
                <label htmlFor="role_name" className="form-label">Role Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="role_name"
                  name="role_name"
                  value={form.role_name}
                  onChange={(e) => setForm({ ...form, role_name: e.target.value })}
                />
                {errors.role_name && <p className="text-danger">{errors.role_name[0]}</p>}
              </div>
              <MenuAccess records={records} />

              <div className='col-12 custom-btn-box'>
                <div>
                  <button type="submit" className="btn btn-primary btn-sm">
                    {sendDatas.action === 1 ? "Submit" : "Update"}
                  </button>
                </div>
                <div>
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
