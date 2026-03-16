import React from 'react'
import { useState, useEffect } from 'react'

export default function List(props) {
    const [data, setData] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(process.env.NEXT_PUBLIC_API_URL + '/user');
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
                <option key={item.user_id} value={item.user_id} selected={props.selected_options==item.user_id ? "selected" : ""}>
                  {item.name}
                </option>
              ))}
        </React.Fragment>
    )
}