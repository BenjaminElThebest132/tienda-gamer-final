// src/pages/PaymentSuccess.jsx
import React from 'react';
import { useLocation, Link } from 'react-router-dom';

export default function PaymentSuccess() {
  const { state } = useLocation();
  return (
    <div>
      <h2>Pago correcto</h2>
      <p>Gracias por tu compra. Orden ID: {state?.order?.id ?? '—'}</p>
      <Link to="/">Volver al inicio</Link>
    </div>
  );
}
