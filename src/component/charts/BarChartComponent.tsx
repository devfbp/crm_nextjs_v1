"use client";
import { useDigiContext } from "@/context/DigiContext";
import { chartData } from "@/data/data";
import React from "react";
import {
  BarChart,
  Bar,
  YAxis,
  XAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const BarChartComponent = () => {
  const { currentTheme, isRechartHeight } = useDigiContext();
  return (
    <ResponsiveContainer
      width="100%"
      maxHeight={410}
      minHeight={isRechartHeight}
    >
      <BarChart data={chartData} layout="vertical">
        <CartesianGrid stroke="#334652" strokeDasharray="3" />
        <XAxis
          type="number"
          fill="#FFFFFF"
          stroke={`${
            currentTheme === "light"
              ? "hsl(0deg 0% 0% / 70%)"
              : "hsl(0deg 0% 89.41% / 70%)"
          }`}
        />
        <YAxis
          type="category"
          dataKey="name"
          fill="#FFFFFF"
          stroke={`${
            currentTheme === "light"
              ? "hsl(0deg 0% 0% / 70%)"
              : "hsl(0deg 0% 89.41% / 70%)"
          }`}
        />
        <Tooltip />
        <Bar dataKey="Desktops" fill="#037fe0" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default BarChartComponent;
