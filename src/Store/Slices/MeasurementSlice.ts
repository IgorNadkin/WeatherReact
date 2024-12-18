import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface MeasurementState {
  isCelsius: boolean; // Температура (°C или °F)
  isKmPerHour: boolean; // Скорость ветра (м/с или км/ч)
  isMbar: boolean; //Давление
}

const initialState: MeasurementState = {
  isCelsius: true, // По умолчанию — Цельсии
  isKmPerHour: true, // По умолчанию — км/ч
  isMbar: true,
};

const measurementSlice = createSlice({
  name: 'measurement',
  initialState,
  reducers: {
    setIsCelsius(state, action: PayloadAction<boolean>) {
      state.isCelsius = action.payload;
    },
    setIsKmPerHour(state, action: PayloadAction<boolean>) {
      state.isKmPerHour = action.payload;
    },
    setIsMbar(state, action: PayloadAction<boolean>) {
        state.isMbar = action.payload;
      },
  },
});

export const { setIsCelsius, setIsKmPerHour, setIsMbar } = measurementSlice.actions;

export default measurementSlice.reducer;
