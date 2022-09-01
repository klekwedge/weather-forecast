import { ICity, IForecast } from '../../slices/citiesSlice.types';

export interface CityProps {
  city: ICity,
  fewDaysForecastCity: IForecast
}