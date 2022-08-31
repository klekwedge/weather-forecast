import React, { useEffect, useState } from "react";
import { Button, Input, List } from "@chakra-ui/react";
import { v4 as uuidv4 } from "uuid";
import OpenWeather from "../services/OpenWeatherApi";
import { fetchCity } from "../slices/citiesSlice";
import City from "../Components/City/City";
import { useAppDispatch, useAppSelector } from "../hooks/redux-hook";

function CityListPage() {
  const { cities } = useAppSelector((state) => state.cities);
  const { getCity } = OpenWeather();
  const [inputValue, setInputValue] = useState("");

  const dispatch = useAppDispatch();
  // useEffect(() => {
  //   useAppDispatch(fetchCity(getCity()));
  // }, []);

  function test() {
    dispatch(fetchCity(getCity(inputValue)));
  }

  return (
    <div>
      <Input
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Enter the name of the city"
        _placeholder={{ color: 'gray' }}
        color="white"
        mb="15px"
      />
      <Button onClick={test}>Click</Button>
      <List display="flex" gap="40px 20px" p="20px" flexWrap="wrap">
        {cities.length > 0
          ? cities.map((city) => <City key={uuidv4()} city={city} />)
          : null}
      </List>
    </div>
  );
}

export default CityListPage;
