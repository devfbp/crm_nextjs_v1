import { useDigiContext } from "@/context/DigiContext";
import { mixedChartData } from "@/data/data";
import React, { useContext } from "react";
import {
  ComposedChart,
  Line,
  Area,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Scatter,
  ResponsiveContainer,
} from "recharts";

const MixedChartComponent = () => {
  const { currentTheme, isRechartHeight } = useDigiContext();
  return (
    <ResponsiveContainer
      width="100%"
      maxHeight={410}
      minHeight={isRechartHeight}
    >
      <ComposedChart data={mixedChartData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey="date"
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
        <Bar dataKey="TEAM A" fill="#008ffb" barSize={20} />
        <Area
          type="monotone"
          dataKey="TEAM B"
          fill="#0d5258"
          stroke="#00e396"
        />
        <Line type="monotone" dataKey="TEAM C" stroke="rgb(254 176 25)" />
      </ComposedChart>
    </ResponsiveContainer>
  );
};

export default MixedChartComponent;
