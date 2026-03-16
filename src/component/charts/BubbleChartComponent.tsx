"use client";
import { useDigiContext } from "@/context/DigiContext";
import { bubbleChartData01, bubbleChartData02 } from "@/data/data";
import React from "react";
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const BubbleChartComponent = () => {
  const { currentTheme, isRechartHeight } = useDigiContext();
  return (
    <ResponsiveContainer
      width="100%"
      maxHeight={410}
      minHeight={isRechartHeight}
    >
      <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
        <CartesianGrid />
        <XAxis
          type="category"
          dataKey="hour"
          name="Hour"
          stroke={`${
            currentTheme === "light"
              ? "hsl(0deg 0% 0% / 70%)"
              : "hsl(0deg 0% 89.41% / 70%)"
          }`}
        />
        <YAxis
          type="number"
          dataKey="value"
          name="Value"
          stroke={`${
            currentTheme === "light"
              ? "hsl(0deg 0% 0% / 70%)"
              : "hsl(0deg 0% 89.41% / 70%)"
          }`}
        />
        <Tooltip cursor={{ strokeDasharray: "3 3" }} />
        <Scatter name="Data 01" data={bubbleChartData01} fill="#8884d8" />
        <Scatter name="Data 02" data={bubbleChartData02} fill="#82ca9d" />
      </ScatterChart>
    </ResponsiveContainer>
  );
};

export default BubbleChartComponent;
