// import React from "react";
// import BarChart from "./components/BarChart";
// import HeatMap from "./components/HeatMap";
// import CandleChart from "./components/CandleChart";
// import WorldMap from "./components/WorldMap";
// import RadarChart from "./components/RadarChart";
// import LineChart from "./components/LineChart";
// import ScatterPlot from "./components/ScatterPlot";

import { useEffect, useState } from "react";
import Header from "./pages/Header";
import { fetchAndParseCSV } from "./utils/csvUtils";
import MapAnalysis from "./pages/MapAnalysis";
import TopCountryBarChart from "./pages/TopCountryBarChart";
import TopChampionshipBarChart from "./pages/TopChampionshipBarChart";
import GenderFrequencyTrend from "./pages/GenderFrequencyTrend";
import AgeBoxPlot from "./pages/AgeBoxPlot";
import Heatmap from "./pages/Heatmap";
import EdaScatterChart from "./pages/EdaScatterChart";
import TechnicalProgram from "./pages/TechnicalProgram";
import ShortFree from "./pages/ShortFree";

// import Map from "./components/DottedMap";

function App() {
  const [dataReady, setDataReady] = useState(false);
  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchAndParseCSV("/data.csv"); // Fetch and parse CSV
        console.log("Data loaded:", data);
        if (data.length > 0) {
          setDataReady(true);
        }
      } catch (error) {
        console.error("Error loading CSV data:", error);
      }
    };

    loadData();
  }, []);
  return (
    <div
      className="min-h-screen p-20"
      style={{
        backgroundImage: "url('/assets/bg-main.png')",
        backgroundSize: "100% auto",
        backgroundRepeat: "repeat-y",
        backgroundPosition: "top center",
      }}
    >
      {dataReady ? (
        <main className="w-full px-10 py-12 bg-white bg-opacity-50 rounded-3xl shadow-lg flex flex-col gap-6 items-center">
          <div id="header" className="w-full">
            <Header />
          </div>
          <div id="map-analysis" className="w-full">
            <MapAnalysis />
          </div>
          <div className=""></div>
          <div id="overall" className="w-full bg-[#8459FF] rounded-full">
            <div className="w-1/2 flex items-center justify-center py-3 rounded-full bg-[#BAA1FF] font-bold text-white text-xs">
              Overall trends
            </div>
          </div>
          <div id="overall analysis" className="w-full grid grid-cols-2 gap-6">
            <div className="col-span-1 flex flex-col gap-6 ">
              <TopCountryBarChart />
              {/* Gender frequency and Total trendy by year */}
              <GenderFrequencyTrend />
            </div>
            <div className="col-span-1 flex flex-col gap-6">
              <TopChampionshipBarChart />
              <div className="h-full bg-white shadow-lg rounded-2xl px-4 pt-8 grid grid-cols-4 text-xs">
                <div className="col-span-1 h-full grid grid-cols-1 font-semibold ">
                  <div className="flex-1">Dominant countries</div>
                  <div className="flex-1">Gender dynamics</div>
                  <div className="flex-1">Impact of COVID-19</div>
                  <div className="">Long-term trends</div>
                </div>
                <div className="col-span-3 h-full grid grid-cols-1 font-light">
                  <div className="flex-1">
                    Russia leads global figure skating participation, with
                    Japan, USA, Canada, and China also showing strong
                    representation across genders.
                  </div>
                  <div className="flex-1">
                    Male skaters dominate overall, especially in Japan and the
                    USA, while female skaters thrive in countries like the USA,
                    Canada, and South Korea.
                  </div>
                  <div className="flex-1">
                    Participation dropped sharply in 2020-2021, with male
                    skaters hit harder. By 2022, recovery began, with female
                    participation rebounding faster.
                  </div>
                  <div className="">
                    Despite fluctuations, male skaters consistently outnumber
                    females, reflecting persistent regional differences in
                    opportunities and focus.
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            id="success"
            className="w-full bg-[#8459FF] rounded-full flex items-end justify-end"
          >
            <div className="w-1/2 flex items-center justify-center py-3 rounded-full bg-[#BAA1FF] font-bold text-white text-xs">
              What is behind success?
            </div>
          </div>
          <div id="success analysis" className="flex flex-col gap-6 w-full">
            <div className="flex flex-col gap-3 w-full">
              <div className="flex w-full items-start justify-start">
                <div className=" bg-[#8459FF] px-5 py-2 rounded-full text-white">
                  Age
                </div>
              </div>
              <div className="flex flex-col gap-3 w-full">
                <div className="flex w-full items-start justify-start gap-6">
                  <div className="h-full w-full bg-white shadow-lg rounded-2xl p-4 max-h-[500px]">
                    {/* Box plot - Age at competition vs rank */}
                    <AgeBoxPlot />
                  </div>
                  <div className="h-full w-full bg-white shadow-lg rounded-2xl p-4 max-h-[500px]">
                    {/* Heatmap nationality and age of competition impact on rank*/}
                    <Heatmap />
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-3 w-full">
              <div className="flex w-full gap-3">
                <div className="flex-1">
                  <div className="w-fit bg-[#8459FF] px-5 py-2 rounded-full text-white">
                    Starting order
                  </div>
                </div>
                <div className="flex-1">
                  <div className="w-fit bg-[#8459FF] px-5 py-2 rounded-full text-white">
                    Technical skills VS Artistry
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-3 w-full">
                <div className="flex w-full items-start justify-start gap-6">
                  <div className="h-full w-full bg-white shadow-lg rounded-2xl p-4 max-h-[500px]">
                    <EdaScatterChart />
                  </div>
                  <div className="h-full w-full bg-white shadow-lg rounded-2xl p-4 max-h-[500px]">
                    <TechnicalProgram />
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-3 w-full">
              <div className="flex w-full items-start justify-start">
                <div className=" bg-[#8459FF] px-5 py-2 rounded-full text-white">
                  Program type
                </div>
              </div>
              <div className="flex flex-col gap-3 w-full">
                <div className="flex w-full items-start justify-start gap-6">
                  <div className="h-full w-full bg-white shadow-lg rounded-2xl p-4 max-h-[500px]">
                    <ShortFree />
                  </div>
                  <div className="h-full w-full p-4 max-h-[500px] flex flex-col gap-6">
                    <div className="flex w-full gap-6">
                      <div className="flex-1 bg-white shadow-lg rounded-2xl py-6 px-4">
                        <span className="text-xs">
                          Technical Elements and Free Skate Scores
                        </span>
                        <h3 className="font-bold text-xl">Correlation</h3>
                        <div className="flex items-center justify-between ">
                          <div className="h-full font-bold text-3xl">0.96</div>
                          <img
                            src="/icons/upward-circle.svg"
                            alt="logo"
                            className="w-36 h-36 "
                          />
                        </div>
                      </div>
                      <div className="flex-1 bg-white shadow-lg rounded-2xl pt-6 px-4">
                        <span className="text-xs">
                          Short Program and Technical Elements Scores
                        </span>
                        <h3 className="font-bold text-xl">Correlation</h3>
                        <div className="flex items-center justify-between ">
                          <div className="h-full font-bold text-3xl">0.94</div>
                          <img
                            src="/icons/upward-circle.svg"
                            alt="logo"
                            className="w-36 h-36 "
                          />
                        </div>
                      </div>
                    </div>
                    <div className="bg-white shadow-lg rounded-2xl p-4">
                      The strong correlations highlight that technical
                      performance is a key driver of overall scores in figure
                      skating
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-row gap-0 w-full bg-white shadow-lg rounded-2xl overflow-hidden">
                <div className="flex-1 bg-white shadow-lg rounded-r-2xl p-4 pl-8 z-30 -mr-4">
                  <h2 className="font-semibold">The Peak Age</h2>
                  <p className="font-light">
                    Skaters aged 21 to 23 consistently achieve higher ranks,
                    marking this as a prime performance period. Younger skaters
                    (15-20) show variability, driven by technical daring, while
                    older competitors (25+) rely on experience but face
                    challenges maintaining top ranks.
                  </p>
                </div>
                <div className="flex-1 bg-white shadow-lg rounded-r-2xl p-4 pl-12 z-20 -mr-4">
                  <h2 className="font-semibold">National Edge</h2>
                  <p className="font-light">
                    Russia and Japan dominate across ages, while countries like
                    South Korea and Italy show rising but age-concentrated
                    talent. USA and Canada display balanced participation but
                    fewer skaters reach the top.
                  </p>
                </div>
                <div className="flex-1 bg-white shadow-2xl rounded-r-2xl p-4 pl-12 z-10">
                  <h2 className="font-semibold">Artistry vs. Technique</h2>
                  <p className="font-light">
                    A strong technical performance often aligns with high
                    artistry scores. Male skaters dominate the upper ranges of
                    technical scores (140+), while female skaters excel in
                    achieving artistic balance within mid-range scores
                    (100-120).
                  </p>
                </div>
              </div>
            </div>
          </div>
        </main>
      ) : (
        <p>Loading data...</p>
      )}
    </div>
  );
}

export default App;
