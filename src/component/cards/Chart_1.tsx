"use client";

import React, { useState, useEffect } from "react";
import { useDigiContext } from "@/context/DigiContext";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

// Type for a single lead status with count
interface LeadStatusData {
  name: string;
  count: number;
}

const SalesAnalytics: React.FC = () => {
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
    <div className="col-xxl-8">
      <div className="panel chart-panel-1">
        <div className="panel-header">
          <h5>Status Wise Leads</h5>
          <div className="btn-box">
            <button className="btn btn-sm btn-outline-primary">Week</button>
            <button className="btn btn-sm btn-outline-primary">Month</button>
            <button className="btn btn-sm btn-outline-primary">Year</button>
          </div>
        </div>

        <div className="panel-body">
          <div id="saleAnalytics" className="chart-dark">
            <ResponsiveContainer
              width="100%"
              height={isRechartHeight || 400}
            >
              <BarChart
                data={leadData}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke={
                    currentTheme === "light"
                      ? "hsl(0deg 0% 0% / 20%)"
                      : "rgba(255, 255, 255, 0.2)"
                  }
                />
                <XAxis
                  dataKey="name"
                  stroke={
                    currentTheme === "light"
                      ? "hsl(0deg 0% 27.45% / 70%)"
                      : "hsl(0deg 0% 89.41% / 70%)"
                  }
                />
                <YAxis />
                <Tooltip />
                <Legend className="Status" />
                <Bar dataKey="count" fill="#a9b4cc" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SalesAnalytics;