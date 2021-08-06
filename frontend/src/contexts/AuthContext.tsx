import React, { useState } from 'react';

export const AuthContext = React.createContext<{
  token: string | null;
  setToken: (token: string | null) => void;
}>({
  token: localStorage.getItem('token') || null,
  setToken: () => {},
});

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('token') || null);

  return (
    <AuthContext.Provider value={{ token, setToken }}>
      {children}
    </AuthContext.Provider>
  );
};
