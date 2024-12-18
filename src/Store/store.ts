import { configureStore } from '@reduxjs/toolkit';
import { weatherApi } from '../weatherApi/weatherApi';
import measurementReducer from './Slices/MeasurementSlice';
import citiesReducer from './Slices/CitiesSlice';
import { loadFromLocalStorage, loadFromLocalStorageMeasurement, saveToLocalStorage, saveToLocalStorageMeasurement } from './LocalStorage';

const preloadedState = loadFromLocalStorage()|| {};
const preloadedStateMeasurement = loadFromLocalStorageMeasurement()|| {};
export const store = configureStore({
  reducer: {
    [weatherApi.reducerPath]: weatherApi.reducer,
    measurement: measurementReducer,
    cities: citiesReducer,
  },
  preloadedState: { cities: preloadedState, measurement: preloadedStateMeasurement || [] },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(weatherApi.middleware),
});

store.subscribe(() => {
    saveToLocalStorage(store.getState().cities);
    saveToLocalStorageMeasurement(store.getState().measurement);
  });

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
