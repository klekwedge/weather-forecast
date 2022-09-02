import React, { useEffect } from "react";
import { Helmet } from "react-helmet";
import { useParams } from "react-router-dom";
import { Box } from "@chakra-ui/react";
import OpenWeather from "../services/OpenWeatherApi";
import { fetchCity, fetchCityForecast } from "../slices/citiesSlice";
import City from "../Components/City/City";
import ErrorMessage from "../Components/ErrorMessage/ErrorMessage";
import { useAppDispatch, useAppSelector } from "../hooks/redux-hook";
import Spinner from "../Components/Spinner/Spinner";

function CityPage() {
  const { cityId } = useParams();
  const dispatch = useAppDispatch();
  const { getCityById, getWeatherSeveralDays } = OpenWeather();
  const { currentCity, currentCityLoadingStatus, fewDaysForecastCity } =
    useAppSelector((state) => state.cities);

  useEffect(() => {
    if (cityId && !Number.isNaN(+cityId)) {
      dispatch(fetchCity(getCityById(+cityId)));
      dispatch(fetchCityForecast(getWeatherSeveralDays(cityId)));
    }
  }, [cityId]);

  if (currentCityLoadingStatus === "loading") {
    return <Spinner />;
  }

  if (
    (cityId && Number.isNaN(+cityId)) ||
    currentCityLoadingStatus === "error"
  ) {
    return <ErrorMessage errorTitle="Invalid city id" />;
  }

  if (!currentCity || !fewDaysForecastCity) {
    return null;
  }

  return (
    <>
      <Helmet>
        <meta
          name="description"
          content={
            currentCity
              ? `${currentCity.name} - Weather App`
              : "City - Weather App"
          }
        />
        <title>
          {currentCity
            ? `${currentCity.name} - Weather App`
            : "City - Weather App"}
        </title>
      </Helmet>
      <Box as="main" p="20px 0px">
        <City city={currentCity} fewDaysForecastCity={fewDaysForecastCity} />
      </Box>
    </>
  );
}

export default CityPage;
