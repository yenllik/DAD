import React, { useMemo } from "react";
import {
  ComposedChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Scatter,
  Cell,
  ZAxis,
} from "recharts";
import { generateHeatmapData } from "../utils/csvUtils";

// Dynamic color scale
const colorScale = (value: number): string => {
  if (value === 0) return "#00008B"; // Dark Blue for 0
  if (value <= 2) return "#4B0082";
  if (value <= 5) return "#8B008B";
  if (value <= 8) return "#FF4500";
  return "#FFFF00"; // Yellow for high rank count
};

// const CustomSquare = (props: any) => {
//     const { cx, cy, size, fill } = props;
//     const half = size / 2;
//     return (
//       <rect
//         x={cx - half}
//         y={cy - half}
//         width={size}
//         height={size}
//         fill={fill}
//         stroke="#fff"
//       />
//     );
//   };

const Heatmap = () => {
  // use memo instead
  //   const data = generateHeatmapData(); // Should provide { age, nationality, rankCount }
  const data = useMemo(() => generateHeatmapData(), []);

  return (
    <ResponsiveContainer width="100%" height={400}>
      <ComposedChart
        layout="vertical"
        data={data}
        margin={{ top: 20, right: 30, left: 50, bottom: 20 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        {/* X-Axis: Numeric Age */}
        <XAxis
          type="number"
          dataKey="age"
          domain={[15, 28]}
          tickCount={14}
          label={{ value: "Age at Competition", position: "bottom", dy: 0 }}
          tickMargin={10}
        />
        {/* Y-Axis: Nationality */}
        <YAxis
          type="category"
          dataKey="nationality"
          tickMargin={10}
          //   label={{ value: "Nationality", angle: -90, position: "insideLeft" }}
        />
        {/* Tooltip */}
        <Tooltip cursor={{ strokeDasharray: "3 3" }} />
        {/* z axis to make scatter size bigger */}
        <ZAxis dataKey="rankCount" range={[900, 900]} />

        {/* Scatter to plot heatmap cells */}
        <Scatter name="Rank Count" data={data} fill="#8884d8" shape="square">
          {data.map((entry, index) => (
            <Cell
              key={`cell-${index}`}
              fill={colorScale(entry.rankCount)}
              stroke="#fff"
            />
          ))}
        </Scatter>
      </ComposedChart>
    </ResponsiveContainer>
  );
};

export default Heatmap;
