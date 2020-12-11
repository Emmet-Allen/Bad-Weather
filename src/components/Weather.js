import React, { useState } from "react";
import "../App.scss";

const api = {
  key: process.env.REACT_APP_WEATHER_API_KEY,
  base: "http://api.openweathermap.org/data/2.5/",
};

const Weather = () => {
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState({});

  const search = (evt) => {
    if (evt.key === "Enter") {
      fetch(`${api.base}weather?q=${query}&units=imperial&APPID=${api.key}`)
        .then((res) => res.json())
        .then((result) => {
          setWeather(result);
          setQuery("");
          console.log(result);
        });
    }
  };

  return (
    <>
      <div className="search-box">
        <input
          type="text"
          className="search-bar"
          placeholder="Search..."
          onChange={(e) => setQuery(e.target.value)}
          value={query}
          onKeyPress={search}
        />
      </div>
      {typeof weather.main != "undefined" ? (
        <div>
          <div className="container">
            <div className="textbox">
              {weather.name}, {weather.sys.country}
            </div>
          </div>
          <div className="container">
            <div className="textbox">{Math.round(weather.main.temp)}°F</div>
            <div className="textbox2">
              Max: {Math.round(weather.main.temp_max)}°F Min:{" "}
              {Math.round(weather.main.temp_min)}°F
            </div>
            <div className="textbox2"></div>
            <div className="textbox2">{weather.weather[0].main}</div>
          </div>
        </div>
      ) : (
        "Please put in a Valid City and/or Country"
      )}
    </>
  );
};

export default Weather;
