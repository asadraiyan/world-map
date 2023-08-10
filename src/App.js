import React from "react";
import "./App.css";
import WorldMap from "./Components/WorldMap";
// import WorldMapCopy from "./Components/WorldMapCopy";

const App = () => {
  return (
    <>
      <WorldMap />
      {/* <WorldMapCopy /> */}
    </>
  );
};

export default App;

// import React, { useState, useEffect } from "react";
// import { MapContainer, TileLayer, GeoJSON, Marker, Popup } from "react-leaflet";
// import L from "leaflet";
// import axios from "axios";
// import * as turf from "@turf/turf";

// import "leaflet/dist/leaflet.css";
// import "./App.css";

// function App() {
//   const [countries, setCountries] = useState([]);
//   const [selectedCountry, setSelectedCountry] = useState(null);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [filteredCountries, setFilteredCountries] = useState(null);

//   useEffect(() => {
//     async function fetchCountries() {
//       try {
//         const response = await axios.get("/countries.json"); // Assumes countries.geojson is in the public folder
//         setCountries(response.data.features);
//         setFilteredCountries(response.data.features);
//       } catch (error) {
//         console.error("Error fetching GeoJSON data:", error);
//       }
//     }

//     fetchCountries();
//   }, []);

//   const handleMarkerClick = (country) => {
//     setSelectedCountry(country.properties);
//   };

//   console.log("filteredCountries =", filteredCountries);
//   console.log("countries =", countries);

//   const handleSearch = (event) => {
//     const term = event.target.value?.toLowerCase();
//     setSearchTerm(term);

//     if (term === "") {
//       setFilteredCountries(countries);
//     } else {
//       const filtered = countries.filter(
//         (country) => country.properties.ADMIN?.toLowerCase() === term
//       );
//       setFilteredCountries(filtered);
//     }
//   };

//   const onEachFeature = (feature, layer) => {
//     layer.options.countryCode = feature.properties.iso_alpha3;
//     layer.on({
//       click: () => handleMarkerClick(feature),
//     });
//   };

//   return (
//     <div className="App">
//       <h1>World Map Application</h1>
//       <div className="search-bar">
//         <input
//           type="text"
//           placeholder="Search by country name"
//           value={searchTerm}
//           onChange={handleSearch}
//         />
//       </div>
//       <MapContainer center={[20, 0]} zoom={2} style={{ height: "80vh" }}>
//         <TileLayer
//           url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//           attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//         />
//         {filteredCountries && (
//           <GeoJSON data={filteredCountries} onEachFeature={onEachFeature} />
//         )}
//       </MapContainer>
//       {selectedCountry && (
//         <div className="country-details">
//           <h2>{selectedCountry.name}</h2>
//           <p>Capital: {selectedCountry.capital}</p>
//           {/* Add more country-specific details */}
//         </div>
//       )}
//     </div>
//   );
// }

// export default App;
