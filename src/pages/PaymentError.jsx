// src/pages/PaymentError.jsx
import React from 'react';
import { Link } from 'react-router-dom';

export default function PaymentError() {
  return (
    <div>
      <h2>Pago con error</h2>
      <p>Ocurrió un problema con el pago. Intenta nuevamente.</p>
      <Link to="/checkout" className="btn btn-primary">Reintentar</Link>
    </div>
  );
}
