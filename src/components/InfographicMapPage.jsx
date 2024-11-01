import { useState, useEffect } from 'react';
import '../css/InfographicMapPage.css'; // Custom CSS for diagonal layout and map styling

// Sample backend data for the map (use your actual backend data here)
const mapData = {
  "Murmansk": true,
  "Smolensk": true,
  "Kursk": false,
  "Moscow": true,
  "Abakan": true,
  // Add more regions as needed
};

// Sample infographic data
const infographics = [
  { label: "Selection Price", value: "1000", unit: "RUR" },
  { label: "Selected Volume", value: "500", unit: "MW" },
  { label: "Number of Aggregators", value: "20" },
  { label: "Maximum Volume", value: "700", unit: "MW" },
  { label: "Minimum Volume", value: "200", unit: "MW" },
];

// Diagonal Infographic Component
const DiagonalInfographic = ({ label, value, unit, index }) => (
  <div
    className="infographic-item"
    style={{
      transform: `translate(${index * 40}px, ${index * 40}px)`,
      color: '#007bff',
      fontSize: '1.8em',
      fontWeight: 'bold',
      textAlign: 'center',
    }}
  >
    <div>{value} {unit}</div>
    <p className="text-muted">{label}</p>
  </div>
);

// Map Overlay Component for interactive regions
const MapRegionOverlay = ({ region, filled }) => (
  <div
    className={`map-region ${filled ? 'filled' : 'not-filled'}`}
    style={{
      position: 'absolute',
      color: filled ? '#fff' : '#000',
    }}
  >
    <span>{region}</span>
    {filled && <span className="energy-icon">⚡</span>}
  </div>
);

const Map = () => (
  <div className="map-container position-relative">
    <img src="img/map.webp" alt="Russia Map" className="map-image" />
    {/* Overlay each region dynamically based on data */}
    {Object.keys(mapData).map((region, index) => (
      <MapRegionOverlay
        key={index}
        region={region}
        filled={mapData[region]}
        style={{
          // Set specific coordinates for each region overlay
          top: `${index * 10 + 20}px`, // Example positioning, adjust per your map
          left: `${index * 30 + 20}px`,
        }}
      />
    ))}
  </div>
);

// Main Page Component
const InfographicMapPage = () => (
  <div className="container mt-5">
    <h2 className="text-center mb-5">Energy Statistics and Map</h2>
    <div className="diagonal-infographics">
      {infographics.map((info, index) => (
        <DiagonalInfographic key={index} {...info} index={index} />
      ))}
    </div>
    {/* <h3 className="text-center mt-5 mb-4">Map of Russia by Region</h3>
    <Map /> */}
  </div>
);

export default InfographicMapPage;