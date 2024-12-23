import React from 'react';
import { ComposedChart, Line, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const data = [
  {
    date: 'Jan',
    high: 90,
    low: 70,
    open: 75,
    close: 85,
    volume: 1200,
  },
  {
    date: 'Feb',
    high: 95,
    low: 65,
    open: 85,
    close: 75,
    volume: 1500,
  },
  // Add more data points...
];

const CandleChart = () => {
  return (
    <div className="p-6 bg-white rounded-xl shadow-lg">
      <h2 className="text-xl font-bold mb-4">Performance Trends</h2>
      <ComposedChart width={600} height={400} data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis yAxisId="left" />
        <YAxis yAxisId="right" orientation="right" />
        <Tooltip />
        <Legend />
        <Bar
          yAxisId="left"
          dataKey="volume"
          fill="#8884d8"
          opacity={0.3}
        />
        <Line
          yAxisId="right"
          type="monotone"
          dataKey="high"
          stroke="#82ca9d"
        />
        <Line
          yAxisId="right"
          type="monotone"
          dataKey="low"
          stroke="#ff7300"
        />
      </ComposedChart>
    </div>
  );
};

export default CandleChart;