
export interface CitiesState {
  cities: ICity[],
  citiesLoadingStatus: LoadingStatus,
  currentCity: ICity | null,
  currentCityLoadingStatus: LoadingStatus,
  fewDaysForecastCity: IForecast | null,
  fewDaysForecastCityLoadingStatus: LoadingStatus,
};

type LoadingStatus = 'idle' | 'loading' | 'error';

export interface ICity {
  coord: Coord;
  weather: Weather[];
  base: string;
  main: Main;
  visibility: number;
  wind: Wind;
  clouds: Clouds;
  dt: number;
  sys: Sys;
  timezone: number;
  id: number;
  name: string;
  cod: number;
}

export interface Clouds {
  all: number;
}

export interface Coord {
  lon: number;
  lat: number;
}

export interface Main {
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  pressure: number;
  humidity: number;
  sea_level: number;
  grnd_level: number;
}

export interface Sys {
  type: number;
  id: number;
  country: string;
  sunrise: number;
  sunset: number;
}

export interface Weather {
  id: number;
  main: string;
  description: string;
  icon: string;
}

export interface Wind {
  speed: number;
  deg: number;
  gust: number;
}



export interface IForecast {
  cod: string;
  message: number;
  cnt: number;
  list: ListForecast[];
  city: CityForecast;
}

export interface CityForecast {
  id: number;
  name: string;
  coord: CoordForecast;
  country: string;
  population: number;
  timezone: number;
  sunrise: number;
  sunset: number;
}

export interface CoordForecast {
  lat: number;
  lon: number;
}

export interface ListForecast {
  dt: number;
  main: MainClassForecast;
  weather: WeatherForecast[];
  clouds: CloudsForecast;
  wind: WindForecast;
  visibility: number;
  pop: number;
  sys: SysForecast;
  dt_txt: string;
  rain?: RainForecast;
}

export interface CloudsForecast {
  all: number;
}

export interface MainClassForecast {
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  pressure: number;
  sea_level: number;
  grnd_level: number;
  humidity: number;
  temp_kf: number;
}

export interface RainForecast {
  "3h": number;
}

export interface SysForecast {
  pod: PodForecast;
}

export enum PodForecast {
  D = "d",
  N = "n",
}

export interface WeatherForecast {
  id: number;
  main: MainEnumForecast;
  description: DescriptionForecast;
  icon: string;
}

export enum DescriptionForecast {
  BrokenClouds = "broken clouds",
  FewClouds = "few clouds",
  LightRain = "light rain",
  OvercastClouds = "overcast clouds",
  ScatteredClouds = "scattered clouds",
}

export enum MainEnumForecast {
  Clouds = "Clouds",
  Rain = "Rain",
}

export interface WindForecast {
  speed: number;
  deg: number;
  gust: number;
}
