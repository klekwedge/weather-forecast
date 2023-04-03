import { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
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
import CityItem from "../components/CityItem/CityItem";
import { useAppDispatch, useAppSelector } from "../hooks/redux-hook";
import projectConfig from '../configs/project.config';

function CityListPage() {
  const updateInterval = projectConfig.updateInterval * 1000 || 60 * 1000;
  const { cities } = useAppSelector((state) => state.cities);
  const [updates, setUpdates] = useState(0);
  const [initialUpdate, setInitialUpdates] = useState(false);
  const { getCity, getCityById } = OpenWeather();
  const [inputValue, setInputValue] = useState("");

  const dispatch = useAppDispatch();

  const savedCities = localStorage.getItem("savedCities");

  useEffect(() => {
    if (savedCities) {
      dispatch(addLocalCities(JSON.parse(savedCities)));
      setInitialUpdates(true);
    }
  }, []);

  useEffect(() => {
    if (cities.length > 0) {
      cities.map((city) => dispatch(updateCityForList(getCityById(city.id))));
    }
  }, [initialUpdate]);

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
    if (inputValue) {
      dispatch(fetchCityForList(getCity(inputValue)));
      if (cities.length > 0) {
        cities.map((city) => dispatch(updateCityForList(getCityById(city.id))));
      }
      setInputValue("");
    }
  }

  function addCityToListByKey(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.code === "Enter") {
      addCityToList();
    }
  }

  return (
    <>
      <Helmet>
        <meta name="description" content="City List - Weather App" />
        <title>City List - Weather App</title>
      </Helmet>
      <Box as='main' p="20px">
        <FormControl>
          <FormLabel>Add city</FormLabel>
          <Box display="flex" gap="20px">
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => addCityToListByKey(e)}
              placeholder="Enter the name of the city"
              _placeholder={{ color: "gray" }}
              color="white"
              mb="15px"
            />
            <Button type="button" colorScheme="blue" onClick={() => addCityToList()}>
              Add city
            </Button>
          </Box>
        </FormControl>
        <Button type="button" colorScheme="teal">
          <Link to="/my-location"> My location</Link>
        </Button>
        <List
          display="flex"
          gap="40px 20px"
          pt="50px"
          flexWrap="wrap"
          justifyContent={["center", "center", "center", "flex-start"]}
        >
          <AnimatePresence>
            {cities.length > 0
              ? cities.map((city) => <CityItem key={city.id} city={city} />)
              : null}{" "}
          </AnimatePresence>
        </List>
      </Box>
    </>
  );
}

export default CityListPage;
