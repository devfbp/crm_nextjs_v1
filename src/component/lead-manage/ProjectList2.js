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
    if (!form.project_id) return;

    const fetchProject = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/project?project_id=${form.project_id}`
        );

        const data = await res.json();

        if (data?.length > 0) {
          const project = data[0];
          setSelectedProject({
            value: project.project_id,
            label: project.project_name,
          });
        }
      } catch (error) {
        console.error("Error fetching project:", error);
      }
    };

    fetchProject();
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