import { api } from './index';
import axios from 'axios';

interface EntriesResponse {
  entries: {
    id: number;
    productName: string;
    price: number;
    unit: string;
    timestamp: string;
  }[];
  next: number;
}

export const fetchEntries = ({ pageParam = 0 }): Promise<EntriesResponse> => {
  return api.get(`entries?cursor=${pageParam}`);
};

export const addEntry = (data) => api.post('entries', data);

export const fetchProduct = ({ queryKey }) => {
  const [, { id }] = queryKey;

  return api.get('products/' + id);
};
