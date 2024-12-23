import { useMemo } from "react";
import {
  CartesianGrid,
  ResponsiveContainer,
  ScatterChart,
  XAxis,
  YAxis,
  Tooltip,
  Scatter,
} from "recharts";
import { generateShortFreeScatterData } from "../utils/csvUtils";

const ShortFree = () => {
  const data = useMemo(() => generateShortFreeScatterData(), []);

  return (
    <ResponsiveContainer width="100%" height={400}>
      <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
        <CartesianGrid />
        <XAxis
          label={{
            value: "Short Program Score",
            angle: 0,
            dy: 20,
          }}
          type="number"
          dataKey="x"
          name="Short Program Score"
          domain={[50, 120]}
        />
        {/* center the label */}
        <YAxis
          label={{
            value: "Free Skate Score",
            angle: -90,
            position: "insideLeft",
            dy: 20,
          }}
          type="number"
          dataKey="y"
          name="Free Skate Score"
          domain={[110, 230]}
        />
        <Tooltip cursor={{ strokeDasharray: "3 3" }} />
        <Scatter name="A school" data={data} fill="#8884d8" />
      </ScatterChart>
    </ResponsiveContainer>
  );
};

export default ShortFree;
