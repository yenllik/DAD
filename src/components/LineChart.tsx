import React from 'react';
import { LineChart as RechartsLineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const data = [
  { year: '2018', score: 220 },
  { year: '2019', score: 232 },
  { year: '2020', score: 245 },
  { year: '2021', score: 256 },
  { year: '2022', score: 267 },
  { year: '2023', score: 275 },
];

const LineChart = () => {
  return (
    <div className="p-6 bg-white rounded-xl shadow-lg">
      <h2 className="text-xl font-bold mb-4">Score Progression Over Time</h2>
      <RechartsLineChart width={600} height={400} data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="year" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="score" stroke="#8884d8" activeDot={{ r: 8 }} />
      </RechartsLineChart>
    </div>
  );
};

export default LineChart;