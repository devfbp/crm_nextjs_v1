import React from 'react'
import { useState, useEffect } from 'react'

export default function List(props) {
    const [data, setData] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(process.env.NEXT_PUBLIC_API_URL + '/lead-status');
            const result = await response.json();
            setData(result);
        };
        fetchData();
    }, []);
    //console.log(data);
    return (
        <React.Fragment>            
              <option value={0}>Choose...</option>
              {data.map((item) => (
                <option key={item.lead_status_id} value={item.lead_status_id} selected={props.selected_options==item.lead_status_id ? "selected" : ""}>
                  {item.lead_status_name}
                </option>
              ))}
        </React.Fragment>
    )
}