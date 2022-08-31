import React from "react";
import { Box } from "@chakra-ui/react";
import { Link } from 'react-router-dom';
import { FaExternalLinkAlt } from "react-icons/fa";
import OpenWeather from "../../services/OpenWeatherApi";
import { CityItemProps } from "./CityItem.props";
import "./CityItem.scss";

function CityItem({ city }: CityItemProps) {
  const { getWeatherIcon } = OpenWeather();


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
        <Box position="absolute" top="20px" right="20px">
          <Link to={`/${city.id}`}>
            {" "}
            <FaExternalLinkAlt cursor="pointer" size="18" />
          </Link>
        </Box>
      </div>
    </li>
  );
}

export default CityItem;
