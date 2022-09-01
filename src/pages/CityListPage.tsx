import React, { useState, useEffect } from "react";
import {
  Button,
  Input,
  List,
  FormControl,
  FormLabel,
  Box
} from "@chakra-ui/react";

import OpenWeather from "../services/OpenWeatherApi";
import { addLocalCities, fetchCity } from "../slices/citiesSlice";
import CityItem from "../Components/CityItem/CityItem";
import { useAppDispatch, useAppSelector } from "../hooks/redux-hook";

function CityListPage() {
  const { cities } = useAppSelector((state) => state.cities);
  const { getCity } = OpenWeather();
  const [inputValue, setInputValue] = useState("");

  const dispatch = useAppDispatch();

  const savedCities = localStorage.getItem("savedCities");

  useEffect(() => {
    if (savedCities) {
      dispatch(addLocalCities(JSON.parse(savedCities)));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("savedCities", JSON.stringify(cities));
  }, [cities]);

  function addCityToList() {
    dispatch(fetchCity(getCity(inputValue)));
    setInputValue("");
  }

  return (
    <div>
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
        My location
      </Button>
      <List display="flex" gap="40px 20px" pt="50px" flexWrap="wrap">
        {cities.length > 0
          ? cities.map((city) => <CityItem key={city.id} city={city} />)
          : null}
      </List>
    </div>
  );
}

export default CityListPage;
