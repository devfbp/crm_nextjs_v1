import React from 'react'
import { useState, useEffect } from 'react'

export default function StateList(props) {
    const [data, setData] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(process.env.NEXT_PUBLIC_API_URL + '/source?source_id=' + props.source_id);
            const result = await response.json();
            setData(result);
        };
        fetchData();
    }, []);
    //console.log(data);
    return data.length > 0 ? (
        <React.Fragment>            
              {data[0].source_name}
        </React.Fragment>
    ) : (
        <React.Fragment>
            Loading...
        </React.Fragment>
    )
}