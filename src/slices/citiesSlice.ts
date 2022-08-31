/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import useHttp from '../hooks/request-hook';
import { CitiesState, ICity } from './citiesSlice.types';

const initialState: CitiesState = {
  cities: [],
  citiesLoadingStatus: 'idle',
};

export const fetchCity = createAsyncThunk('cities/fetchCity', (url: string) => {
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
      .addDefaultCase(() => { });
  },
});

const { actions, reducer } = citiesSlice;

export default reducer;