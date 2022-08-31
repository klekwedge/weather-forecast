function OpenWeather() {
  const apiKey = 'be747318592dd14aa7030afcf31e3799';

  function getCity(cityName: string) {
    return `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`;
  }


  return {
    getCity
  };
}

export default OpenWeather;