import { api } from './index';

export const login = (username, password) => {
  return api.post('/login', { username, password }, { withCredentials: true });
};
