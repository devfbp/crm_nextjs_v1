import React from 'react'
import { useState, useEffect } from 'react'

export default function List(props) {
    const [data, setData] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(process.env.NEXT_PUBLIC_API_URL + '/source');
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
                <option key={item.source_id} value={item.source_id} selected={props.selected_options==item.source_id ? "selected" : ""}>
                  {item.source_name}
                </option>
              ))}
        </React.Fragment>
    )
}