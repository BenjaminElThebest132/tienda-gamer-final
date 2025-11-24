// src/components/PrivateRoute.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';

export default function PrivateRoute({ children }) {
  // Buscamos si existe el 'usuario' que guardamos en el Login
  const usuarioGuardado = localStorage.getItem('usuario');
  
  // Si NO hay usuario, lo mandamos al Login (patada del guardia)
  if (!usuarioGuardado) {
    return <Navigate to="/login" replace />;
  }

  // Si SÍ hay usuario, lo dejamos pasar (renderizamos el componente hijo)
  return children;
}