import React from 'react'
import { useState, useEffect } from 'react'

export default function UserName(props) {
    const [data, setData] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            if(props.type === "multiple") {
                const response = await fetch(process.env.NEXT_PUBLIC_API_URL + '/user-team?user_team_id=' + props.user_id);
                const result = await response.json();
                // console.log("User Team Members:", result);
                let memberNames = [];
                result.forEach(team => {
                    let uname = team?.user?.name;                    
                    memberNames.push(uname);
                });
                setData(memberNames.join(", "));
                // console.log("User Name:", memberNames.join(", "));
            } else {
                const response = await fetch(process.env.NEXT_PUBLIC_API_URL + '/user?id=' + props.user_id);
                const result = await response.json();
                setData(result);
            }
        };
        fetchData();
    }, []);
    return data!="" ? (
        <React.Fragment>            
              {data.name ? data.name : data}
        </React.Fragment>
    ) : (
        <React.Fragment>
            Loading...
        </React.Fragment>
    )
}