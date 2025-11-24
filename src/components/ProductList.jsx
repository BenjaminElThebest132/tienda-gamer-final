// src/components/ProductList.jsx
import React, { useEffect, useState } from 'react';
// ELIMINAMOS: import { db } from '../api/fakeDB';  <-- Adiós base de datos falsa
import ProductCard from './ProductCard';
import { useCart } from '../context/CartContext';

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null); // Para saber si falla la conexión
  const { addToCart } = useCart();

  useEffect(() => {
    // LLAMADA AL BACKEND REAL (El "Endpoint" que creamos)
    fetch('http://localhost:4000/api/productos')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Error al conectar con el servidor');
        }
        return response.json(); // Convertimos la respuesta a JSON
      })
      .then((data) => {
        console.log("Productos recibidos del Backend:", data); // Mira la consola del navegador
        setProducts(data);
      })
      .catch((err) => {
        console.error("Fallo la conexión:", err);
        setError("No se pudieron cargar los productos. Revisa si el Backend está encendido.");
      });
  }, []);

  if (error) return <div className="alert alert-danger">{error}</div>;
  if (!products.length) return <p>Cargando productos desde MySQL...</p>;

  return (
    <div className="row g-3">
      {products.map((p) => (
        <div className="col-12 col-sm-6 col-md-4" key={p.id}>
          {/* Nota: Como en Postman no enviamos "imagen", 
             aquí le pasamos el producto tal cual. 
             Si ProductCard espera una imagen y no la tiene, se verá roto 
             hasta que arreglemos eso.
          */}
          <ProductCard product={p} onAddToCart={addToCart} />
        </div>
      ))}
    </div>
  );
}