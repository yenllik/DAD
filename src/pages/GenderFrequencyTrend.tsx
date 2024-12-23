import React, { useMemo } from "react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  //   Legend,
} from "recharts";
import { getGenderFrequencyTrendByYear } from "../utils/csvUtils";

interface ChartData {
  year: number;
  total: number;
  male: number;
  female: number;
}

const GenderFrequencyTrend = () => {
  // Mock data: Replace with real fetched data
  const data: ChartData[] = useMemo(() => getGenderFrequencyTrendByYear(), []);

  return (
    <div className="flex flex-col gap-4 p-4 bg-white shadow-lg rounded-2xl pr-8">
      <div className="w-full flex justify-center gap-4 items-center">
        <div className="flex justify-center items-center gap-2">
          <div className="relative w-8 h-2">
            <div className="absolute w-2 h-2 bg-red-500 rounded-full top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute w-8  border  border-red-500 text-red-500 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
          </div>
          <span>Total</span>
        </div>
        <div className="flex justify-center items-center gap-2">
          <div className="w-2 h-2 bg-[#4A3AFF] "></div>
          <span>Male</span>
        </div>
        <div className="flex justify-center items-center gap-2">
          <div className="w-2 h-2 bg-[#C893FD] "></div>
          <span>Female</span>
        </div>
      </div>

      {/* Line Chart for Total Trend */}
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="year" />
          <YAxis
            label={{
              value: "Total Frequency",
              angle: -90,
              position: "insideLeft",
              fill: "red",
            }}
          />
          <Tooltip />
          {/* <Legend verticalAlign="top" align="center" iconType="circle" /> */}
          <Line
            type="monotone"
            dataKey="total"
            stroke="red"
            strokeWidth={2}
            dot={{ fill: "red", r: 4 }}
            name="Total"
          />
        </LineChart>
      </ResponsiveContainer>
      <div className="w-full -mt-4 text-center">Year</div>
      {/* Bar Chart for Gender Frequency */}
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          {/* add xaxis label */}

          <XAxis dataKey="year" />
          <YAxis
            label={{
              value: "Frequency",
              angle: -90,
              position: "insideLeft",
              fill: "blue",
            }}
          />
          <Tooltip />

          {/* <Legend verticalAlign="top" align="center" iconType="circle" /> */}
          <Bar dataKey="male" fill="#4A3AFF" name="Male" />
          <Bar dataKey="female" fill="#C893FD" name="Female" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default GenderFrequencyTrend;
