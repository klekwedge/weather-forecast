import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import OpenWeather from "../services/OpenWeatherApi";
import { fetchCityById } from "../slices/citiesSlice";
import City from "../Components/City/City";
import { useAppDispatch, useAppSelector } from "../hooks/redux-hook";

function CityPage() {
  const { cityId } = useParams();
  const dispatch = useAppDispatch();
  const { getCityById } = OpenWeather();
  const { currentCity } = useAppSelector((state) => state.cities);

  useEffect(() => {
    if (cityId) {
      dispatch(fetchCityById(getCityById(cityId)));
    }
  }, [cityId]);

  if(!currentCity){
    return null;
  }
  
  return <City city={currentCity} />;
}

export default CityPage;
