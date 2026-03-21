"use client";
import React from "react";
import { useState, useEffect } from "react";
const LastLeadEntry = ({ leadId }) => {
  const [leadData, setLeadData] = useState(null);
  useEffect(() => {
    const fetchLeadData = async () => {
      try {
        const response = await fetch(process.env.NEXT_PUBLIC_API_URL + `/lead-status-entry?lead_view=2&lead_id=${leadId}`);
        if (response.ok) {
          const data = await response.json();
          setLeadData(data); // Assuming the API returns an array and we want the first item
        }
      } catch (error) {
        console.error("Error fetching lead data:", error);
      }
    };
    if (leadId) {
      fetchLeadData();
    } else {
      setLeadData(null);
    }
  }, [leadId]);
  return (
    <div>
      <h2>Last Lead Status Entry</h2>
      {leadData && (
        <table className="table table-bordered text-xs">
          <thead>
            <tr className="leading-tight">
              <th className="py-1 px-2">From Status</th>
              <th className="py-1 px-2">To Status</th>
              <th className="py-1 px-2">Remarks</th>
            </tr>
          </thead>
          <tbody>
            <tr className="leading-tight">
              <td className="py-1 px-2">{leadData.from_status}</td>
              <td className="py-1 px-2">{leadData.to_status}</td>
              <td className="py-1 px-2">{leadData.remarks}</td>
            </tr>
          </tbody>
        </table>
      )}
    </div>
  );
};

export default LastLeadEntry;