import React, { createContext, useState, useEffect } from 'react';
import api from '../api/axios';

export const AuthContext = createContext();

export function AuthProvider({ children }){
  const [user, setUser] = useState(() => {
    const raw = localStorage.getItem('user');
    return raw ? JSON.parse(raw) : null;
  });

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) return;
  // optionally verify token by requesting profile
  api.get('/auth/profile').then(res => setUser(res.data.user || res.data)).catch(() => {});
  }, []);

  const login = (token, userObj) => {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(userObj || null));
    setUser(userObj || null);
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
