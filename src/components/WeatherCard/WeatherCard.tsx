import { Typography } from '@mui/material';

import { formatDate } from 'utils/formatDate';

import classes from './WeatherCard.module.scss';
import { WeatherCardProps } from './types';

export const WeatherCard = ({
  date,
  maxTemp,
  weatherStatus,
  windSpeed,
}: WeatherCardProps) => {
  return (
    <div className={classes['weather-card']}>
      <div
        className={`${classes['weather-card__info']} ${classes['weather-card__info--date']}`}
      >
        <Typography>{formatDate(date)}</Typography>
      </div>
      <div className={classes['weather-card__info']}>
        <Typography>{weatherStatus}</Typography>
      </div>
      <div className={classes['weather-card__info']}>
        <Typography>{maxTemp}&deg;C</Typography>
      </div>
      <div className={classes['weather-card__info']}>
        <Typography>{windSpeed} mph</Typography>
      </div>
    </div>
  );
};

export default WeatherCard;
