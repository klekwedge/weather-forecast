function OpenWeather() {
  const apiKey = 'be747318592dd14aa7030afcf31e3799';

  function getCity(cityName: string) {
    return `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`;
  }

  function getWeatherIcon(iconName: string) {
    return `http://openweathermap.org/img/wn/${iconName}@2x.png`
      ;
  }

  function getCityById(cityId: number) {
    return `https://api.openweathermap.org/data/2.5/weather?id=${cityId}&appid=${apiKey}`
      ;
  }

  function getCityByCoord(lat: number, lon: number) {
    return `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`
      ;
  }

  function getWeatherSeveralDays(cityId: string) {
    return `https://api.openweathermap.org/data/2.5/forecast?id=${cityId}&appid=${apiKey}`
      ;
  }

  function getWeatherSeveralDaysByCoord(lat: number, lon: number) {
    return `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}`
      ;
  }

  return {
    getCity,
    getWeatherIcon,
    getCityById,
    getWeatherSeveralDays,
    getCityByCoord,
    getWeatherSeveralDaysByCoord
  };
}

export default OpenWeather;