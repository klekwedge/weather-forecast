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
      <div>
        <h4>{days[new Date().getDay()]}</h4>
        <h4>{new Date().toLocaleDateString()}</h4>
        <h3 className="location">
          {city.name}, {city.sys.country}
        </h3>
      </div>
      <div>
        <img
          src={getWeatherIcon(city.weather[0].icon)}
          alt={city.weather[0].main}
        />
        <h4 className="weather-temp">
          {(city.main.temp - 273.15).toFixed(0)}°C
        </h4>
        <h4>{city.weather.map((weatherItem) => weatherItem.main)}</h4>
        <h4 className="weather-desc">Wind speed: {city.wind.speed}</h4>
        <h4 className="update">
          Last server update:{" "}
          {`${new Date(city.dt * 1000).toLocaleTimeString()}`}
        </h4>
        <h3 className="update">Latest query update: {`${city.updateTime}`}</h3>
      </div>
      <Flex
        position="absolute"
        top="15px"
        right="15px"
        gap="5px"
        alignItems="center"
      >
        <Link to={`/${city.id}`}>
          <FaExternalLinkAlt cursor="pointer" size="18" />
        </Link>
        <AiFillDelete cursor="pointer" size="20" onClick={deleteItem} />
      </Flex>
    </li>
  );
}

export default CityItem;
