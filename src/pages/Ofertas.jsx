import React from 'react';
import { Link } from 'react-router-dom';

export default function Ofertas() {
  return (
    <div className="container mt-5 text-center">
      <div className="card p-5 bg-dark border-danger border-2">
        <h1 className="display-3 text-danger fw-bold">🔥 CYBER SALE 🔥</h1>
        <p className="lead text-white mt-3">
          Estamos preparando los descuentos más agresivos del año.
        </p>
        <div className="my-5">
           <span className="display-1">Coming Soon...</span>
        </div>
        <p className="text-muted">Suscríbete al newsletter para no perderte nada.</p>
        <Link to="/shop" className="btn btn-danger btn-lg mt-3">
          Ver Precios Actuales
        </Link>
      </div>
    </div>
  );
}