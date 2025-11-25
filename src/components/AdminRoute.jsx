import React from 'react';
import { Navigate } from 'react-router-dom';

export default function AdminRoute({ children }) {
  // 1. Leemos el usuario
  let usuario = null;
  try {
    usuario = JSON.parse(localStorage.getItem('usuario'));
  } catch (error) {
    usuario = null;
  }

  // 2. Verificamos que sea EL ADMIN (revisa que el email coincida con tu base de datos)
  const esAdmin = usuario && (usuario.email === 'admin@tienda.com');

  // 3. Si no es admin, lo mandamos al inicio
  if (!esAdmin) {
    return <Navigate to="/" replace />;
  }

  // Si es admin, lo dejamos pasar
  return children;
}