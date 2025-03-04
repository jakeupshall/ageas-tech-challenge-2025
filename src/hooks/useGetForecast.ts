import {
  UseQueryOptions,
  UseQueryResult,
  useQuery,
} from '@tanstack/react-query';

import { QueryKey } from 'types/QueryKey';
import { WmoCode } from 'types/WmoCodes';

import { convertWeatherCode } from 'utils/convertWeatherCode';

type GETForecastResponse = {
  daily: {
    temperature_2m_max: number[];
    temperature_2m_min: number[];
    time: string[];
    weather_code: WmoCode[];
    wind_speed_10m_max: number[];
  };
};

type ForecastLocation = {
  latitude: number;
  longitude: number;
};

type ForecastParams = {
  forecast_days?: number;
};

type ForecastDayData = {
  date: string;
  maxTemp: number;
  minTemp: number;
  weatherStatus: string;
  windSpeed: number;
};

type ForecastReturn = Array<ForecastDayData>;

type Options = Omit<UseQueryOptions<ForecastReturn>, 'queryKey' | 'queryFn'>;

export const useGetForecast = (
  location?: ForecastLocation,
  params?: ForecastParams,
  options?: Options
): UseQueryResult<ForecastReturn> => {
  return useQuery<ForecastReturn>({
    queryKey: location
      ? [QueryKey.FORECAST, location, params]
      : ['forecast-disabled'],
    queryFn: async (): Promise<ForecastReturn> => {
      if (!location) {
        throw new Error('No location provided');
      }

      const response = await getForecast(location, params || {});
      return constructForecastData(response);
    },
    enabled: !!location,
    ...options,
  });
};

const getForecast = async (
  location: ForecastLocation,
  { forecast_days: forecastDays = 5 }: ForecastParams
): Promise<GETForecastResponse> => {
  const response = await fetch(
    `https://api.open-meteo.com/v1/forecast?latitude=${location.latitude}&longitude=${location.longitude}&forecast_days=${forecastDays}&daily=weather_code,temperature_2m_max,temperature_2m_min,wind_speed_10m_max&temperature_unit=celsius&wind_speed_unit=mph`
  ).then((response) => response.json());

  return response;
};

const constructForecastData = (
  response: GETForecastResponse
): ForecastReturn => {
  const daily = response.daily;
  const days: ForecastReturn = [];

  console.log('daily', daily);

  for (const index of daily.time.keys()) {
    days.push({
      date: daily.time[index],
      maxTemp: daily.temperature_2m_max[index],
      minTemp: daily.temperature_2m_min[index],
      weatherStatus: convertWeatherCode(daily.weather_code[index]),
      windSpeed: daily.wind_speed_10m_max[index],
    });
  }

  return days;
};
