import React from 'react'
import { useState, useEffect } from 'react'

export default function UserName(props) {
    const [data, setData] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(process.env.NEXT_PUBLIC_API_URL + '/user?id=' + props.user_id);
            const result = await response.json();
            setData(result);
        };
        fetchData();
    }, []);
    return data!="" ? (
        <React.Fragment>            
              {data.name}
        </React.Fragment>
    ) : (
        <React.Fragment>
            Loading...
        </React.Fragment>
    )
}