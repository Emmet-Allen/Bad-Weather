import React, { useState } from "react";
import dateBuilder from "./currentDate";
import "../App.scss";

const api = {
  key: process.env.REACT_APP_WEATHER_API_KEY,
  base: "http://api.openweathermap.org/data/2.5/",
};

const Weather = () => {
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState({});

  const search = async (evt) => {
    if (evt.key === "Enter")
      try {
        fetch(`${api.base}weather?q=${query}&units=imperial&APPID=${api.key}`)
          .then((res) => res.json())
          .then((result) => {
            setWeather(result);
            setQuery("");
            console.log(result);
          });
      } catch (err) {
        console.error();
      }
  };

  return (
    <>
      <div className="search-box">
        <input
          type="text"
          className="search-bar"
          placeholder="Where the fuck are you?"
          onChange={(e) => setQuery(e.target.value)}
          value={query}
          onKeyPress={search}
        />
      </div>
      {typeof weather.main != "undefined" ? (
        <div>
          <div className="container">
            <div className="textbox">
              Fucking {weather.name}, {weather.sys.country}
            </div>
          </div>
          <div className="container">
            <div className="textbox">
              The Current Fucking Temperature:
              <div className="textbox3">{Math.round(weather.main.temp)}°F</div>
            </div>
            <img
              src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
              alt="weatherIcon"
            ></img>
            <div className="textbox2">
              Fucking {weather.weather[0].main} Outside
            </div>
            <div className="textbox4">
              The Fucking Max: {Math.round(weather.main.temp_max)}
              °F
            </div>
            <div className="textbox4">
              The Fucking Min: {Math.round(weather.main.temp_min)}°F
            </div>
          </div>
        </div>
      ) : (
        <div className="container">
          <div className="textbox">
            A fucking City and/or Country would be helpful.
          </div>
        </div>
      )}
      <div className="textbox">{dateBuilder(new Date())}</div>
    </>
  );
};

export default Weather;
