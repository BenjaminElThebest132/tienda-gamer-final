// src/pages/Checkout.jsx
import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { db } from '../api/fakeDB';
import { useNavigate } from 'react-router-dom';

export default function Checkout() {
  const { cart, clearCart } = useCart();
  const [form, setForm] = useState({ name: '', address: '' });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const total = cart.reduce((s, p) => s + p.price * p.qty, 0);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Simular pago aleatorio
      const success = Math.random() > 0.15;
      const order = await db.createOrder({ items: cart, total, customer: form });
      clearCart();
      setLoading(false);
      navigate(success ? '/payment-success' : '/payment-error', { state: { order } });
    } catch (err) {
      setLoading(false);
      navigate('/payment-error');
    }
  };

  if (!cart.length) return <p>Tu carrito está vacío.</p>;

  return (
    <div>
      <h2>Checkout</h2>
      <div className="row">
        <div className="col-md-6">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Nombre</label>
              <input className="form-control" value={form.name} onChange={e => setForm({...form, name: e.target.value})} required />
            </div>
            <div className="mb-3">
              <label className="form-label">Dirección</label>
              <input className="form-control" value={form.address} onChange={e => setForm({...form, address: e.target.value})} required />
            </div>
            <button className="btn btn-success" disabled={loading}>Pagar ${total.toFixed(2)}</button>
          </form>
        </div>
        <div className="col-md-6">
          <h4>Resumen</h4>
          {cart.map(p => <div key={p.id} className="mb-2">{p.title} x {p.qty} - ${ (p.price * p.qty).toFixed(2) }</div>)}
          <hr />
          <strong>Total: ${total.toFixed(2)}</strong>
        </div>
      </div>
    </div>
  );
}
