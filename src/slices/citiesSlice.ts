/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import useHttp from '../hooks/request-hook';
import { CitiesState, ICity } from './citiesSlice.types';

const initialState: CitiesState = {
  cities: [],
  citiesLoadingStatus: 'idle',
  currentCity: null,
  currentCityLoadingStatus: 'idle',
  fewDaysForecastCity: null,
  fewDaysForecastCityLoadingStatus: 'idle',
};

export const fetchCity = createAsyncThunk('cities/fetchCity', (url: string) => {
  const { request } = useHttp();
  return request(url);
});

export const fetchCityById = createAsyncThunk('cities/fetchCityById', (url: string) => {
  const { request } = useHttp();
  return request(url);
});

export const fetchCityForecast = createAsyncThunk('cities/fetchCityForecast', (url: string) => {
  const { request } = useHttp();
  return request(url);
});

const citiesSlice = createSlice({
  name: 'cities',
  initialState,
  reducers: {
    deleteCity: (state, action) => {
      state.cities = state.cities.filter((city) => city.id !== action.payload)
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCity.pending, (state) => {
        state.citiesLoadingStatus = 'loading';
      })
      .addCase(fetchCity.fulfilled, (state, action: PayloadAction<ICity>) => {
        state.citiesLoadingStatus = 'idle';
        state.cities.push(action.payload);
      })
      .addCase(fetchCity.rejected, (state) => {
        state.citiesLoadingStatus = 'error';
      })
      .addCase(fetchCityById.pending, (state) => {
        state.currentCityLoadingStatus = 'loading';
      })
      .addCase(fetchCityById.fulfilled, (state, action) => {
        state.citiesLoadingStatus = 'idle';
        state.currentCity = action.payload;
      })
      .addCase(fetchCityById.rejected, (state) => {
        state.currentCityLoadingStatus = 'error';
      })
      .addCase(fetchCityForecast.pending, (state) => {
        state.fewDaysForecastCityLoadingStatus = 'loading';
      })
      .addCase(fetchCityForecast.fulfilled, (state, action) => {
        state.fewDaysForecastCityLoadingStatus = 'idle';
        state.fewDaysForecastCity = action.payload;
      })
      .addCase(fetchCityForecast.rejected, (state) => {
        state.fewDaysForecastCityLoadingStatus = 'error';
      })
      .addDefaultCase(() => { });
  },
});

const { actions, reducer } = citiesSlice;
export const { deleteCity } = actions
export default reducer;