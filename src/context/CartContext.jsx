// src/context/CartContext.jsx
import React, { createContext, useContext, useEffect, useState } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    try {
      const raw = localStorage.getItem('cart');
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product, qty = 1) => {
    setCart(prev => {
      const found = prev.find(p => p.id === product.id);
      if (found) return prev.map(p => p.id === product.id ? { ...p, qty: p.qty + qty } : p);
      return [...prev, { ...product, qty }];
    });
  };

  const removeFromCart = (id) => setCart(prev => prev.filter(p => p.id !== id));
  const clearCart = () => setCart([]);
  const updateQty = (id, qty) => setCart(prev => prev.map(p => p.id === id ? { ...p, qty } : p));

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, updateQty }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
