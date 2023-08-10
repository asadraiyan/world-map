import React, { useState } from "react";
import { MapContainer, GeoJSON } from "react-leaflet";
import mapData from "../data/countries.json";
import axios from "axios";
import { BsSearch } from "react-icons/bs";

const WorldMap = () => {
  console.log("mapData", mapData);

  const [selectedCountry, setSelectedCountry] = useState(null);
  const [search, setSearch] = useState([]);

  const handleClick = async (event) => {
    console.log("event.target =", event.target);
    const countryCode = event.target.feature?.properties?.ISO_A3;
    // const countryCode = event.target.options.countryCode;
    try {
      const response = await axios.get(
        `https://restcountries.com/v3/alpha/${countryCode}`
      );
      console.log(response.data[0]);
      setSelectedCountry(response.data[0]);
      // setSearch(response.data[0]);
    } catch (error) {
      console.error(error);
    }
    event.target.setStyle({
      color: "yellow",
      fillColor: "red",
    });
  };

  const onEachCountry = (country, layer) => {
    console.log("country =", country);
    const countryName = country.properties.ADMIN;
    layer.bindPopup(countryName);

    layer.on({
      click: handleClick,
    });
  };

  const getCurrency = () => {
    const currencyData = selectedCountry.currencies;
    const currencyList = Object.keys(currencyData);
    const currencyKey = currencyList[0];
    const currencyName = currencyData[currencyKey].name;
    const currencySymbol = currencyData[currencyKey].symbol;
    return {
      name: currencyName,
      symbol: currencySymbol,
    };
  };
  const getLanguage = () => {
    const languagesData = selectedCountry.languages;
    const languageList = Object.keys(languagesData);
    const languageKey1 = languageList[0];
    const languageKey2 = languageList[1];
    const languageKey3 = languageList[2];
    const languageName1 = languagesData[languageKey1];
    const languageName2 = languagesData[languageKey2];
    const languageName3 = languagesData[languageKey3];
    return [languageName1, languageName2, languageName3];
  };

  const handleSearch = (event) => {
    setSearch(event.target.value);
    // console.log("type");
  };

  return (
    <>
      <div className="main-container">
        <div className="input-box">
          <input
            type="text"
            placeholder="Search"
            className="search-box"
            value={search}
            onChange={handleSearch}
          />
          <BsSearch className="bs-search" />
        </div>
        <div className="container">
          <div className="map-container">
            <MapContainer
              center={[26.871653972198477, 80.88534341754298]}
              zoom={2}
              style={{ height: "80vh", width: "100%" }}
            >
              <GeoJSON data={mapData.features} onEachFeature={onEachCountry} />
            </MapContainer>
          </div>
          {selectedCountry && (
            <div className="countries">
              <div className="country-flag">
                <h2>{selectedCountry.name.common}</h2>
                <img
                  src={selectedCountry.flags[1]}
                  className="flag-img"
                  alt="flag"
                />
              </div>
              <div className="country-data">
                <p className="country-font">
                  Capital: <span>{selectedCountry.capital}</span>
                </p>
                <p className="country-font">
                  Currency:{" "}
                  <span>
                    {" "}
                    {getCurrency()?.symbol}, {getCurrency()?.name}
                  </span>
                </p>
                <p className="country-font">
                  Population: <span>{selectedCountry.population}</span>
                </p>
                <p className="country-font">
                  Latlang: <span>{selectedCountry.latlng}</span>
                </p>
                <p className="country-font">
                  Laanguages: <span className="language">{getLanguage()}</span>
                </p>
                <p className="country-font">
                  Area: <span>{selectedCountry.area}</span>
                </p>
                <p className="country-font">
                  TimeZone: <span>{selectedCountry.timezones}</span>
                </p>
                <p className="country-font">
                  Region: <span>{selectedCountry.region}</span>{" "}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default WorldMap;
