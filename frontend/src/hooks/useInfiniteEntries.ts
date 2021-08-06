import { useInfiniteQuery } from 'react-query';
import { fetchEntries, fetchProduct } from 'api/entries';
import { AxiosError } from 'axios';

export const useFetchEntries = () =>
  useInfiniteQuery(['entries'], fetchEntries, {
    getNextPageParam: (lastPage, pages) => lastPage.next,
  });
