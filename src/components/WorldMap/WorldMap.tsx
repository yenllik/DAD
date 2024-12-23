import React, { useState } from "react";
import { Feature } from "geojson";

import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
} from "react-simple-maps";
import { Settings } from "lucide-react";
import type { Location, WorldMapProps } from "./types";
import { skatingLocations } from "./data";

const geoUrl =
  "https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/v2/topojson-maps/world-110m.json";

const WorldMap: React.FC<WorldMapProps> = ({
  data = skatingLocations,
  dotSize: initialDotSize = 4,
  dotColor = "#3B82F6",
}) => {
  const [dotSize, setDotSize] = useState<number>(initialDotSize);
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(
    null
  );

  return (
    <div className="p-6 bg-white rounded-xl shadow-lg relative">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">
          Global Figure Skating Achievements
        </h2>
        <button
          onClick={() => setDotSize((prev) => Math.min(prev + 1, 8))}
          className="p-2 rounded-full hover:bg-gray-100"
        >
          <Settings className="w-5 h-5" />
        </button>
      </div>

      {/* World Map */}
      <ComposableMap projection="geoMercator" width={800} height={400}>
        <Geographies geography={geoUrl}>
          {({ geographies }: { geographies: Feature[] }) =>
            geographies.map((geo: Feature) => (
              <Geography
                key={geo.id || geo.properties?.name}
                geography={geo}
                style={{
                  default: {
                    fill: "#F3F4F6",
                    stroke: "#D1D5DB",
                    strokeWidth: 0.5,
                  },
                  hover: { fill: "#E5E7EB" },
                  pressed: { fill: "#E5E7EB" },
                }}
              />
            ))
          }
        </Geographies>

        {/* Add Dots for Locations */}
        {data.map((location: Location) => (
          <Marker
            key={location.id}
            coordinates={location.coordinates}
            onMouseEnter={() => setSelectedLocation(location)}
            onMouseLeave={() => setSelectedLocation(null)}
          >
            <circle
              r={dotSize}
              fill={dotColor}
              className="cursor-pointer transition-transform duration-200 hover:scale-110"
            />
          </Marker>
        ))}
      </ComposableMap>

      {/* Tooltip */}
      {selectedLocation && (
        <div
          className="absolute z-10 bg-white p-3 rounded-lg shadow-lg text-sm pointer-events-none"
          style={{
            left: "50%",
            top: "10px",
            transform: "translateX(-50%)",
          }}
        >
          <h3 className="font-bold">{selectedLocation.name}</h3>
          <p className="text-gray-600">Medals: {selectedLocation.medals}</p>
          {selectedLocation.details && (
            <p className="text-gray-500 text-xs mt-1">
              {selectedLocation.details}
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default WorldMap;
