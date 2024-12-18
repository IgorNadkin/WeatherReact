import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

interface WeatherResponse {
    location: {
      name: string; // Название города
      localtime: string; // Локальное время
    };
    current: {
      temp_c: number; // Температура в градусах Цельсия
      temp_f: number; // Температура в градусах Фаренгейта
      humidity: number; // Влажность
      pressure_mb: number; // Давление
      wind_mph: number; // Скорость ветра
      wind_dir: string; // Направление ветра
      feelslike_c: number; // Ощущаемая температура
      condition: {
        text: string; // Описание погоды
        icon: string; // URL иконки
      };
    };
    forecast: {
      forecastday: Array<{
        date: string; // Дата в формате YYYY-MM-DD
        day: {
          avgtemp_c: number;
          avgtemp_f: number; // Средняя температура
          maxtemp_c: number; // Максимальная температура
          mintemp_c: number; // Минимальная температура
          maxwind_mph: number; // Максимальная скорость ветра
          daily_chance_of_rain: number;
          condition: {
            text: string; // Описание погоды
            icon: string; // URL иконки
          };
        };
        hour: Array<{
          time: string; // Время в формате YYYY-MM-DD HH:MM
          temp_c: number; // Температура в градусах Цельсия
          humidity: number; // Влажность
          pressure_mb: number; // Давление
          wind_mph: number; // Скорость ветра
          wind_dir: string; // Направление ветра
          feelslike_c: number; // Ощущаемая температура
          condition: {
            text: string; // Описание погоды
            icon: string; // URL иконки
          };
        }>;
      }>;
    };
  }
  

export const weatherApi = createApi({
  reducerPath: 'weatherApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://api.weatherapi.com/v1/',
  }),
  endpoints: (builder) => ({
    getWeatherByCity: builder.query<WeatherResponse, string>({
      query: (city) => 
        `forecast.json?q=${city}&key=becd5e99eb7a4ada942122852240912&days=7&aqi=no&alerts=no&lang=ru`,
    }),
  }),
});

export const { useGetWeatherByCityQuery } = weatherApi;
