import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface City {
  name: string;
}

interface CitiesState {
  cities: City[];
  selectedCity: string | null;
}

const initialState: CitiesState = {
  cities: [{
    name: 'Саранск',
  }],
  selectedCity: 'Саранск',
};

const citiesSlice = createSlice({
  name: 'cities',
  initialState: initialState,
  reducers: {
    addCity(state, action: PayloadAction<City>) {
      if (!state.cities) {
        state.cities = [];
      }
      // Проверка, чтобы не добавлять дубли
      const cityExists = state.cities.find(
        (city) => city.name.toLowerCase() === action.payload.name.toLowerCase()
      );
      if (!cityExists) {
        state.cities.push(action.payload);
      }
    },
    removeCity(state, action: PayloadAction<string>) {
      state.cities = state.cities.filter(
        (city) => city.name.toLowerCase() !== action.payload.toLowerCase()
      );
    },
    clearCities(state) {
      state.cities = [];
    },
    setSelectedCity(state, action: PayloadAction<string>) {
      state.selectedCity = action.payload;
    },
  },
});

export const { addCity, removeCity, clearCities, setSelectedCity } = citiesSlice.actions;
export default citiesSlice.reducer;

