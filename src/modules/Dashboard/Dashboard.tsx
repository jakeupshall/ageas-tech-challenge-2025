import { useState } from 'react';

import { Search, WeatherCard } from 'components';

import { useGetForecast, useGetLocation } from 'hooks';

import classes from './Dashboard.module.scss';

export const Dashboard = () => {
  const [locationSearchTerm, setLocationSearchTerm] = useState('');

  const { data: locationData, isLoading: isLocationLoading } = useGetLocation(
    locationSearchTerm,
    {
      enabled: Boolean(locationSearchTerm),
    }
  );

  const matchedLocation = locationData?.results?.[0];

  const forecastQuery = useGetForecast(
    matchedLocation
      ? {
          latitude: matchedLocation.latitude,
          longitude: matchedLocation.longitude,
        }
      : undefined
  );

  return (
    <div className={classes.dashboard}>
      <div className={classes['dashboard__search']}>
        <Search
          label="Enter a location..."
          debounceTimer={500}
          onChange={(val) => setLocationSearchTerm(val)}
          isLoading={isLocationLoading}
        />
      </div>

      {forecastQuery.data && (
        <>
          <h2>
            {`Showing results for "${matchedLocation?.name}, ${matchedLocation?.country}"`}
          </h2>
          <div className={classes['dashboard__forecast']}>
            {forecastQuery.data.map((day) => (
              <WeatherCard
                key={day.date}
                date={day.date}
                maxTemp={day.maxTemp}
                weatherStatus={day.weatherStatus}
                windSpeed={day.windSpeed}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};
