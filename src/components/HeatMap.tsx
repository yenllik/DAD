import React from "react";
import { Card, Title, Grid, Text } from "@tremor/react";

// Generate mock data: 12 months x 7 days
const data = Array.from({ length: 12 }, (_, month) =>
  Array.from({ length: 7 }, (_, day) => ({
    value: Math.floor(Math.random() * 100),
    month: month + 1,
    day: day + 1,
  }))
).flat();

const HeatMap = () => {
  // Dynamically assign color based on value
  const getColor = (value: number) => {
    if (value < 20) return "bg-blue-100";
    if (value < 40) return "bg-blue-300";
    if (value < 60) return "bg-blue-500";
    if (value < 80) return "bg-blue-700";
    return "bg-blue-900";
  };

  return (
    <Card className="p-6">
      <Title>Training Intensity Heatmap</Title>
      <Text className="mb-4">
        Each square represents daily intensity levels.
      </Text>

      {/* Heatmap Container */}
      <div className="overflow-auto">
        <Grid numItems={12} className="gap-2">
          {data.map((item, idx) => (
            <div
              key={idx}
              className={`aspect-square rounded ${getColor(
                item.value
              )} hover:opacity-80 cursor-pointer`}
              title={`Month: ${item.month}, Day: ${item.day}, Value: ${item.value}`}
            />
          ))}
        </Grid>
      </div>

      {/* Heatmap Legend */}
      <div className="flex justify-center items-center gap-4 mt-6">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-blue-100 rounded"></div> <Text>0-20</Text>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-blue-300 rounded"></div> <Text>21-40</Text>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-blue-500 rounded"></div> <Text>41-60</Text>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-blue-700 rounded"></div> <Text>61-80</Text>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-blue-900 rounded"></div>{" "}
          <Text>81-100</Text>
        </div>
      </div>
    </Card>
  );
};

export default HeatMap;
