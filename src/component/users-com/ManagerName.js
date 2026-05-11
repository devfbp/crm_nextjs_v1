import React from 'react'
import { useState, useEffect } from 'react'

export default function ManagerName(props) {
    const [data, setData] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(process.env.NEXT_PUBLIC_API_URL + '/user?id=' + props.user_id);
            const result = await response.json();
            setData(result);
        };
        fetchData();
    }, []);
    //console.log(data);
    return data.name ? (
        <React.Fragment>
            <div title={data.name}>            
              {data.name.length > 10 ? data.name.substring(0, 10) + "..." : data.name}
            </div>
        </React.Fragment>
    ) : (
        <React.Fragment>
            Loading...
        </React.Fragment>
    )
}