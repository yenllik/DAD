import { useMemo } from "react";
import {
  CartesianGrid,
  ResponsiveContainer,
  ScatterChart,
  XAxis,
  YAxis,
  Tooltip,
  Scatter,
  Legend,
} from "recharts";
import { generateGenderTechnicalProgramData } from "../utils/csvUtils";

const TechnicalProgram = () => {
  const data1 = useMemo(() => generateGenderTechnicalProgramData("Male"), []);
  const data2 = useMemo(() => generateGenderTechnicalProgramData("Female"), []);

  return (
    <ResponsiveContainer width="100%" height={400}>
      <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
        <CartesianGrid />
        <XAxis
          label={{
            value: "Technical Elements Score",
            angle: 0,
            dy: 20,
          }}
          type="number"
          dataKey="x"
          name="Starting Order"
          domain={[70, 205]}
        />
        {/* center the label */}
        <YAxis
          label={{
            value: "Program Components Score",
            angle: -90,
            position: "insideLeft",
            dy: 80,
          }}
          type="number"
          dataKey="y"
          name="Total Score"
          domain={[65, 155]}
        />
        <Tooltip cursor={{ strokeDasharray: "3 3" }} />
        <Legend
          layout="horizontal"
          verticalAlign="top"
          align="right"
          iconType="circle"
          // move up a little bit
          wrapperStyle={{ top: 0 }}
        />
        <Scatter name="Male" data={data1} fill="#8884d8" />
        <Scatter name="Female" data={data2} fill="#82ca9d" />
      </ScatterChart>
    </ResponsiveContainer>
  );
};

export default TechnicalProgram;
