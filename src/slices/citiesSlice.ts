/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import useHttp from '../hooks/request-hook';
import { CitiesState } from './citiesSlice.types';

const initialState: CitiesState = {
  cities: [],
  citiesLoadingStatus: 'idle',  
};

export const fetchCities= createAsyncThunk('cities/fetchCities', (url: string) => {
  const { request } = useHttp();
  return request(url);
});

const citiesSlice = createSlice({
  name: 'cities',
  initialState,
  reducers: {
  
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCities.pending, (state) => {
        state.citiesLoadingStatus = 'loading';
      })
      .addCase(fetchCities.fulfilled, (state, action) => {
        state.citiesLoadingStatus = 'idle';
        state.cities = action.payload;
      })
      .addCase(fetchCities.rejected, (state) => {
        state.citiesLoadingStatus = 'error';
      })
      .addDefaultCase(() => { });
  },
});

const { actions, reducer } = citiesSlice;

export default reducer;