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
    <></>
  );
};

export default SimpleRadialBarChart;
