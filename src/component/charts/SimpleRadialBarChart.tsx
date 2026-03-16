import { useDigiContext } from "@/context/DigiContext";
import { radialBarChartData } from "@/data/data";
import React from "react";
import {
  RadialBarChart,
  RadialBar,
  Legend,
  ResponsiveContainer,
} from "recharts";

const SimpleRadialBarChart = () => {
  const { isRechartHeight } = useDigiContext();
  return (
    <ResponsiveContainer
      width="100%"
      maxHeight={410}
      minHeight={isRechartHeight}
    >
      <RadialBarChart
        data={radialBarChartData}
        cx="50%"
        cy="50%"
        innerRadius="10%"
        outerRadius="80%"
      >
        <RadialBar
          startAngle={15}
          label={{ fill: "#666", position: "insideStart" }}
          background
          dataKey="uv"
        />
        <Legend
          iconSize={10}
          width={120}
          height={140}
          layout="vertical"
          verticalAlign="middle"
          align="right"
        />
      </RadialBarChart>
    </ResponsiveContainer>
  );
};

export default SimpleRadialBarChart;
