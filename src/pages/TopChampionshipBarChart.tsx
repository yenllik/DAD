import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { getTopChampionshipsByParticipants } from "../utils/csvUtils";

const TopChampionshipBarChart = () => {
  const [showGender, setShowGender] = useState(false);
  const [yAxisWidth, setYAxisWidth] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Calculate 40% of the container width
    if (containerRef.current) {
      setYAxisWidth(containerRef.current.offsetWidth * 0.4);
    }
  }, []);

  const chartData = useMemo(() => getTopChampionshipsByParticipants(), []);

  return (
    <div ref={containerRef} className="p-4 bg-white shadow-lg rounded-2xl">
      <div className="px-4 pb-5 flex justify-between items-center">
        <div className="flex flex-col">
          <span className="text-lg text-[#9291A5]">
            Participation rate by championships
          </span>
          <span className="text-2xl font-bold">Top 10</span>
        </div>
        <div className="flex justify-end mb-2">
          <label className="flex items-center space-x-2 cursor-pointer ">
            <input
              type="checkbox"
              checked={showGender}
              onChange={() => setShowGender(!showGender)}
              className="border !border-[#9747FF] w-4 h-4 accent-[#9747FF]"
            />
            <span className="text-gray-700">{"Gender distribution"}</span>
          </label>
        </div>
      </div>
      <ResponsiveContainer width="100%" height={800}>
        <BarChart
          data={chartData}
          layout="vertical"
          margin={{ top: 10, right: 50, bottom: 10, left: 10 }}
        >
          {/* <XAxis dataKey="championship" tickLine={false} tick={{ dy: 10 }} /> */}
          <CartesianGrid strokeDasharray="3 3" horizontal={false} />
          {/* <YAxis axisLine={false} tickLine={false} tick={{ dx: -10 }} /> */}
          <YAxis
            dataKey="championship"
            type="category"
            tickLine={false}
            axisLine={false}
            tick={{ dx: -10, style: { whiteSpace: "nowrap" } }}
            width={yAxisWidth}
          />
          <XAxis
            type="number"
            axisLine={false}
            tickLine={false}
            orientation="top"
          />
          <Tooltip />
          <Legend
            layout="horizontal"
            verticalAlign="top"
            align="right"
            iconType="circle"
            // move up a little bit
            wrapperStyle={{ top: -10 }}
          />
          {showGender ? (
            <>
              <Bar
                dataKey="genderDistribution.Male"
                stackId="a"
                fill="#4A3AFF"
                name="Male"
                barSize={30}
              />
              <Bar
                dataKey="genderDistribution.Female"
                stackId="a"
                fill="#C893FD"
                name="Female"
                barSize={30}
                radius={[0, 10, 10, 0]}
              />
            </>
          ) : (
            <Bar
              dataKey="participants"
              fill="#F0E5FC"
              name="Participants"
              barSize={30}
              radius={[0, 10, 10, 0]}
            />
          )}
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TopChampionshipBarChart;
