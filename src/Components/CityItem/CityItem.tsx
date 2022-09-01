import React from "react";
import { Flex } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { FaExternalLinkAlt } from "react-icons/fa";
import { AiFillDelete } from "react-icons/ai";
import OpenWeather from "../../services/OpenWeatherApi";
import { deleteCity } from "../../slices/citiesSlice";
import { CityItemProps } from "./CityItem.props";
import "./CityItem.scss";
import { useAppDispatch } from "../../hooks/redux-hook";

function CityItem({ city }: CityItemProps) {
  const { getWeatherIcon } = OpenWeather();
  const dispatch = useAppDispatch();

  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];

  function deleteItem() {
    dispatch(deleteCity(city.id));
  }

  return (
    <li className="city__item">
      <div className="weather-side">
        <div className="weather-gradient" />
        <div className="date-container">
          <h2 className="date-dayname">{days[new Date().getDay()]}</h2>
          <span className="date-day">{new Date().toLocaleDateString()}</span>
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
          <h3 className="weather-desc">
            Wind speed: {city.wind.speed}
          </h3>
        </div>
        <Flex
          position="absolute"
          top="15px"
          right="15px"
          gap="5px"
          alignItems="center"
        >
          <Link to={`/${city.id}`}>
            {" "}
            <FaExternalLinkAlt cursor="pointer" size="18" />
          </Link>
          <AiFillDelete cursor="pointer" size="20" onClick={deleteItem} />
        </Flex>
      </div>
    </li>
  );
}

export default CityItem;
