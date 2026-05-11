"use client";
import React, { useEffect, useState } from "react";
import "./Leads.scss";

const HistoryCount = (props) => {
  const [records, setRecords] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        process.env.NEXT_PUBLIC_API_URL +
          "/lead-status-entry?history_count=1&lead_id=" +
          props.lead_id
      );
      const result = await response.json();
      setRecords(result);
    };

    fetchData();
  }, [props.lead_id]);

  return (
    <div>{records?.history_count || 0}</div>
  );
};

export default HistoryCount;