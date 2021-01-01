import React, { useState } from "react";
import dateBuilder from "./currentDate";
import "../App.scss";

const api = {
  key: process.env.REACT_APP_WEATHER_API_KEY,
  base: "https://api.openweathermap.org/data/2.5/",
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
        <main>
          <div className="container">
            <h1 className="textbox">
              Fucking {weather.name}, {weather.sys.country}
            </h1>
          </div>
          <div className="container">
            <div className="textbox">
              <h2>The Current Fucking Temperature:</h2>
              <div className="textbox3">{Math.round(weather.main.temp)}°F</div>
            </div>
            <img
              src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
              alt="Weather Icon"
            ></img>
            <div className="textbox2">
              <h3>Fucking {weather.weather[0].main} Outside</h3>
            </div>
            <div className="textbox4">
              <h3>
                The Fucking Max: {Math.round(weather.main.temp_max)}
                °F
              </h3>
            </div>
            <div className="textbox4">
              <h3>The Fucking Min: {Math.round(weather.main.temp_min)}°F</h3>
            </div>
          </div>
        </main>
      ) : (
        <div className="container">
          <div className="textbox">
            <h1> A fucking City and/or Country would be helpful.</h1>
          </div>
        </div>
      )}
      <div className="textbox">{dateBuilder(new Date())}</div>
    </>
  );
};

export default Weather;
