import { useState, useEffect } from "react";
import AsyncSelect from "react-select/async";

export default function List({ form, setForm }) {
  const [selectedrm_user, setSelectedrm_user] = useState([]); // ✅ array

  const loadOptions = async (inputValue) => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/user?limit=5&search=${encodeURIComponent(inputValue)}`
      );

      const data = await res.json();

      return (
        data?.map((item) => ({
          value: item.user_id,
          label: item.name,
        })) || []
      );
    } catch (error) {
      console.error("Error loading rm_users:", error);
      return [];
    }
  };

  const handleChange = (options) => {
    setSelectedrm_user(options || []);

    setForm((prev) => ({
      ...prev,
      members: options ? options.map((o) => o.value) : [],
    }));
  };

  useEffect(() => {
    if (form.slug) {
      const fetchrm_user = async () => {
        try {
          const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/user-team?user_team_id=${form.slug}`
          );

          const data = await res.json();
          if (data) {
            const memberIds = data.map((user) => user.member_id).join(',');
            const formatted = Array.isArray(data)
              ? data.map((user) => ({
                  value: user.member_id,
                  label: user?.user?.name,
                }))
              : [
                  {
                    value: data.user_id,
                    label: data.name,
                  },
                ];

            setSelectedrm_user(formatted);

            console.log("memberIds:", memberIds);
            setForm((prev) => ({
              ...prev,
              members: memberIds,
            }));
          }
        } catch (error) {
          console.error("Error fetching rm_user:", error);
        }
      };

      fetchrm_user();
    }
  }, [form.slug]); 

  return (
    <AsyncSelect
      isMulti
      cacheOptions
      defaultOptions
      loadOptions={loadOptions}
      value={selectedrm_user}
      onChange={handleChange}
      placeholder="Select User"
      classNamePrefix="async_select"
    />
  );
}