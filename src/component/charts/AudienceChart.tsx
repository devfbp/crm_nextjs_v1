"use client";
import { useDigiContext } from "@/context/DigiContext";
import { audienceChartData } from "@/data/data";
import React from "react";
import {
  AreaChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Area,
  ResponsiveContainer,
} from "recharts";

function AudienceChart() {
  const { currentTheme, isRechartHeight } = useDigiContext();
  return (
    <ResponsiveContainer
      width="100%"
      maxHeight={410}
      minHeight={isRechartHeight}
    >
      <AreaChart
        data={audienceChartData}
        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
      >
        <CartesianGrid
          strokeDasharray="3 3"
          stroke={`${
            currentTheme === "light"
              ? "rgb(0 0 0 / 20%)"
              : "rgba(255, 255, 255, 0.2)"
          }`}
        />
        <XAxis
          dataKey="name"
          stroke={`${
            currentTheme === "light"
              ? "hsl(0deg 0% 0% / 70%)"
              : "hsl(0deg 0% 89.41% / 70%)"
          }`}
        />
        <YAxis
          stroke={`${
            currentTheme === "light"
              ? "hsl(0deg 0% 0% / 70%)"
              : "hsl(0deg 0% 89.41% / 70%)"
          }`}
        />
        <Tooltip />
        <Area
          type="monotone"
          dataKey="stock"
          stackId="1"
          stroke="#1490e3"
          fill="#1490e3"
        />
        <Area
          type="monotone"
          dataKey="order"
          stackId="1"
          stroke="#37c3ed"
          fill="#37c3ed"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}

export default AudienceChart;
