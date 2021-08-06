import { useQuery } from 'react-query';
import { fetchEntries, fetchProduct } from 'api/entries';
import { AxiosError } from 'axios';

// export const useFetchEntries = () => useQuery(['entries'], fetchEntries);

export const useFetchProduct = (id: number | null) =>
  useQuery<any, AxiosError>(['entries', { id }], fetchProduct, {
    enabled: typeof id === 'number',
  });
