import React from 'react'
import { useState, useEffect } from 'react'

export default function List(props) {
    const [data, setData] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            let url = process.env.NEXT_PUBLIC_API_URL + 'user?cid=';
            if (props?.cuserid) {
                url += props?.cuserid;
            } 
            if (props?.manger == "gmid") {
                url += "&gmid=1";
            }
            if (props?.manger == "rmid") {
                url += "&rmid=1";
            }

            const response = await fetch(url);
            const result = await response.json();
            setData(result);
        };
        fetchData();
    }, []);
    //console.log(data);
    return (
        <React.Fragment>
            {props?.selected_options == "full" ?
                <option value={""}>All</option>
                :
                <option value={0}>Choose...</option>

            }

            {data?.map((item) => (
                <option key={item.user_id} value={item.user_id} selected={props?.selected_options != "full" && props.selected_options == item.user_id ? "selected" : ""}>
                    {item.name}
                </option>
            ))}
        </React.Fragment>
    )
}