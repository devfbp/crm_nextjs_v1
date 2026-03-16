import React from 'react'
import { useState, useEffect } from 'react'

export default function List(props) {
    const [data, setData] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(process.env.NEXT_PUBLIC_API_URL + '/sub-source?source_id=' + props.source_id);
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
                <option key={item.sub_source_id} value={item.sub_source_id} selected={props.selected_options==item.sub_source_id ? "selected" : ""}>
                  {item.sub_source_name}
                </option>
              ))}
        </React.Fragment>
    )
}