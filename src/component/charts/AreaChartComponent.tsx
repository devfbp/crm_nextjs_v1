"use client";
import { useDigiContext } from "@/context/DigiContext";
import { areaChartData } from "@/data/data";
import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const AreaChartComponent = () => {
  const { currentTheme, isRechartHeight } = useDigiContext();
  return (
    <ResponsiveContainer
      width="100%"
      maxHeight={410}
      minHeight={isRechartHeight}
    >
      <AreaChart data={areaChartData}>
        <CartesianGrid stroke="#334652" strokeDasharray="3" />
        <XAxis
          dataKey="name"
          fill="#FFFFFF"
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
          dataKey="Desktops"
          stroke="#037fe0"
          fill="#2a4d76"
          strokeWidth={2}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default AreaChartComponent;
