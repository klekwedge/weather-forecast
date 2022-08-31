import { configureStore } from '@reduxjs/toolkit';
import cities from '../slices/citiesSlice';

const store = configureStore({
  reducer: {
    cities,
  },
  devTools: process.env.NODE_ENV !== 'production',
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;