# SPA: WeatherApp (working with an external API service)

You can also read this README in [русский](https://github.com/klekwedge/weather-forecast/blob/main/README.RU.md)

## 1 page: CityList
- Show list of city names (stored in LocalStorage)
- Show current weather next to each city: temperature, wind speed, weather icon (if any)
Update data immediately after changing the list item and with a certain frequency (set the frequency in the config)
- Ability to add/remove cities

## 2nd page: City
- Switching from the CityList page by choosing a city
- Display weather for the specified city for a period (e.g. a week): temperature, wind speed, weather icon (if any)

## 3rd page: MyLocation
- Switching from the CityList page using the MyLocation button
- Automatically determine the current location and show the weather forecast for the period (as in p2)

Data: openweathermap.org or any other service
Required technologies: react.js and redux/mobx
Result: github repository with working deployment instructions

## Deployment instructions

1. Make a clone of this repository ```git clone https://github.com/klekwedge/weather-forecast.git```
2. Install all required npm packages with ```npm i```
3. Run the project with the command ```npm start```

## Project config

Refreshing data with a certain frequency is set in the folder along the path
**./src/configs/project.config.ts**
***Frequency set in minutes***

## Stack used

- React
- Redux
- TypeScript
- SCSS
- Chakra UI