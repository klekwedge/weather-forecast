import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import OpenWeather from "../services/OpenWeatherApi";
import { fetchCityById, fetchCityForecast } from "../slices/citiesSlice";
import City from "../Components/City/City";
import { useAppDispatch, useAppSelector } from "../hooks/redux-hook";
import Spinner from '../Components/Spinner/Spinner';

function CityPage() {
  const { cityId } = useParams();
  const dispatch = useAppDispatch();
  const { getCityById, getWeatherSeveralDays } = OpenWeather();
  const { currentCity, currentCityLoadingStatus, fewDaysForecastCity } =
    useAppSelector((state) => state.cities);

  useEffect(() => {
    if (cityId) {
      dispatch(fetchCityById(getCityById(cityId)));
      dispatch(fetchCityForecast(getWeatherSeveralDays(cityId)));
    }
  }, [cityId]);

  if (currentCityLoadingStatus === "loading") {
    return <Spinner/>;
  }

  console.log(currentCityLoadingStatus);

  if (!currentCity || !fewDaysForecastCity) {
    return null;
  }

  return <City city={currentCity} fewDaysForecastCity={fewDaysForecastCity} />;
}

export default CityPage;
