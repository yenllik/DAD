import React, { useState } from 'react';
import { Card } from '@tremor/react';
import { Settings } from 'lucide-react';
import type { TrainingData, HeatMapProps } from './types';
import { generateTrainingData } from './data';

const defaultColorScale = [
  'bg-blue-50',
  'bg-blue-100',
  'bg-blue-200',
  'bg-blue-300',
  'bg-blue-400',
  'bg-blue-500',
  'bg-blue-600',
  'bg-blue-700',
  'bg-blue-800',
];

export const HeatMap: React.FC<HeatMapProps> = ({
  data = generateTrainingData(),
  colorScale = defaultColorScale,
}) => {
  const [cellSize, setCellSize] = useState(40);
  const [showIntensity, setShowIntensity] = useState(true);

  const getColor = (value: number) => {
    const index = Math.floor((value / 100) * (colorScale.length - 1));
    return colorScale[index];
  };

  const formatMonth = (month: number) => {
    return new Date(2024, month - 1).toLocaleString('default', { month: 'short' });
  };

  return (
    <Card className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">Training Intensity Throughout the Year</h2>
        <div className="flex gap-2">
          <button
            onClick={() => setShowIntensity(!showIntensity)}
            className="px-3 py-1 text-sm bg-gray-100 rounded-md hover:bg-gray-200"
          >
            {showIntensity ? 'Hide' : 'Show'} Values
          </button>
          <button
            onClick={() => setCellSize(prev => Math.min(prev + 5, 50))}
            className="p-2 rounded-full hover:bg-gray-100"
          >
            <Settings className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <div className="grid grid-cols-12 gap-1">
          {Array.from({ length: 12 }).map((_, monthIndex) => (
            <div key={monthIndex} className="text-center text-sm font-medium text-gray-600">
              {formatMonth(monthIndex + 1)}
            </div>
          ))}
          
          {data.map((item, idx) => (
            <div
              key={idx}
              style={{ 
                width: `${cellSize}px`,
                height: `${cellSize}px`,
              }}
              className={`
                ${getColor(item.value)}
                rounded transition-all duration-200
                hover:opacity-75 cursor-pointer
                flex items-center justify-center
              `}
              title={`${formatMonth(item.month)} ${item.day}: ${item.value}%`}
            >
              {showIntensity && (
                <span className="text-xs font-medium text-gray-700">
                  {item.value}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
};

export default HeatMap;