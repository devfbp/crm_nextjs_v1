import { useState, useEffect } from "react";
import AsyncSelect from "react-select/async";

export default function List({ form, setForm }) {
  const [selectedProject, setSelectedProject] = useState(null);

  const loadOptions = async (inputValue) => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/project?limit=5&search=${encodeURIComponent(inputValue)}`
      );

      const data = await res.json();

      const options = data?.map((item) => ({
        value: item.project_id,
        label: item.project_name,
      })) || [];

      return [{ value: "", label: "--Select--" }, ...options];
    } catch (error) {
      console.error("Error loading projects:", error);
      return [];
    }
  };

  const handleChange = (option) => {
    setSelectedProject(option);
    setForm((prev) => ({
      ...prev,
      project_id: option?.value || "",
    }));

    console.log("Selected Project ID:", option?.value);
  };

  useEffect(() => {
    if (!form.project_id) {
      setSelectedProject(null);
      return;
    }
    // Already showing this project (e.g. just picked from the dropdown)
    if (String(selectedProject?.value) === String(form.project_id)) return;

    let cancelled = false;
    const fetchProject = async () => {
      try {
        // `id` returns the project even if it is flagged/inactive
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/project?id=${form.project_id}`
        );

        const data = await res.json();

        if (!cancelled && data?.project_id) {
          setSelectedProject({
            value: data.project_id,
            label: data.project_name,
          });
        }
      } catch (error) {
        console.error("Error fetching project:", error);
      }
    };

    fetchProject();
    return () => {
      cancelled = true;
    };
  }, [form.project_id]);

  return (
    <AsyncSelect
      cacheOptions
      defaultOptions
      loadOptions={loadOptions}
      value={selectedProject}
      onChange={handleChange}
      placeholder="Select Project"
      classNamePrefix="async_select"
    />
  );
}