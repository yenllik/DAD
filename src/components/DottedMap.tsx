import React, { useState, useEffect, useRef } from "react";
import DottedMap, { DottedMapLib } from "dotted-map";
import { skatingLocations } from "./WorldMap/data";

const InteractiveDottedMap = () => {
  const [clickedCoordinates, setClickedCoordinates] = useState<{
    lat: number;
    lng: number;
    data: string;
    x: number;
    y: number;
  } | null>(null);
  const [svgMap, setSvgMap] = useState<string>("");

  const pointsRef = useRef<DottedMapLib.Point[]>([]);

  useEffect(() => {
    const map = new DottedMap({ height: 60, grid: "vertical" });

    // // Add pins dynamically
    // for (let i = 0; i < 20; i++) {
    //   map.addPin({
    //     lat: Math.random() * 180 - 90, // Random latitude
    //     lng: Math.random() * 360 - 180, // Random longitude
    //     svgOptions: { color: "#FA3667", radius: 0.5 },
    //   });
    // }
    skatingLocations.forEach((location) => {
      map.addPin({
        lat: location.coordinates[1],
        lng: location.coordinates[0],
        data: location.name,
        svgOptions: { color: "#FA3667", radius: 0.5 },
      });
    });

    // Store generated points
    pointsRef.current = map.getPoints();

    // Generate the SVG map
    const rawSvg = map.getSVG({
      radius: 0.35,
      color: "#D1D5DA",
      shape: "circle",
      backgroundColor: "#15103E",
    });

    setSvgMap(rawSvg);
  }, []);

  const handleDotClick = (event: React.MouseEvent) => {
    const target = event.target as SVGCircleElement;
    const cx = parseFloat(target.getAttribute("cx") || "0");
    const cy = parseFloat(target.getAttribute("cy") || "0");
    const svgRect = (
      event.currentTarget as HTMLElement
    ).getBoundingClientRect();
    console.log("SVG Rect:", svgRect, cx, cy);

    // Convert SVG coordinate to absolute screen position
    const clickX = svgRect.left + (svgRect.width * cx) / 140;
    const clickY = svgRect.top + svgRect.height * (cy / 60);

    if (pointsRef.current.length === 0) {
      console.warn("No points available to calculate distance.");
      return;
    }

    // Find the closest point using distance calculation
    const closestPoint = pointsRef.current.reduce((prev, curr) => {
      const prevDistance = Math.hypot(prev.x - cx, prev.y - cy);
      const currDistance = Math.hypot(curr.x - cx, curr.y - cy);
      return currDistance < prevDistance ? curr : prev;
    });

    // if (clickedCoordinates && clickedCoordinates.data) {
    setClickedCoordinates({
      lat: cx,
      lng: cy,
      data: closestPoint.data,
      x: clickX,
      y: clickY,
    });
    // } else {
    //   setClickedCoordinates(null);
    // }
    console.log("Clicked Coordinates:", closestPoint.lat, closestPoint.lng);
  };

  return (
    <div className="relative p-6">
      {/* Render the Map */}
      <div
        onClick={handleDotClick}
        dangerouslySetInnerHTML={{ __html: svgMap }}
        className="cursor-pointer"
      />

      {/* Display the Clicked Coordinates */}
      {clickedCoordinates && clickedCoordinates.data && (
        <div
          className="absolute w-56 h-32  bg-white p-4 shadow-lg rounded-lg z-10"
          style={{
            left: clickedCoordinates.x,
            top: clickedCoordinates.y - 128, // Adjust to position it above the dot
            transform: "translate(-50%, -100%)",
          }}
        >
          <h3 className="font-bold text-lg">Clicked Coordinates</h3>
          <p className="text-sm text-gray-600">Lat: {clickedCoordinates.lat}</p>
          <p className="text-sm text-gray-600">Lng: {clickedCoordinates.lng}</p>
          <p className="text-sm text-gray-600">
            Data: {clickedCoordinates.data}
          </p>
        </div>
      )}
    </div>
  );
};

export default InteractiveDottedMap;
