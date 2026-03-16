import React from 'react'
import { useState, useEffect } from 'react'

export default function StateList(props) {
    const [data, setData] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(process.env.NEXT_PUBLIC_API_URL + '/state');
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
                <option key={item.state_id} value={item.state_id} selected={props.selected_options==item.state_id ? "selected" : ""}>
                  {item.state_name}
                </option>
              ))}
        </React.Fragment>
    )
}