import React, { createContext, useState, useContext, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  // 1. Leer carrito guardado al iniciar
  const [cart, setCart] = useState(() => {
    try {
      const carritoGuardado = localStorage.getItem('carrito');
      return carritoGuardado ? JSON.parse(carritoGuardado) : [];
    } catch (error) {
      return [];
    }
  });

  // 2. Guardar cambios automáticamente
  useEffect(() => {
    localStorage.setItem('carrito', JSON.stringify(cart));
  }, [cart]);

  // --- FUNCIÓN AGREGAR (Con Alerta y Corrección de Precio) ---
  const addToCart = (product) => {
    // Feedback visual inmediato
    alert(`¡${product.nombre || product.title} agregado al carrito!`);

    setCart(prevCart => {
      const existe = prevCart.find(item => item.id === product.id);

      if (existe) {
        // Si ya existe, sumamos 1 a la cantidad
        return prevCart.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        // Si es nuevo, aseguramos que el precio sea un número para evitar NaN
        const precioFinal = Number(product.price || product.precio || 0);
        // Guardamos nombre, precio limpio y cantidad 1
        return [...prevCart, { 
            ...product, 
            quantity: 1, 
            price: precioFinal,
            nombre: product.nombre || product.title 
        }];
      }
    });
  };

  const removeFromCart = (id) => {
    setCart(prevCart => prevCart.filter(item => item.id !== id));
  };

  const clearCart = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};