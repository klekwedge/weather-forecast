import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import {
  Button,
  Input,
  List,
  FormControl,
  FormLabel,
  Box
} from "@chakra-ui/react";

import OpenWeather from "../services/OpenWeatherApi";
import {
  addLocalCities,
  fetchCityForList,
  updateCityForList
} from "../slices/citiesSlice";
import CityItem from "../Components/CityItem/CityItem";
import { useAppDispatch, useAppSelector } from "../hooks/redux-hook";

function CityListPage() {
  const updateInterval = 50 * 1000;
  const { cities } = useAppSelector((state) => state.cities);
  const [updates, setUpdates] = useState(0);
  const { getCity, getCityById } = OpenWeather();
  const [inputValue, setInputValue] = useState("");

  const dispatch = useAppDispatch();

  const savedCities = localStorage.getItem("savedCities");

  useEffect(() => {
    if (savedCities) {
      dispatch(addLocalCities(JSON.parse(savedCities)));
    }
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      // eslint-disable-next-line @typescript-eslint/no-shadow
      setUpdates((updates) => updates + 1);
    }, updateInterval);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (cities.length > 0) {
      cities.map((city) => dispatch(updateCityForList(getCityById(city.id))));
    }
  }, [updates]);

  useEffect(() => {
    localStorage.setItem("savedCities", JSON.stringify(cities));
  }, [cities]);

  function addCityToList() {
    dispatch(fetchCityForList(getCity(inputValue)));
    if (cities.length > 0) {
      cities.map((city) => dispatch(updateCityForList(getCityById(city.id))));
    }
    setInputValue("");
  }

  return (
    <>
      <Helmet>
        <meta name="description" content="City List - Weather App" />
        <title>City List - Weather App</title>
      </Helmet>
      <main>
        <FormControl>
          <FormLabel>Add city</FormLabel>
          <Box display="flex" gap="20px">
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Enter the name of the city"
              _placeholder={{ color: "gray" }}
              color="white"
              mb="15px"
            />
            <Button type="button" colorScheme="blue" onClick={addCityToList}>
              Add city
            </Button>
          </Box>
        </FormControl>
        <Button type="button" colorScheme="teal">
          <Link to="/my-location"> My location</Link>
        </Button>
        <List display="flex" gap="40px 20px" pt="50px" flexWrap="wrap">
          {cities.length > 0
            ? cities.map((city) => <CityItem key={city.id} city={city} />)
            : null}
        </List>
      </main>
    </>
  );
}

export default CityListPage;
