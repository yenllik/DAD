import {
  VictoryChart,
  VictoryBoxPlot,
  VictoryScatter,
  VictoryAxis,
  VictoryTheme,
  VictoryLabel,
} from "victory";
import { BoxPlotData, parseBoxPlotData } from "../utils/csvUtils";
import { useMemo } from "react";
// import { fetchAndParseCSV, parseBoxPlotData, BoxPlotData } from "./utilsCsv";

const AgeBoxPlot = () => {
  // need to filter for age 15-28
  const boxPlotData = useMemo(() => {
    const data = parseBoxPlotData("Age at Competition", "Rank");
    return data.filter((item: BoxPlotData) => +item.x >= 15 && +item.x <= 28);
  }, []);

  return (
    <VictoryChart theme={VictoryTheme.grayscale} domainPadding={20}>
      {/* title */}
      <VictoryLabel
        text="Box Plot of Age at Competition vs Rank (15-28)"
        x={210}
        y={30}
        textAnchor="middle"
        style={{ fontSize: 12, fontWeight: "bold" }}
      />
      <VictoryAxis
        label="Age at competition"
        style={{ axisLabel: { padding: 30 } }}
      />
      <VictoryAxis dependentAxis label="Rank" />

      {/* Box Plot */}
      <VictoryBoxPlot
        boxWidth={20}
        data={boxPlotData}
        whiskerWidth={10}
        x="x"
        y="y"
        style={{
          min: { stroke: "#4a3aff" },
          max: { stroke: "#4a3aff" },
          median: { stroke: "black", strokeWidth: 2 },
          q1: { fill: "rgba(74, 58, 255, 0.2)" },
          q3: { fill: "rgba(74, 58, 255, 0.2)" },
          //   background color
        }}
      />

      {/* Scatter for Outliers */}
      <VictoryScatter
        data={boxPlotData.flatMap((item) =>
          item.outliers.map((value) => ({ x: item.x, y: value }))
        )}
        size={3}
        style={{ data: { fill: "#636efa" } }}
      />
    </VictoryChart>
  );
};

export default AgeBoxPlot;
