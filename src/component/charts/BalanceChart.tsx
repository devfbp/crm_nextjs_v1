"use client";
import { useDigiContext } from "@/context/DigiContext";
import { balanceChartData } from "@/data/data";
import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const BalanceChart = () => {
  const { currentTheme, isRechartHeight } = useDigiContext();

  return (
    <ResponsiveContainer
      width="100%"
      maxHeight={410}
      minHeight={isRechartHeight}
    >
      <BarChart
        data={balanceChartData}
        margin={{ top: 20, right: 30, left: 20, bottom: 15 }}
      >
        <CartesianGrid
          strokeDasharray="3"
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
        <Legend />
        <Bar dataKey="stock" stackId="stack" fill="#0D99FF" />
        <Bar dataKey="order" stackId="stack" fill="#a9b4cc" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default BalanceChart;
