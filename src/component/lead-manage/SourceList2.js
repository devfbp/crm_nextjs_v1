import { useState, useEffect } from "react";
import AsyncSelect from "react-select/async";

export default function List({ form, setForm, setSelectedSourceId }) {
  const [selectedSource, setSelectedSource] = useState(null);

  const loadOptions = async (inputValue) => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/source?limit=5&search=${encodeURIComponent(inputValue)}`
      );
      const data = await res.json();

      const options = data?.map((item) => ({
        value: item.source_id,
        label: item.source_name,
      })) || [];

      // Add default "--Select--" option
      return [{ value: "", label: "--Select--" }, ...options];
    } catch (error) {
      console.error("Error loading sources:", error);
      return [];
    }
  };

  const handleChange = (option) => {
    if(option?.value !== form.source_id) {
      setForm((prev) => ({ ...prev, sub_source_id: "" }));
    }
    setSelectedSource(option);
    setSelectedSourceId(option?.value || "");
    setForm((prev) => ({ ...prev, source_id: option?.value || "" }));
    // console.log("Selected Source ID:", option?.value);
  };

  useEffect(() => {
    if (!form.source_id) return;

    const fetchSource = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/source?source_id=${form.source_id}`
        );
        const data = await res.json();

        if (data?.length > 0) {
          const source = data[0];
          setSelectedSource({
            value: source.source_id,
            label: source.source_name,
          });
        }
      } catch (error) {
        console.error("Error fetching source:", error);
      }
    };

    fetchSource();
  }, [form.source_id]);

  return (
    <AsyncSelect
      cacheOptions
      defaultOptions
      loadOptions={loadOptions}
      value={selectedSource}
      onChange={handleChange}
      placeholder="Select Source"
      classNamePrefix="async_select"
    />
  );
}