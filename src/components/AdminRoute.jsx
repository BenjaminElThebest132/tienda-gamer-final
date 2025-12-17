import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function AdminRoute({ children }) {
  const { isLoggedIn, isAdmin, loading } = useAuth();

  // Mientras se verifica el estado de autenticación, no renderizamos nada
  if (loading) {
    return null; // O un componente de carga/spinner
  }

  // Si está logueado y es admin, permitimos el acceso
  if (isLoggedIn && isAdmin) {
    return children;
  }

  // Si no cumple las condiciones, lo redirigimos al login
  return <Navigate to="/login" replace />;
}
