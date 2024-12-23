import React, { useState } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
} from "react-simple-maps";

interface Skater {
  "Skater name": string;
  "Total Score": number;
}

interface Location {
  city: string;
  coordinates: [number, number];
  skaters: Skater[];
}

interface TooltipPosition {
  x: number;
  y: number;
}

const geoUrl =
  "https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/v2/topojson-maps/world-110m.json";

const MapWithTooltip = ({
  competitionData,
}: {
  competitionData: Location[];
}) => {
  const [tooltipData, setTooltipData] = useState<Location | null>(null);
  const [tooltipPosition, setTooltipPosition] =
    useState<TooltipPosition | null>(null);

  const handleMouseEnter = (location: Location, event: React.MouseEvent) => {
    const { pageX, pageY } = event; // Get mouse position
    setTooltipPosition({ x: pageX, y: pageY - 50 });
    setTooltipData(location);
  };

  const handleMouseLeave = () => {
    setTimeout(() => {
      setTooltipData(null);
    }, 200); // Delay tooltip close for smoother behavior
  };

  return (
    <div style={{ width: "100%", height: "400px", position: "relative" }}>
      <ComposableMap
        projection="geoMercator"
        width={800}
        height={400}
        projectionConfig={{ scale: 120, center: [0, 32] }}
        style={{ width: "100%", height: "100%" }}
      >
        {/* Geographies */}
        <Geographies geography={geoUrl}>
          {({ geographies }) =>
            geographies.map((geo) => (
              <Geography
                key={geo.rsmKey}
                geography={geo}
                style={{
                  default: {
                    fill: "#F3F4F6",
                    stroke: "#D1D5DB",
                    strokeWidth: 0.5,
                  },
                  hover: { fill: "#E5E7EB" },
                }}
              />
            ))
          }
        </Geographies>

        {/* Markers */}
        {competitionData.map((location, index) => (
          <Marker
            key={index}
            coordinates={location.coordinates}
            onMouseEnter={(e) => handleMouseEnter(location, e)}
            onMouseLeave={handleMouseLeave}
          >
            <circle
              r={8 + location.skaters.length * 2} // Adjust size based on skater count
              fill="#3B82F6"
              className="cursor-pointer hover:scale-110 transition-transform"
            />
          </Marker>
        ))}
      </ComposableMap>

      {/* Tooltip */}
      {tooltipData && tooltipPosition && (
        <div
          className="absolute z-10 bg-white shadow-lg p-3 rounded-md border text-sm"
          style={{
            left: tooltipPosition.x,
            top: tooltipPosition.y,
            pointerEvents: "auto",
          }}
          onMouseEnter={() => setTooltipData(tooltipData)} // Keep tooltip open
          onMouseLeave={handleMouseLeave} // Close tooltip when mouse leaves
        >
          <h3 className="font-bold">{tooltipData.city}</h3>
          <ul className="mt-2">
            {tooltipData.skaters.map((skater, idx) => (
              <li
                key={idx}
                className="cursor-pointer hover:text-blue-500"
                onClick={() => console.log("Selected Skater:", skater)}
              >
                {skater["Skater name"]} - {skater["Total Score"]}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default MapWithTooltip;
