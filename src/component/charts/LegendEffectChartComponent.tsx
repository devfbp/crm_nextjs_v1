import React from "react";
import {
  ComposedChart,
  Tooltip,
  Area,
  Bar,
  Line,
  XAxis,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import { legendEffectChartData } from "@/data/data";
import { useDigiContext } from "@/context/DigiContext";

const LegendEffectChartComponent = () => {
  const { currentTheme, isRechartHeight } = useDigiContext();
  return (
    <ResponsiveContainer
      width="100%"
      maxHeight={410}
      minHeight={isRechartHeight}
    >
      <ComposedChart data={legendEffectChartData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey="name"
          stroke={`${
            currentTheme === "light"
              ? "hsl(0deg 0% 0% / 70%)"
              : "hsl(0deg 0% 89.41% / 70%)"
          }`}
        />
        <Tooltip />
        <Area
          type="monotone"
          dataKey="amt"
          fill="#8884d8"
          stroke="#8884d8"
          fillOpacity={0.6}
        />
        <Bar dataKey="pv" barSize={20} fill="#413ea0" fillOpacity={0.8} />
        <Line type="monotone" dataKey="uv" stroke="#ff7300" strokeWidth={2} />
      </ComposedChart>
    </ResponsiveContainer>
  );
};

export default LegendEffectChartComponent;
