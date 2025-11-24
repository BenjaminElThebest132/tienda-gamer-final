import React from 'react';
import { Link } from 'react-router-dom';

export default function ProductCard({ product, onAddToCart }) {
  // --- TRUCO DE NIVEL 5 ---
  // Esto permite que la tarjeta funcione si los datos vienen en inglés O en español.
  // Si existe 'product.title' úsalo, si no, usa 'product.nombre'.
  const nombre = product.title || product.nombre || "Producto sin nombre";
  const precio = product.price || product.precio || 0;
  const descripcion = product.description || product.descripcion || "";
  
  // Si no hay imagen en la BD, usamos una por defecto para que no se vea feo
  const imagen = product.image || product.imagen || "https://via.placeholder.com/300?text=Gamer+Item";

  return (
    <div className="card h-100 shadow-sm">
      <img 
        src={imagen} 
        className="card-img-top" 
        alt={nombre} 
        style={{ height: '200px', objectFit: 'cover' }} 
      />
      <div className="card-body d-flex flex-column">
        <h5 className="card-title">{nombre}</h5>
        <p className="card-text text-muted small flex-grow-1">
            {descripcion.substring(0, 60)}...
        </p>
        
        <div className="mt-auto">
          <h4 className="fw-bold mb-3">${Number(precio).toLocaleString('es-CL')}</h4>
          
          <div className="d-grid gap-2">
             {/* Botón Ver Detalle */}
             <Link to={`/shop/${product.id}`} className="btn btn-outline-primary">
               Ver Detalle
             </Link>
             
             {/* Botón Agregar al Carrito */}
             <button 
               className="btn btn-success"
               onClick={() => onAddToCart(product)}
             >
               Agregar al Carrito
             </button>
          </div>
        </div>
      </div>
    </div>
  );
}