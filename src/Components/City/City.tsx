import React from "react";
import { v4 as uuidv4 } from "uuid";
import { Heading } from "@chakra-ui/react";
import OpenWeather from "../../services/OpenWeatherApi";
import { CityProps } from "./City.props";
import "./City.scss";

function City({ city, fewDaysForecastCity }: CityProps) {
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
    <div className="city">
      <div className="city__weather">
        <div>
          <div>
            <h1 className="location">
              {city.name}, {city.sys.country}
            </h1>
            <h2 className="date-dayname">
              {new Date().toLocaleDateString()} {days[new Date().getDay()]}
            </h2>
          </div>
          <div>
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
            <h3>Wind speed: {city.wind.speed}</h3>
          </div>
        </div>
        <div className="today-info">
          <div>
            <span className="title">Sunrise</span>
            <span>
              {new Date(city.sys.sunrise * 1000).toLocaleTimeString()}
            </span>
          </div>
          <div>
            <span className="title">Sunset</span>
            <span>{new Date(city.sys.sunset * 1000).toLocaleTimeString()}</span>
          </div>
        </div>
      </div>
      <Heading p='0px 30px' fontSize='24px' fontWeight='500'>Weather forecast for 5 days every 3 hours:</Heading>
      <ul className="week-list">
        {fewDaysForecastCity.list.map((day) => (
          <li key={uuidv4()}>
            <img
              src={getWeatherIcon(day.weather[0].icon)}
              alt={day.weather[0].main}
            />
            <h2 className="weather-temp">
              {(day.main.temp - 273.15).toFixed(0)}°C
            </h2>
            <h3 className="weather-desc">
              {day.weather.map((weatherItem) => weatherItem.main)}
            </h3>
            <h3>Wind speed: {day.wind.speed}</h3>
            <h2>{`${new Date(day.dt * 1000).toLocaleString()}`}</h2>
            <h3>{days[new Date(day.dt * 1000).getDay()]}</h3>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default City;
