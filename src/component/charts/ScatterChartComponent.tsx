import { useDigiContext } from "@/context/DigiContext";
import { simpleScatterData } from "@/data/data";
import React from "react";
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const ScatterChartComponent = () => {
  const { currentTheme, isRechartHeight } = useDigiContext();
  return (
    <ResponsiveContainer
      width="100%"
      maxHeight={410}
      minHeight={isRechartHeight}
    >
      <ScatterChart data={simpleScatterData}>
        <CartesianGrid />
        <XAxis
          dataKey="x"
          type="number"
          name="X"
          stroke={`${
            currentTheme === "light"
              ? "hsl(0deg 0% 0% / 70%)"
              : "hsl(0deg 0% 89.41% / 70%)"
          }`}
        />
        <YAxis
          dataKey="y"
          type="number"
          name="Y"
          stroke={`${
            currentTheme === "light"
              ? "hsl(0deg 0% 0% / 70%)"
              : "hsl(0deg 0% 89.41% / 70%)"
          }`}
        />
        <Tooltip cursor={{ strokeDasharray: "3 3" }} />
        <Legend />
        <Scatter name="Data" data={simpleScatterData} fill="#8884d8" />
      </ScatterChart>
    </ResponsiveContainer>
  );
};

export default ScatterChartComponent;
