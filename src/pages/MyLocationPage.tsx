import React, { createRef, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/redux-hook";
import OpenWeather from "../services/OpenWeatherApi";
import { fetchCity, fetchCityForecast } from "../slices/citiesSlice";
import City from "../Components/City/City";
import Spinner from "../Components/Spinner/Spinner";

function MyLocationPage() {
  const divRef = createRef<HTMLDivElement>();
  const [locationResolution, setLocationResolution] = useState(false);

  const dispatch = useAppDispatch();
  const { getCityByCoord, getWeatherSeveralDaysByCoord } = OpenWeather();
  const { currentCity, currentCityLoadingStatus, fewDaysForecastCity } =
    useAppSelector((state) => state.cities);

  function sendPosition(position: GeolocationPosition) {
    dispatch(
      fetchCity(
        getCityByCoord(position.coords.latitude, position.coords.longitude)
      )
    );
    dispatch(
      fetchCityForecast(
        getWeatherSeveralDaysByCoord(
          position.coords.latitude,
          position.coords.longitude
        )
      )
    );
  }

  useEffect(() => {
    if (navigator.geolocation) {
      setLocationResolution(true);
      navigator.geolocation.getCurrentPosition(sendPosition);
    } else if (divRef.current && !navigator.geolocation) {
      divRef.current.textContent =
        "Geolocation is not supported by this browser.";
    }
  }, []);

  if (currentCityLoadingStatus === "loading") {
    return <Spinner />;
  }

  return (
    <main>
      <div ref={divRef} />
      {locationResolution && currentCity && fewDaysForecastCity ? (
        <City city={currentCity} fewDaysForecastCity={fewDaysForecastCity} />
      ) : null}
    </main>
  );
}

export default MyLocationPage;
