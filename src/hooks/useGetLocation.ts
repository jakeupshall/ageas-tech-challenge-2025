import { UseQueryOptions, useQuery } from '@tanstack/react-query';

import { QueryKey } from 'types/QueryKey';

type GETLocationResponse = {
  results?: Array<{
    id: number;
    name: string;
    country: string;
    timezone: string;
    latitude: number;
    longitude: number;
  }>;
};

type Options = Omit<
  UseQueryOptions<GETLocationResponse>,
  'queryKey' | 'queryFn'
>;

const getLocation = async (location: string) =>
  fetch(
    `https://geocoding-api.open-meteo.com/v1/search?name=${location}&count=10&language=en&format=json`
  ).then((res) => res.json());

export const useGetLocation = (location: string, options?: Options) => {
  return useQuery<GETLocationResponse>({
    queryKey: [QueryKey.LOCATION, location],
    queryFn: async () => getLocation(location),
    ...options,
  });
};
