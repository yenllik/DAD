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
import { generateEdaScatterData } from "../utils/csvUtils";

const EdaScatterChart = () => {
  const data = useMemo(() => generateEdaScatterData(), []);

  return (
    <ResponsiveContainer width="100%" height={400}>
      <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
        <CartesianGrid />
        <XAxis
          label={{
            value: "Starting Order",
            angle: 0,
            dy: 20,
          }}
          type="number"
          dataKey="x"
          name="Starting Order"
          domain={[0, 25]}
        />
        {/* center the label */}
        <YAxis
          label={{
            value: "Total Score",
            angle: -90,
            position: "insideLeft",
            dy: 20,
          }}
          type="number"
          dataKey="y"
          name="Total Score"
          domain={[150, 350]}
        />
        <Tooltip cursor={{ strokeDasharray: "3 3" }} />
        <Scatter name="A school" data={data} fill="#8884d8" />
      </ScatterChart>
    </ResponsiveContainer>
  );
};

export default EdaScatterChart;
