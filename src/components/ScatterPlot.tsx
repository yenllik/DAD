import React from 'react';
import { ScatterChart as RechartsScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const data = [
  { technical: 85, component: 82, name: 'Skater 1' },
  { technical: 88, component: 86, name: 'Skater 2' },
  { technical: 92, component: 89, name: 'Skater 3' },
  { technical: 78, component: 90, name: 'Skater 4' },
  { technical: 95, component: 91, name: 'Skater 5' },
];

const ScatterPlot = () => {
  return (
    <div className="p-6 bg-white rounded-xl shadow-lg">
      <h2 className="text-xl font-bold mb-4">Technical vs Component Scores</h2>
      <RechartsScatterChart width={600} height={400}>
        <CartesianGrid />
        <XAxis type="number" dataKey="technical" name="Technical Score" />
        <YAxis type="number" dataKey="component" name="Component Score" />
        <Tooltip cursor={{ strokeDasharray: '3 3' }} />
        <Legend />
        <Scatter name="Scores" data={data} fill="#8884d8" />
      </RechartsScatterChart>
    </div>
  );
};

export default ScatterPlot;