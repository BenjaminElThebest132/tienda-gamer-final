import React from 'react';

export default function ProductCard({ product, onAddToCart }) {
  // Datos seguros (por si vienen en inglés o español)
  const nombre = product.title || product.nombre || "Producto";
  const precio = Number(product.price || product.precio || 0);
  const imagen = product.image || product.imagen || "https://via.placeholder.com/300";
  const descripcion = product.description || product.descripcion || "";

  return (
    <div className="card h-100 shadow-sm bg-dark text-white border-secondary">
      {/* Imagen del producto */}
      <div style={{ backgroundColor: '#fff', padding: '5px', borderTopLeftRadius: 'calc(0.375rem - 1px)', borderTopRightRadius: 'calc(0.375rem - 1px)' }}>
        <img 
          src={imagen} 
          className="card-img-top" 
          alt={nombre} 
          style={{ height: '200px', objectFit: 'contain' }} 
        />
      </div>

      <div className="card-body d-flex flex-column">
        <h5 className="card-title">{nombre}</h5>
        
        {/* Descripción corta */}
        <p className="card-text text-muted small flex-grow-1">
            {descripcion.substring(0, 60)}...
        </p>
        
        <div className="mt-auto">
          <h4 className="fw-bold mb-3 text-white">
            ${precio.toLocaleString('es-CL')}
          </h4>
          
          {/* Solo botón de comprar */}
          <div className="d-grid">
             <button 
               className="btn btn-success fw-bold"
               onClick={() => onAddToCart(product)}
             >
               Agregar al Carrito 🛒
             </button>
          </div>
        </div>
      </div>
    </div>
  );
}