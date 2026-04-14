
import { useState, useEffect } from "react";
import AsyncSelect from "react-select/async";

export default function List({ form, setForm, doptionion }) {
  const [selectedrm_user, setSelectedrm_user] = useState(null);

  const loadOptions = async (inputValue) => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/user?lead_rm=1&limit=5&search=${encodeURIComponent(inputValue)}`
      );

      const data = await res.json();

      const options = data?.map((item) => ({
        value: item.user_id,
        label: item.name,
      })) || [];

      return [{ value: "", label: "--Select--" }, ...options];
    } catch (error) {
      console.error("Error loading rm_users:", error);
      return [];
    }
  };

  const handleChange = (option) => {
    setSelectedrm_user(option);
    setForm((prev) => ({
      ...prev,
      rm_user_id: option?.value || "",
    }));

    console.log("Selected rm_user ID:", option?.value);
  };

  useEffect(() => {
    if (!form.rm_user_id) return;

    const fetchrm_user = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/user?id=${form.rm_user_id}`
        );

        const data = await res.json();

        if (data) {
          const rm_user = data;
          setSelectedrm_user({
            value: rm_user.user_id,
            label: rm_user.name,
          });
        }
      } catch (error) {
        console.error("Error fetching rm_user:", error);
      }
    };

    fetchrm_user();
  }, [form.rm_user_id]);

  return (
    <AsyncSelect
      cacheOptions
      defaultOptions
      loadOptions={loadOptions}
      value={selectedrm_user}
      onChange={handleChange}
      placeholder={doptionion || "Select RM User"}
      classNamePrefix="async_select"
    />
  );
}