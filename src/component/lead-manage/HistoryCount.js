"use client";
import React, { useEffect, useState } from "react";
import "./Leads.scss";

// Shows how many history entries a lead has.
// Pass `count` when the number is already known (the leads list API returns
// `history_count` on every row); it then renders without a network request.
// Without `count`, it fetches the number for `lead_id`.
const HistoryCount = (props) => {
  const hasCount = typeof props.count === "number";
  const [records, setRecords] = useState(null);

  useEffect(() => {
    if (hasCount || !props.lead_id) return;
    let cancelled = false;
    const fetchData = async () => {
      const response = await fetch(
        process.env.NEXT_PUBLIC_API_URL +
          "/lead-status-entry?history_count=1&lead_id=" +
          props.lead_id
      );
      const result = await response.json();
      if (!cancelled) setRecords(result);
    };

    fetchData();
    return () => {
      cancelled = true;
    };
  }, [props.lead_id, hasCount]);

  return (
    <div>{(hasCount ? props.count : records?.history_count) || 0}</div>
  );
};

export default HistoryCount;
