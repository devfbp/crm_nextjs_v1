import React from 'react'
import { useState, useEffect } from 'react'

export default function StatusName(props) {
    const [data, setData] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(process.env.NEXT_PUBLIC_API_URL + '/lead-status?lead_status_id=' + props.status_id);
            const result = await response.json();
            setData(result);
        };
        fetchData();
    }, []);
    //console.log(data);
    return data.length > 0 ? (
        <React.Fragment>            
              {/* {data[0].lead_status_name} */}
              <span className={`badge text-${data[0].label_color || 'secondary'}  text-base`}>{data[0].lead_status_name}</span>
        </React.Fragment>
    ) : (
        <React.Fragment>
            Loading...
        </React.Fragment>
    )
}