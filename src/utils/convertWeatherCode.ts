import { CODES, WmoCode } from 'types/WmoCodes';

export const convertWeatherCode = (code: WmoCode): string => {
  return CODES[code] ?? 'Unknown';
};
