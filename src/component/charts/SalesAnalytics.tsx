"use client";
import { useDigiContext } from "@/context/DigiContext";
import { salesAnalyticData } from "@/data/data";
import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const SalesAnalytics = () => {
  const { currentTheme, isRechartHeight } = useDigiContext();
  return (
    <div className="col-xxl-8">
      <div className="panel chart-panel-1">
        <div className="panel-header">
          <h5>Sales Analytics</h5>
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
              maxHeight={410}
              minHeight={isRechartHeight}
            >
              <AreaChart
                data={salesAnalyticData}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid
                  strokeDasharray="3"
                  stroke={`${
                    currentTheme === "light"
                      ? "hsl(0deg 0% 0% / 20%)"
                      : "rgba(255, 255, 255, 0.2)"
                  }`}
                />
                <XAxis
                  dataKey="name"
                  stroke={`${
                    currentTheme === "light"
                      ? "hsl(0deg 0% 27.45% / 70%)"
                      : "hsl(0deg 0% 89.41% / 70%)"
                  }`}
                />
                <YAxis
                  stroke={`${
                    currentTheme === "light"
                      ? "hsl(0deg 0% 27.45% / 70%)"
                      : "hsl(0deg 0% 89.41% / 70%)"
                  }`}
                />
                <Tooltip />
                <Legend className="sales" />
                <Area
                  type="monotone"
                  dataKey="stock"
                  stackId="1"
                  fill="hsl(205.29deg 100% 52.55% / 60%)"
                  stroke="hsl(205.29deg 100% 52.55% / 60%)"
                />
                <Area
                  type="monotone"
                  dataKey="order"
                  stackId="1"
                  fill="#a9b4cc"
                  stroke="#a9b4cc"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SalesAnalytics;
