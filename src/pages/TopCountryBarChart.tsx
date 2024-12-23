import React, { useMemo, useState } from "react";
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
import {
  countryAbbreviations,
  getTopCountriesByParticipants,
} from "../utils/csvUtils";

const TopCountryBarChart = () => {
  const [showGender, setShowGender] = useState(false);

  const chartData = useMemo(() => getTopCountriesByParticipants(), []);

  return (
    <div className="p-4 bg-white shadow-lg rounded-2xl">
      <div className="px-4 pb-5 flex justify-between items-center">
        <div className="flex flex-col">
          <span className="text-lg text-[#9291A5]">
            Participation rate by country
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
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={chartData}>
          <XAxis
            dataKey="country"
            tickFormatter={(v) => countryAbbreviations[v]}
            tickLine={false}
            tick={{ dy: 10 }}
          />
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <YAxis axisLine={false} tickLine={false} tick={{ dx: -10 }} />
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
                radius={[10, 10, 0, 0]}
              />
            </>
          ) : (
            <Bar
              dataKey="participants"
              fill="#F0E5FC"
              name="Participants"
              barSize={30}
              radius={[10, 10, 0, 0]}
            />
          )}
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TopCountryBarChart;
