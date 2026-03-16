import React from 'react'
import { useState, useEffect } from 'react'

export function StateList(props) {
    const [data, setData] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(process.env.NEXT_PUBLIC_API_URL + '/role');
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
                <option key={item.role_id} value={item.role_id} selected={props.selected_options==item.role_id ? "selected" : ""}>
                  {item.role_name}
                </option>
              ))}
        </React.Fragment>
    )
}