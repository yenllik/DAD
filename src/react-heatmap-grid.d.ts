declare module "react-heatmap-grid" {
  import React from "react";

  interface HeatMapProps {
    xLabels: string[] | number[];
    yLabels: string[] | number[];
    data: number[][];
    xLabelWidth?: number;
    yLabelWidth?: number;
    unit?: string;
    cellRender?: (value: number, x: number, y: number) => React.ReactNode;
    cellStyle?: (value: number, x: number, y: number) => React.CSSProperties;
    background?: string;
  }

  const HeatMap: React.FC<HeatMapProps>;
  export default HeatMap;
}
