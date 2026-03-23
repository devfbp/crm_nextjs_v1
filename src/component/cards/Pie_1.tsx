"use client";

import React, { useState, useEffect } from "react";
import { useDigiContext } from "@/context/DigiContext";
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Tooltip,
  Legend,
  Cell,
} from "recharts";

// Type for a single lead status with count
interface LeadStatusData {
  name: string;
  count: number;
}

const SalesAnalytics: React.FC = () => {
  const COLORS = ["#a9b4cc", "#5188ff"]; // Due = Green, Overdue = Red
  const data = [
    { name: "Due", value: 18 },
    { name: "Overdue", value: 5 },
  ];
  const total = data.reduce((sum, item) => sum + item.value, 0);

  const { currentTheme, isRechartHeight } = useDigiContext();
  const [leadData, setLeadData] = useState<LeadStatusData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await fetch(process.env.NEXT_PUBLIC_API_URL + "/dashboard");
        const data = await response.json();

        // Map API data to chart-friendly format
        const leadStatusData: LeadStatusData[] = data.lead_status.map(
          (item: any) => ({
            name: item.lead_status_name,
            count: item.leadcount,
          })
        );

        setLeadData(leadStatusData);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return <div>Loading chart...</div>;
  }

  if (leadData.length === 0) {
    return <div>No lead status data available.</div>;
  }

  return (
    <div className="col-lg-6 col-md-12" style={{ border: "1px solid #ccc", borderRadius: "8px", padding: "16px" }}>
      <div className="panel chart-panel-1">
        <div className="panel-header">
          <h5>Due and Overdue Leads</h5>
          <div className="btn-box">
            {/* <button className="btn btn-sm btn-outline-primary">Week</button>
            <button className="btn btn-sm btn-outline-primary">Month</button>
            <button className="btn btn-sm btn-outline-primary">Year</button> */}
          </div>
        </div>

        <div className="panel-body">
          <div id="saleAnalytics" className="chart-dark">
            <ResponsiveContainer
              width="100%"
              height={250}
            >
              <PieChart>
                <Pie
                  data={data}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  fill="#8884d8"
                  label={(entry) => `${entry.name}: ${((entry.value / total) * 100).toFixed(1)}%`}
                >
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SalesAnalytics;