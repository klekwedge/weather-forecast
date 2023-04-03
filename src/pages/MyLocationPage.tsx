import { createRef, useEffect, useState } from "react";
import { Box } from "@chakra-ui/react";
import { Helmet } from "react-helmet";
import { useAppDispatch, useAppSelector } from "../hooks/redux-hook";
import OpenWeather from "../services/OpenWeatherApi";
import { fetchCity, fetchCityForecast } from "../slices/citiesSlice";
import City from "../components/City/City";
import Spinner from "../components/Spinner/Spinner";

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
      </Helmet>{" "}
      <Box as="main" p="20px 0px">
        <div ref={divRef} />
        {locationResolution && currentCity && fewDaysForecastCity ? (
          <City city={currentCity} fewDaysForecastCity={fewDaysForecastCity} />
        ) : null}
      </Box>
    </>
  );
}

export default MyLocationPage;
