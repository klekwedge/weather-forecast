import React from "react";
import { Box } from "@chakra-ui/react";
import { v4 as uuidv4 } from "uuid";
import { Link } from "react-router-dom";
import { FaExternalLinkAlt } from "react-icons/fa";
import OpenWeather from "../../services/OpenWeatherApi";
import { CityProps } from "./City.props";
import "./City.scss";

function City({ city, fewDaysForecastCity }: CityProps) {
  const { getWeatherIcon } = OpenWeather();

  console.log(fewDaysForecastCity);

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
    <div className="city__block">
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
          <img
            src={getWeatherIcon(city.weather[0].icon)}
            alt={city.weather[0].main}
          />
          <h1 className="weather-temp">
            {(city.main.temp - 273.15).toFixed(0)}°C
          </h1>
          <h3 className="weather-desc">
            {city.weather.map((weatherItem) => weatherItem.main)}
          </h3>
        </div>
      </div>
      <div className="info-side">
        <div className="today-info-container">
          <div className="today-info">
            <div className="precipitation">
              <span className="title">PRECIPITATION</span>
              <span className="value">0 %</span>
            </div>
            <div className="humidity">
              <span className="title">HUMIDITY</span>
              <span className="value">34 %</span>
            </div>
            <div className="wind">
              <span className="title">WIND</span>
              <span className="value">0 km/h</span>
            </div>
          </div>
        </div>
        <ul className="week-list">
          {fewDaysForecastCity.list.map((day) => (
            <li key={uuidv4()} className="active">
              <img
                src={getWeatherIcon(day.weather[0].icon)}
                alt={day.weather[0].main}
              />
              <h2 className="weather-temp">
                {(day.main.temp - 273.15).toFixed(0)}°C
              </h2>
              <h2>
                {`${new Date(day.dt * 1000).toLocaleString()}`}
              </h2>
              <h3 className="weather-desc">
                {day.weather.map((weatherItem) => weatherItem.main)}
              </h3>
              <h3>
              {days[new Date(day.dt * 1000).getDay()]}
              </h3>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default City;
