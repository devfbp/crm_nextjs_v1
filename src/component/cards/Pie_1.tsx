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

// Type for lead status
interface LeadStatusData {
  name: string;
  count: number;
}

const SalesAnalytics: React.FC = () => {
  const COLORS = ["#a9b4cc", "#5188ff"]; // Due, Overdue colors

  const { currentTheme, isRechartHeight } = useDigiContext();

  const [leadData, setLeadData] = useState<LeadStatusData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await fetch(
          process.env.NEXT_PUBLIC_API_URL + "/dashboard"
        );
        const data = await response.json();

        const dueCount = data?.dueCount || 0;
        const overdueCount = data?.overdueCount || 0;

        // ✅ Set dynamic chart data
        setLeadData([
          { name: "Due", count: dueCount },
          { name: "Overdue", count: overdueCount },
        ]);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
        setLeadData([
          { name: "Due", count: 0 },
          { name: "Overdue", count: 0 },
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return <div>Loading chart...</div>;
  }

  if (!leadData.length) {
    return <div>No lead status data available.</div>;
  }

  // ✅ convert to recharts format
  const data = leadData.map((item) => ({
    name: item.name,
    value: item.count,
  }));

  const total = data.reduce((sum, item) => sum + item.value, 0);

  return (
    <div
      className="col-lg-6 col-md-12"
      style={{
        border: "1px solid #ccc",
        borderRadius: "8px",
        padding: "16px",
      }}
    >
      <div className="panel chart-panel-1">
        <div className="panel-header">
          <h5>Due and Overdue Leads</h5>
        </div>

        <div className="panel-body">
          <div id="saleAnalytics" className="chart-dark">
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={data}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  label={(entry: any) =>
                    `${entry.name}: ${(
                      (entry.value / total) *
                      100
                    ).toFixed(1)}%`
                  }
                >
                  {data.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
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