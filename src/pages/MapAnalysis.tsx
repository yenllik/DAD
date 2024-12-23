import React, { useState, useMemo } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
  ZoomableGroup,
} from "react-simple-maps";
import chroma from "chroma-js";
import {
  Radar,
  RadarChart as RechartsRadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
} from "recharts";
import { SkaterData } from "../utils/csvUtils"; // Use your SkaterData type

// import { calculateAverageTotalScore } from "../utils/csvUtils";
import {
  getCompetitionsByCity,
  getTopPerformerByCityAndYear,
} from "../utils/csvUtils";

// Radar chart fields
const radarFields = [
  { key: "Total Score", label: "Total" },
  { key: "Short Program Score", label: "Short Program" },
  { key: "Free Skate Score", label: "Free Skate" },
  { key: "Program Components Score", label: "Program Components" },
  { key: "Technical Elements Score", label: "Technical Elements" },
];

const geoUrl =
  "https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/v2/topojson-maps/world-110m.json";
const MapAnalysis = () => {
  const [selectedCity, setSelectedCity] = useState<string | null>(null);
  const [selectedYear, setSelectedYear] = useState<number | null>(null);
  const [selectedSkater, setSelectedSkater] = useState<SkaterData | null>(null);
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
  const [zoomLevel, setZoomLevel] = useState(1);
  //   const [hovered, setHovered] = useState(false);
  const [selectedMarker, setSelectedMarker] = useState<{
    city: string;
    coordinates: [number, number];
  } | null>(null);
  const competitionData = useMemo(() => getCompetitionsByCity(), []);

  const maxCompetitions = Math.max(
    ...Object.values(competitionData).map((c) => c.length)
  );

  // Color scale: Light blue to dark blue
  const colorScale = chroma
    .scale(["#1E3A8A", "#7B1FA2", "#E57373", "#FFD54F"])
    .domain([0, maxCompetitions]);

  const radarData = useMemo(() => {
    if (!selectedCity || !selectedYear) return [];
    const topPerformer = getTopPerformerByCityAndYear(
      selectedCity,
      selectedYear
    );
    console.log(topPerformer);
    setSelectedSkater(topPerformer);

    return topPerformer
      ? radarFields.map((field) => ({
          subject: field.label,
          value: topPerformer[field.key as keyof typeof topPerformer],
          fullMark: 300,
        }))
      : [];
  }, [selectedCity, selectedYear]);

  return (
    <div className="flex flex-col md:flex-row gap-8 p-6 bg-gray-100 rounded-xl">
      {/* Map Section */}
      <div className="bg-white rounded-xl shadow-lg p-4 w-full md:w-2/3 relative">
        <h2 className="text-xl font-bold mb-4">
          Top 20 cities hosting Championships
        </h2>
        {selectedMarker && selectedCity && (
          <div
            className="absolute z-50 right-4 top-4 bg-white p-3 rounded-lg shadow-lg border min-w-48 w-fit"
            // style={{
            //   left: `calc(${selectedMarker.coordinates[0] + 180} * 2.22px)`,
            //   top: `calc(${90 - selectedMarker.coordinates[1]} * 4px)`,
            //   transform: "translate(-50%, -100%)",
            // }}
            onMouseLeave={() => setSelectedMarker(null)}
          >
            <h3 className="font-bold text-sm pb-2">
              {selectedMarker.city}, {selectedCountry}
            </h3>
            <ul>
              {competitionData[selectedCity].map((comp, idx) => (
                <li
                  key={idx}
                  className="cursor-pointer hover:text-blue-600 text-xs pb-1 whitespace-nowrap"
                  onClick={() => setSelectedYear(comp.year)}
                >
                  <span className="font-semibold">{comp.year}</span>
                  <span className=""> - {comp.competitionName.slice(4)}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
        <div style={{ width: "100%", height: "400px", position: "relative" }}>
          <ComposableMap
            projection="geoMercator"
            width={800}
            height={400}
            projectionConfig={{
              scale: 120,
              center: [0, 32],
            }}
            style={{ width: "100%", height: "100%" }}
            onClick={() => {
              if (selectedMarker) setSelectedMarker(null);
            }}
          >
            {/* track zoom level */}
            <ZoomableGroup onMoveEnd={({ zoom }) => setZoomLevel(zoom)}>
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
                          outline: "none",
                        },
                        hover: { fill: "#E5E7EB", outline: "none" },
                        pressed: { fill: "#E5E7EB", outline: "none" },
                      }}
                    />
                  ))
                }
              </Geographies>
              {/* Markers */}
              {Object.entries(competitionData).map(([city, comps], index) => (
                <Marker key={index} coordinates={comps[0].coordinates}>
                  <circle
                    r={5 - zoomLevel * 0.2 + (comps.length * 0.5) / zoomLevel}
                    fill={colorScale(comps.length).hex()}
                    className="cursor-pointer hover:scale-110 transition-transform"
                    onClick={() => {
                      setSelectedCity(city);
                      setSelectedYear(null);
                      setSelectedCountry(comps[0].country);
                      if (selectedMarker?.city === city) {
                        setSelectedMarker(null);
                      } else {
                        setSelectedMarker({
                          city: city,
                          coordinates: comps[0].coordinates,
                        });
                      }
                    }}
                    //   onMouseEnter={() => {
                    //     setHovered(true);
                    //     setSelectedMarker({
                    //       city,
                    //       coordinates: comps[0].coordinates,
                    //     });
                    //   }}
                    //   onMouseLeave={() => {
                    //     if (hovered) {
                    //       setSelectedMarker(null);
                    //       setHovered(false);
                    //     }
                    //   }}
                  />
                </Marker>
              ))}
            </ZoomableGroup>
          </ComposableMap>
        </div>
        <div className="mt-8">
          <div className="flex items-center justify-center w-full">
            <div className="relative w-2/3 h-6 rounded">
              <div
                style={{
                  background:
                    "linear-gradient(to right, #1E3A8A, #7B1FA2, #E57373, #FFD54F)", // Gradient colors
                  height: "100%",
                  borderRadius: "8px",
                }}
              ></div>

              {/* Tick Labels */}
              <div className="absolute top-6 flex justify-between w-full text-xs text-gray-700">
                {Array.from({ length: 7 }, (_, index) => (
                  <span key={index}>
                    {Math.round((maxCompetitions / 6) * index)}{" "}
                    {/* Dynamically spread ticks */}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Radar Chart Section */}
      <div className="bg-white rounded-xl shadow-lg p-4 w-full md:w-1/3 md:max-w-1/3">
        {selectedSkater && selectedCity && radarData.length > 0 ? (
          <div className="">
            <div className="">
              <div className="">
                {/* <h3 className="text-lg font-bold mb-2">Top Performer</h3> */}
                <p className="text-sm text-gray-500 mb-4">
                  {selectedCity}, {selectedCountry}
                </p>
                <p>
                  {selectedYear}{" "}
                  {competitionData[selectedCity][0].competitionName.slice(4)}
                </p>
              </div>
              <div className="border-b w-full"></div>
              <div className="">
                <p>Top Performer</p>
                <h2 className="text-sm font-bold mb-4">
                  {selectedSkater["Skater Name"]}
                </h2>
                <h3>
                  {selectedSkater["Age at Competition"]}{" "}
                  {selectedSkater.Country}
                </h3>
              </div>
            </div>

            <div className="w-full flex items-center justify-center overflow-visible">
              <ResponsiveContainer width="90%" height={300}>
                <RechartsRadarChart
                  cx="50%"
                  cy="50%"
                  outerRadius="80%"
                  data={radarData}
                  margin={{ top: 20, right: 40, bottom: 20, left: 40 }}
                >
                  <PolarGrid />
                  <PolarAngleAxis
                    dataKey="subject"
                    tick={{
                      fontSize: "8px",
                      fill: "#333",
                      fontWeight: "bold",
                      textAnchor: "middle",
                    }}
                    orientation="outer"
                  />
                  <PolarRadiusAxis
                    angle={18}
                    domain={[0, 300]}
                    tick={{ fontSize: "12px" }}
                  />
                  <Radar
                    name={selectedSkater["Skater Name"]}
                    dataKey="value"
                    stroke="#8884d8"
                    fill="#8884d8"
                    fillOpacity={0.6}
                  />
                </RechartsRadarChart>
              </ResponsiveContainer>
            </div>
          </div>
        ) : (
          <p className="text-gray-500 text-center">No skater selected.</p>
        )}
      </div>
    </div>
  );
};

export default MapAnalysis;
