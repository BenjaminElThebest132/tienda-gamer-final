import React, { createContext, useState, useContext, useEffect } from 'react';
import { db } from '../api/fakeDB';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Intenta cargar el usuario desde localStorage al iniciar
    try {
      const storedUser = localStorage.getItem('usuario');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    } catch (error) {
      console.error("Error al cargar usuario desde localStorage", error);
      localStorage.removeItem('usuario');
    } finally {
      setLoading(false);
    }
  }, []);

  const login = async (username, password) => {
    const authResponse = await db.authenticate(username, password);
    if (authResponse) {
      localStorage.setItem('usuario', JSON.stringify(authResponse.user));
      setUser(authResponse.user);
      return authResponse.user;
    }
    throw new Error('Credenciales incorrectas');
  };

  const logout = () => {
    localStorage.removeItem('usuario');
    setUser(null);
  };

  const value = {
    user,
    isLoggedIn: !!user,
    isAdmin: user?.role === 'admin',
    login,
    logout,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe ser usado dentro de un AuthProvider');
  }
  return context;
};
