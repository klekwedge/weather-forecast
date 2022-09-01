function OpenWeather() {
  const apiKey = 'be747318592dd14aa7030afcf31e3799';

  function getCity(cityName: string) {
    return `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`;
  }

  function getWeatherIcon(iconName: string) {
    return `http://openweathermap.org/img/wn/${iconName}@2x.png`
      ;
  }

  function getCityById(cityId: string) {
    return `https://api.openweathermap.org/data/2.5/weather?id=${cityId}&appid=${apiKey}`
      ;
  }

  function getWeatherSeveralDays(cityId: string) {
    return `https://api.openweathermap.org/data/2.5/forecast?id=${cityId}&appid=${apiKey}`
      ;
  }

  return {
    getCity,
    getWeatherIcon,
    getCityById,
    getWeatherSeveralDays
  };
}

export default OpenWeather;