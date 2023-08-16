import { ICity, IForecast, LoadingStatus } from "../types";

export interface CitiesState {
  cities: ICity[],
  citiesLoadingStatus: LoadingStatus,
  currentCity: ICity | null,
  currentCityLoadingStatus: LoadingStatus,
  fewDaysForecastCity: IForecast | null,
  fewDaysForecastCityLoadingStatus: LoadingStatus,
};
