/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import useHttp from '../hooks/useFetch';
import { CitiesState, ICity } from './citiesSlice.types';

const initialState: CitiesState = {
  cities: [],
  citiesLoadingStatus: 'idle',
  currentCity: null,
  currentCityLoadingStatus: 'idle',
  fewDaysForecastCity: null,
  fewDaysForecastCityLoadingStatus: 'idle',
};

export const fetchCityForList = createAsyncThunk('cities/fetchCityForList', (url: string) => {
  const { request } = useHttp();
  return request(url);
});

export const fetchCity = createAsyncThunk('cities/fetchCity', (url: string) => {
  const { request } = useHttp();
  return request(url);
});

export const fetchCityForecast = createAsyncThunk('cities/fetchCityForecast', (url: string) => {
  const { request } = useHttp();
  return request(url);
});

export const updateCityForList = createAsyncThunk('cities/updateCityForList', (url: string) => {
  const { request } = useHttp();
  return request(url);
});


const citiesSlice = createSlice({
  name: 'cities',
  initialState,
  reducers: {
    addLocalCities: (state, action) => {
      state.cities = action.payload;
    },
    deleteCity: (state, action) => {
      state.cities = state.cities.filter((city) => city.id !== action.payload)
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCityForList.pending, (state) => {
        state.citiesLoadingStatus = 'loading';
      })
      .addCase(fetchCityForList.fulfilled, (state, action: PayloadAction<ICity>) => {
        state.citiesLoadingStatus = 'idle';

        if (!state.cities.find(city => city.id === action.payload.id)) {
          state.cities.push({...action.payload, updateTime: new Date().toLocaleTimeString()});
        }
      })
      .addCase(fetchCityForList.rejected, (state) => {
        state.citiesLoadingStatus = 'error';
      })
      .addCase(updateCityForList.pending, (state) => {
        state.citiesLoadingStatus = 'loading';
      })
      .addCase(updateCityForList.fulfilled, (state, action: PayloadAction<ICity>) => {
        state.cities = state.cities.map(item => {
          if (item.id === action.payload.id) {
            return {...action.payload, updateTime: new Date().toLocaleTimeString()};
          }
          return item;
        });
      })
      .addCase(updateCityForList.rejected, (state) => {
        state.citiesLoadingStatus = 'error';
      })
      .addCase(fetchCity.pending, (state) => {
        state.currentCityLoadingStatus = 'loading';
      })
      .addCase(fetchCity.fulfilled, (state, action) => {
        state.currentCityLoadingStatus = 'idle';
        state.currentCity = action.payload;
      })
      .addCase(fetchCity.rejected, (state) => {
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
export const { deleteCity, addLocalCities } = actions
export default reducer;