import { useDigiContext } from "@/context/DigiContext";
import { chartData } from "@/data/data";
import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const LineChartComponent = () => {
  const { currentTheme, isRechartHeight } = useDigiContext();
  return (
    <ResponsiveContainer
      width="100%"
      maxHeight={410}
      minHeight={isRechartHeight}
    >
      <LineChart data={chartData}>
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
        <Line
          type="monotone"
          dataKey="Desktops"
          stroke="#037fe0"
          strokeWidth={2}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default LineChartComponent;
