import React, { useState } from 'react';
import { BarChart as RechartsBarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { Settings } from 'lucide-react';

const data = [
  { name: 'USA', gold: 12, silver: 8, bronze: 6 },
  { name: 'Russia', gold: 15, silver: 10, bronze: 8 },
  { name: 'Japan', gold: 8, silver: 12, bronze: 9 },
  { name: 'Canada', gold: 10, silver: 7, bronze: 5 },
  { name: 'France', gold: 6, silver: 9, bronze: 7 },
];

const BarChart = () => {
  const [barSize, setBarSize] = useState(20);
  const [colors, setColors] = useState({
    gold: '#FFD700',
    silver: '#C0C0C0',
    bronze: '#CD7F32',
  });

  return (
    <div className="p-6 bg-white rounded-xl shadow-lg">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Olympic Medals by Country</h2>
        <button
          onClick={() => setBarSize(prev => Math.min(prev + 5, 40))}
          className="p-2 rounded-full hover:bg-gray-100"
        >
          <Settings className="w-5 h-5" />
        </button>
      </div>
      <RechartsBarChart width={600} height={400} data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="gold" fill={colors.gold} barSize={barSize} />
        <Bar dataKey="silver" fill={colors.silver} barSize={barSize} />
        <Bar dataKey="bronze" fill={colors.bronze} barSize={barSize} />
      </RechartsBarChart>
    </div>
  );
};

export default BarChart;