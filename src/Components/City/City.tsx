import { v4 as uuidv4 } from "uuid";
import { motion } from "framer-motion";
import { Box, Heading } from "@chakra-ui/react";
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
      <motion.div
        className="city"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: "0.5" }}
      >
        <div className="city__today-forecast">
          <div>
            <div>
              <h1>
                {city.name}, {city.sys.country}
              </h1>
              <h2>
                {new Date().toLocaleDateString()} {days[new Date().getDay()]}
              </h2>
            </div>
            <div>
              <img
                src={getWeatherIcon(city.weather[0].icon)}
                alt={city.weather[0].main}
              />
              <h2 className="city__weather-temp">
                {(city.main.temp - 273).toFixed(0)}°C
              </h2>
              <h2>{city.weather.map((weatherItem) => weatherItem.main)}</h2>
              <Box as="section" p="10px 0px">
                <h2>Wind speed: {city.wind.speed}</h2>
                <h2>Wind deg: {(city.wind.deg - 273).toFixed(0)}</h2>
                <h2>Wind gust: {city.wind.gust}</h2>
              </Box>
            </div>
          </div>
          <ul className="city__today-info">
            <li>
              <h2>Sunrise</h2>
              <h2>{new Date(city.sys.sunrise * 1000).toLocaleTimeString()}</h2>
            </li>
            <li>
              <h2>Sunset</h2>
              <h2>{new Date(city.sys.sunset * 1000).toLocaleTimeString()}</h2>
            </li>
          </ul>
        </div>
        <Heading p="0px 30px" fontSize="24px" fontWeight="500">
          Weather forecast for 5 days every 3 hours:
        </Heading>
        <ul className="city__week-forecast week-forecast">
          {fewDaysForecastCity.list.map((day) => (
            <li key={uuidv4()}>
              <img
                src={getWeatherIcon(day.weather[0].icon)}
                alt={day.weather[0].main}
              />
              <h2 className="week-forecast__temp">
                {(day.main.temp - 273.15).toFixed(0)}°C
              </h2>
              <h3 className="week-forecast__desc">
                {day.weather.map((weatherItem) => weatherItem.main)}
              </h3>
              <h3>Wind speed: {day.wind.speed}</h3>
              <h2>{`${new Date(day.dt * 1000).toLocaleString()}`}</h2>
              <h3>{days[new Date(day.dt * 1000).getDay()]}</h3>
            </li>
          ))}
        </ul>
      </motion.div>
  );
}

export default City;
