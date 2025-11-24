// src/components/ProductDetail.jsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { db } from '../api/fakeDB';
import { useCart } from '../context/CartContext';

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const { addToCart } = useCart();

  useEffect(() => {
    let mounted = true;
    db.getProductById(id).then(p => { if (mounted) setProduct(p); });
    return () => mounted = false;
  }, [id]);

  if (!product) return <p>Cargando producto...</p>;

  return (
    <div className="card">
      <div className="card-body">
        <h3>{product.title}</h3>
        <p>{product.description}</p>
        <p><strong>${product.price.toFixed(2)}</strong></p>
        <button className="btn btn-primary" onClick={() => addToCart(product)}>Añadir al carrito</button>
      </div>
    </div>
  );
}
