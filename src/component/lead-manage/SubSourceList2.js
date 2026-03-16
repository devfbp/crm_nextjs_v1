import { useState, useEffect } from "react";
import AsyncSelect from "react-select/async";

export default function List({ form, setForm, source_id }) {
  const [selectedSubSource, setSelectedSubSource] = useState(null);

  const loadOptions = async (inputValue) => {
    if (!source_id) return [];

    try {
      var url = `${process.env.NEXT_PUBLIC_API_URL}/sub-source?limit=5&source_id=${source_id}`;
      if(inputValue) {
        url += `&search=${encodeURIComponent(inputValue)}`;
      }
      const res = await fetch(url);
      const data = await res.json();

      const options = data?.map((item) => ({
        value: item.sub_source_id,
        label: item.sub_source_name,
      })) || [];
      
      // Add default "--Select--" option
      return [{ value: "", label: "--Select--" }, ...options];
    } catch (error) {
      console.error("Error loading sub-sources:", error);
      return [];
    }
  };

  const handleChange = (option) => {
    setSelectedSubSource(option);
    setForm((prev) => ({ ...prev, sub_source_id: option?.value || "" }));
  };

  useEffect(() => {
    if (!form.sub_source_id) return;

    const fetchSubSource = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/sub-source?sub_source_id=${form.sub_source_id}`
        );
        const data = await res.json();

        if (data?.length > 0) {
          const source = data[0];
          setSelectedSubSource({
            value: source.sub_source_id,
            label: source.sub_source_name,
          });
        }
      } catch (error) {
        console.error("Error fetching sub-source:", error);
      }
    };

    fetchSubSource();
  }, [form.sub_source_id]);

  return (
    <AsyncSelect
      key={source_id} // reset options when source changes
      cacheOptions
      defaultOptions
      loadOptions={loadOptions}
      value={selectedSubSource}
      onChange={handleChange}
      placeholder="Select Sub-Source"
      classNamePrefix="async_select"
      isDisabled={!source_id}
    />
  );
}