import { useContext, useEffect, useState } from 'react';
import { Roles } from 'consts/roles';
import jwtDecode from 'jwt-decode';
import { AuthContext } from 'contexts/AuthContext';

interface User {
  userId: number | null;
  roles: Roles[] | null;
  username: string | null;
}

export const useMe = () => {
  const [username, setUsername] = useState<string | null>(null);
  const [roles, setRoles] = useState<Roles[] | null>(null);
  const [userId, setUserId] = useState<number | null>(null);

  const { token, setToken } = useContext(AuthContext);
  const isLoggedIn = !!token;

  useEffect(() => {
    if (token) {
      try {
        const {
          userId,
          sub: username,
          roles,
        }: {
          userId: number;
          sub: string;
          roles: Roles[];
        } = jwtDecode(token);
        setUsername(username);
        setUserId(userId);
        setRoles(roles);
      } catch (error) {
        localStorage.removeItem('token');
        setToken(null);
      }
    } else {
      setUsername(null);
      setUserId(null);
      setRoles(null);
      localStorage.removeItem('token');
    }
  }, [token, setToken]);

  const login = (token) => {
    localStorage.setItem('token', token);
    setToken(token);
  };
  const logout = () => {
    setToken(null);
  };

  return { isLoggedIn, username, roles, userId, login, logout };
};
