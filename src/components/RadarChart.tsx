import React from 'react';
import { Radar, RadarChart as RechartsRadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis } from 'recharts';

const data = [
  { subject: 'Technical', A: 120, B: 110, fullMark: 150 },
  { subject: 'Presentation', A: 98, B: 130, fullMark: 150 },
  { subject: 'Skating Skills', A: 86, B: 130, fullMark: 150 },
  { subject: 'Choreography', A: 99, B: 100, fullMark: 150 },
  { subject: 'Interpretation', A: 85, B: 90, fullMark: 150 },
];

const RadarChart = () => {
  return (
    <div className="p-6 bg-white rounded-xl shadow-lg">
      <h2 className="text-xl font-bold mb-4">Performance Components Analysis</h2>
      <RechartsRadarChart outerRadius={150} width={500} height={400} data={data}>
        <PolarGrid />
        <PolarAngleAxis dataKey="subject" />
        <PolarRadiusAxis angle={30} domain={[0, 150]} />
        <Radar name="Skater A" dataKey="A" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
        <Radar name="Skater B" dataKey="B" stroke="#82ca9d" fill="#82ca9d" fillOpacity={0.6} />
      </RechartsRadarChart>
    </div>
  );
};

export default RadarChart;