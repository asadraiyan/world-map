import React, { useState } from "react";
import { MapContainer, GeoJSON } from "react-leaflet";
import mapData from "../data/countries.json";
import axios from "axios";

const WorldMap = () => {
  console.log("mapData", mapData);

  const [selectedCountry, setSelectedCountry] = useState(null);

  const onEachCountry = (country, layer) => {
    console.log("country =", country);
    const countryName = country.properties.ADMIN;
    layer.bindPopup(countryName);

    layer.on({
      click: async (event) => {
        console.log("event.target =", event.target);
        const countryCode = event.target.feature.properties?.ISO_A3;
        // const countryCode = event.target.options.countryCode;
        try {
          const response = await axios.get(
            `https://restcountries.com/v3/alpha/${countryCode}`
          );
          console.log(response.data[0]);
          setSelectedCountry(response.data[0]);
        } catch (error) {
          console.error(error);
        }
      },
    });
  };

  return (
    <>
      <MapContainer
        center={[26.871653972198477, 80.88534341754298]}
        zoom={2}
        style={{ height: "80vh", width: "100vw" }}
      >
        <GeoJSON data={mapData.features} onEachFeature={onEachCountry} />
      </MapContainer>
      {selectedCountry && (
        <div>
          <h2>{selectedCountry.name.common}</h2>
          <p>Capital: {selectedCountry.capital}</p>
          <p>
            Currency: {selectedCountry.currencies.INR?.symbol},{" "}
            {selectedCountry.currencies.INR.name}
          </p>
          <p>Population: {selectedCountry.population}</p>
          <p>Latlang: {selectedCountry.latlng}</p>
          <p>
            Laanguages: {selectedCountry.languages.eng},{" "}
            {selectedCountry.languages.hin}, {selectedCountry.languages.tam}
          </p>
          <p>Area: {selectedCountry.area}</p>
          <p>TimeZone: {selectedCountry.timezones}</p>
          <p>Region: {selectedCountry.region}</p>
          <img src={selectedCountry.flags[1]} alt="flag" />
        </div>
      )}
    </>
  );
};

export default WorldMap;
