"use client";
import { useDigiContext } from "@/context/DigiContext";
import { customContentData } from "@/data/data";
import React from "react";
import {
  ComposedChart,
  Tooltip,
  CartesianGrid,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Area,
  Bar,
  Line,
} from "recharts";

interface CustomContentOfTooltipProps {
  active?: boolean;
  payload?: any;
  label?: string;
}

const CustomContentOfTooltip: React.FC<CustomContentOfTooltipProps> = ({
  active,
  payload,
  label,
}) => {
  const getIntroOfPage = (label: string) => {
    if (label === "Page A") {
      return "Page A is about men's clothing";
    }
    if (label === "Page B") {
      return "Page B is about women's dress";
    }
    if (label === "Page C") {
      return "Page C is about women's bag";
    }
    if (label === "Page D") {
      return "Page D is about household goods";
    }
    if (label === "Page E") {
      return "Page E is about food";
    }
    if (label === "Page F") {
      return "Page F is about baby food";
    }
    return "";
  };

  if (active && payload && payload.length && label) {
    const data = payload[0].payload;
    return (
      <div
        style={{
          background: "#fff",
          border: "1px solid #ccc",
          padding: "10px",
        }}
      >
        <p>{label}</p>
        <p>{`UV: ${data.uv}`}</p>
        <p>{`PV: ${data.pv}`}</p>
        <p>{`AMT: ${data.amt}`}</p>
        <p>{getIntroOfPage(label)}</p>
      </div>
    );
  }

  return null;
};

const CustomContentOfTooltipChart: React.FC = () => {
  const { currentTheme, isRechartHeight } = useDigiContext();

  return (
    <ResponsiveContainer
      width="100%"
      maxHeight={410}
      minHeight={isRechartHeight}
    >
      <ComposedChart data={customContentData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey="name"
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
        <Tooltip content={<CustomContentOfTooltip />} />
        <Area type="monotone" dataKey="amt" fill="#8884d8" stroke="#8884d8" />
        <Bar dataKey="pv" barSize={20} fill="#413ea0" />
        <Line type="monotone" dataKey="uv" stroke="#ff7300" />
      </ComposedChart>
    </ResponsiveContainer>
  );
};

export default CustomContentOfTooltipChart;
