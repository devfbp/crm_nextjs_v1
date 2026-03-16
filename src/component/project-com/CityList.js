import React from 'react'
import { useState, useEffect } from 'react'

export default function StateList(props) {
    const [data, setData] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(process.env.NEXT_PUBLIC_API_URL + '/city');
            const result = await response.json();
            setData(result);
        };
        fetchData();
    }, []);
    //console.log(data);
    return (
        <React.Fragment>            
              <option value={0}>Choose...</option>
              {data?.map((item) => (
                <option key={item.city_id} value={item.city_id} selected={props.selected_options==item.city_id ? "selected" : ""}>
                  {item.city_name}
                </option>
              ))}
        </React.Fragment>
    )
}