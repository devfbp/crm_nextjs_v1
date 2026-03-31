"use client";

import React, { useState, useRef, useEffect } from "react";
import { toast } from "react-toastify";
import UserList from "./UserList2";
import { userTeamSchema } from "../../../lib/validation";
import { form_submit_call } from "../utils/common-client";
import ManagerList from "./ManagerList";

interface InputFormProps {
  records?: {
    team_name: string,
    team_leader_id: any,
    user_team_id: any,
    members: [],
  },
  setRecords?: (records: any) => void;
  editid: any;
}

const initialFormState = {
  slug: "",
  team_name: "",
  team_leader_id: "",
  user_team_id: "",
  members: [],
};

const InputForm: React.FC<InputFormProps> = ({ records, editid }) => {
  const formRef = useRef<HTMLFormElement>(null);

  const [form, setForm] = useState(initialFormState);
  const [submitConfig, setSubmitConfig] = useState({
    action: 1, // 1 = add, 2 = edit
    endpoint: "user-team",
  });
  const [errors, setErrors] = useState<Record<string, string[]>>({});

  // Populate form when editing
  useEffect(() => {
    if (!records) return;

    setForm({
      slug: records.user_team_id,
      team_name: records.team_name,
      team_leader_id: records.team_leader_id || 0,
      user_team_id: records.user_team_id,
      members: records.members || [],
    });

    setSubmitConfig((prev) => ({ ...prev, action: 2 }));
  }, [records]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const validation = userTeamSchema.safeParse({
      team_name: form.team_name,
      team_leader_id: form.team_leader_id,
      user_team_id: form.user_team_id,
      members: form.members,
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
        window.location.href = "/user-team";
      }

    } catch (err: any) {
      console.error("Submit error:", err);
      toast.error(err?.message || "Failed to submit");
    }
  };

  const handleReset = () => {
    setForm(initialFormState);
    setSubmitConfig({ action: 1, endpoint: "user-team" });
    setErrors({});
    formRef.current?.reset();
  };

  return (
    <React.Fragment>
      <form className="row g-3" ref={formRef} onSubmit={handleSubmit}>
        <input type="hidden" name="slug" value={form.slug} />

        <div className="row">
          <div className="col-lg-6">
            <div className="card ">
              <div className="card-header">
                Team Information
              </div>

              <div className="card-body">
                {/* Hidden ID for edit */}

                <div className="col-md-12 pt-3">
                  <label htmlFor="team_name" className="form-label">
                    Team Name
                  </label>
                  <input
                    type="text"
                    id="team_name"
                    name="team_name"
                    className="form-control"
                    value={form.team_name}
                    onChange={(e) =>
                      setForm({ ...form, team_name: e.target.value })
                    }
                    autoComplete="off"
                  />
                  {errors.team_name && (
                    <p className="text-danger">{errors.team_name[0]}</p>
                  )}
                </div>
                <div className="col-md-12 pt-3">
                  <label htmlFor="team_leader_id" className="form-label">
                    Team Leader
                  </label>
                  <select
                    id="team_leader_id"
                    name="team_leader_id"
                    className="form-select border-white"
                    value={form.team_leader_id}
                    onChange={(e) =>
                      setForm({ ...form, team_leader_id: e.target.value })
                    }
                  >
                    <ManagerList
                      name="team_leader_id"
                      selected_options={form.team_leader_id}
                    />
                  </select>
                  {errors.team_leader_id && (
                    <p className="text-danger">{errors.team_leader_id[0]}</p>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="card ">
              <div className="card-header">
                Team Members
              </div>
              <div className="card-body">
                {/* Hidden ID for edit */}
                <div className="col-md-12 pt-3">
                  <label htmlFor="members" className="form-label">
                    Team Members
                  </label>
                  <UserList form={form} setForm={setForm} />
                  <input type="hidden"
                    id="members"
                    name="members"
                    value={form.members}
                  />
                  {errors.team_name && (
                    <p className="text-danger">{errors.team_name[0]}</p>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-4 offset-lg-4 d-flex justify-content-center">
            <button type="submit" className="btn btn-primary me-2">
              {submitConfig.action === 1 ? "Add Team" : "Update Team"}
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