import { useDigiContext } from "@/context/DigiContext";
import { treeMapChartData } from "@/data/data";
import React from "react";
import { Treemap, ResponsiveContainer } from "recharts";

const threshold = 5000;

const SimpleTreemap: React.FC = () => {
  const { isRechartHeight } = useDigiContext();
  // Filter out nodes with a size below the threshold
  const filteredData = treeMapChartData.map((parent) => ({
    ...parent,
    children: parent.children.filter(isNodeWithSizeAboveThreshold),
  }));

  // Type guard to check if a node has a size above the threshold
  function isNodeWithSizeAboveThreshold(
    child: { size: number } | { children: any[] }
  ): child is { size: number } {
    return "size" in child && child.size >= threshold;
  }

  return (
    <ResponsiveContainer
      width="100%"
      maxHeight={410}
      minHeight={isRechartHeight}
    >
      <Treemap
        width={500}
        height={400}
        data={filteredData}
        dataKey="size"
        stroke="#fff"
        fill="#8884d8"
      />
    </ResponsiveContainer>
  );
};

export default SimpleTreemap;
