import React from "react";
import { CityProps } from "./City.props";
import "./City.scss";

function City({ city }: CityProps) {
  console.log(city);

  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];

  return (
    <li className="city">
      <div className="weather-side">
        <div className="weather-gradient" />
        <div className="date-container">
          <h2 className="date-dayname">{days[new Date().getDay()]}</h2>
          <span className="date-day">{new Date().toLocaleDateString()}</span>
          <i className="location-icon" data-feather="map-pin" />
          <span className="location">
            {city.name}, {city.sys.country}
          </span>
        </div>
        <div className="weather-container">
          <i className="weather-icon" data-feather="sun" />
          <h1 className="weather-temp">{(city.main.temp - 273.15).toFixed(2)}°C</h1>
          <h3 className="weather-desc">
            {city.weather.map((weatherItem) => weatherItem.main)}
          </h3>
        </div>
      </div>
    </li>
  );
}

export default City;
