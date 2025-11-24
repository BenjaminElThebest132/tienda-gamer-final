import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';

export default function Checkout() {
  const { cart, clearCart } = useCart(); // Asegúrate de que tu Context tenga clearCart, si no, bórralo de aquí
  const [datos, setDatos] = useState({ nombre: '', direccion: '' });
  const navigate = useNavigate();

  // --- LÓGICA PARA CALCULAR TOTAL SIN ERRORES (NaN) ---
  const calcularTotal = () => {
    return cart.reduce((total, item) => {
      // Truco: Si viene 'price' úsalo, si viene 'precio' úsalo. Si no, 0.
      const precioReal = Number(item.price || item.precio || 0);
      return total + (precioReal * item.quantity);
    }, 0);
  };

  const total = calcularTotal();

  const handlePagar = (e) => {
    e.preventDefault();
    // Aquí podrías hacer un POST a /api/ordenes si quisieras guardar la compra real
    alert("¡Compra realizada con éxito!");
    
    // Limpiamos el carrito (si la función existe)
    if (clearCart) clearCart();
    
    // Redirigimos
    navigate('/');
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4 text-primary fw-bold">Finalizar Compra</h2>
      
      <div className="row">
        {/* Formulario de Datos */}
        <div className="col-md-7">
          <div className="card p-4 mb-4">
            <h4 className="mb-3 text-white">Datos de Envío</h4>
            <form onSubmit={handlePagar}>
              <div className="mb-3">
                <label className="form-label">Nombre Completo</label>
                <input 
                  type="text" 
                  className="form-control" 
                  required 
                  value={datos.nombre}
                  onChange={e => setDatos({...datos, nombre: e.target.value})}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Dirección de Entrega</label>
                <input 
                  type="text" 
                  className="form-control" 
                  required
                  value={datos.direccion}
                  onChange={e => setDatos({...datos, direccion: e.target.value})}
                />
              </div>
              
              <button type="submit" className="btn btn-success btn-lg w-100 mt-3">
                Pagar ${total.toLocaleString('es-CL')}
              </button>
            </form>
          </div>
        </div>

        {/* Resumen del Pedido */}
        <div className="col-md-5">
          <div className="card p-4 bg-dark border-secondary">
            <h4 className="mb-3 text-white">Resumen</h4>
            <ul className="list-group list-group-flush mb-3">
              {cart.map((item, index) => {
                const precio = Number(item.price || item.precio || 0);
                return (
                  <li key={index} className="list-group-item bg-dark text-white d-flex justify-content-between lh-sm border-secondary">
                    <div>
                      <h6 className="my-0">{item.title || item.nombre}</h6>
                      <small className="text-muted">Cantidad: {item.quantity}</small>
                    </div>
                    <span className="text-muted">${(precio * item.quantity).toLocaleString('es-CL')}</span>
                  </li>
                );
              })}
            </ul>
            <div className="d-flex justify-content-between text-white fw-bold fs-5">
              <span>Total (CLP)</span>
              <span>${total.toLocaleString('es-CL')}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}