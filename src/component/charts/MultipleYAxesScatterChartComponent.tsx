"use client";
import { useDigiContext } from "@/context/DigiContext";
import { scatterChartData01, scatterChartData02 } from "@/data/data";
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

const MultipleYAxesScatterChartComponent = () => {
  const { currentTheme, isRechartHeight } = useDigiContext();
  return (
    <ResponsiveContainer
      width="100%"
      maxHeight={410}
      minHeight={isRechartHeight}
    >
      <ScatterChart>
        <CartesianGrid />
        <XAxis
          type="number"
          dataKey="x"
          name="X"
          stroke={`${
            currentTheme === "light"
              ? "hsl(0deg 0% 0% / 70%)"
              : "hsl(0deg 0% 89.41% / 70%)"
          }`}
        />
        <YAxis
          type="number"
          dataKey="y"
          name="Y1"
          stroke={`${
            currentTheme === "light"
              ? "hsl(0deg 0% 0% / 70%)"
              : "hsl(0deg 0% 89.41% / 70%)"
          }`}
        />
        <YAxis
          type="number"
          dataKey="z"
          name="Y2"
          orientation="right"
          stroke={`${
            currentTheme === "light"
              ? "hsl(0deg 0% 0% / 70%)"
              : "hsl(0deg 0% 89.41% / 70%)"
          }`}
        />
        <Tooltip cursor={{ strokeDasharray: "3 3" }} />

        <Scatter name="Data 01" data={scatterChartData01} fill="#8884d8" />
        <Scatter name="Data 02" data={scatterChartData02} fill="#82ca9d" />
      </ScatterChart>
    </ResponsiveContainer>
  );
};

export default MultipleYAxesScatterChartComponent;
