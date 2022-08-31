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
    <li className="container">
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
          <h1 className="weather-temp">{city.main.temp - 273.15}°C</h1>
          <h3 className="weather-desc">
            {city.weather.map((weatherItem) => weatherItem.main)}
          </h3>
        </div>
      </div>
      <div className="info-side">
        <div className="today-info-container">
          {/* <div className="today-info">
            <div className="precipitation">
              <span className="title">PRECIPITATION</span>
              <span className="value">0 %</span>
              <div className="clear" />
            </div>
            <div className="humidity">
              <span className="title">HUMIDITY</span>
              <span className="value">34 %</span>
              <div className="clear" />
            </div>
            <div className="wind">
              <span className="title">WIND</span>
              <span className="value">0 km/h</span>
              <div className="clear" />
            </div>
          </div> */}
        </div>
        <div className="week-container">
          <ul className="week-list">
            <li className="active">
              <i className="day-icon" data-feather="sun" />
              <span className="day-name">Tue</span>
              <span className="day-temp">29°C</span>
            </li>
            <li>
              <i className="day-icon" data-feather="cloud" />
              <span className="day-name">Wed</span>
              <span className="day-temp">21°C</span>
            </li>
            <li>
              <i className="day-icon" data-feather="cloud-snow" />
              <span className="day-name">Thu</span>
              <span className="day-temp">08°C</span>
            </li>
            <li>
              <i className="day-icon" data-feather="cloud-rain" />
              <span className="day-name">Fry</span>
              <span className="day-temp">19°C</span>
            </li>
            <div className="clear" />
          </ul>
        </div>
        <div className="location-container">
          <button className="location-button" type="button">
            <i data-feather="map-pin" />
            <span>Change location</span>
          </button>
        </div>
      </div>
    </li>
  );
}

export default City;
