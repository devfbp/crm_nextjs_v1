import { useEffect, useState } from "react";

export default function Autocomplete({ form, setForm }) {
    const [value, setValue] = useState("");
    const [filtered, setFiltered] = useState([]);
    const [show, setShow] = useState(false);

    useEffect(() => {
        
    }, []);

    const onChange = async (e) => {
        const input = e.target.value;
        setValue(input);
        
        if (!input) {
            setShow(false);
            setFiltered([]);
            
            return;
        }

        // 🔹 Call API dynamically
        const res = await fetch(process.env.NEXT_PUBLIC_API_URL + `/project?search=${input}`);
        const data = await res.json();

        setFiltered(data); // assuming API returns array of strings
        setShow(true);
        setForm({ ...form, project_id: null });
    };

    const onSelect = (item) => {
        setValue(item.project_name);
        setForm({ ...form, project_id: item.project_id });
        setShow(false);
    };

    return (
        <div style={{ width: 250, position: "relative" }}>
            <input
                value={value}
                onChange={onChange}
                placeholder="Type a project..."
                className="form-control"
                style={{ width: "100%", padding: 8 }}
            />

            {show && filtered.length > 0 && (
                <ul style={listStyle}>
                    {filtered.map((item) => (
                        <li
                            key={item.project_id}
                            onClick={() => onSelect(item)}
                            style={{ padding: 8, cursor: "pointer" }}
                        >
                            {item.project_name}
                        </li>
                    ))}

                </ul>
            )}
        </div>
    );
}

const listStyle = {
    position: "absolute",
    top: "100%",
    left: 0,
    right: 0,
    border: "1px solid #ccc",
    background: "#071739",
    listStyle: "none",
    margin: 0,
    padding: 0,
    zIndex: 10,
};

const itemStyle = {
    padding: 8,
    cursor: "pointer",
};
