import React, { createContext, useState, useContext, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  // 1. Intentamos leer el carrito guardado en el navegador al iniciar
  const [cart, setCart] = useState(() => {
    try {
      const carritoGuardado = localStorage.getItem('carrito');
      return carritoGuardado ? JSON.parse(carritoGuardado) : [];
    } catch (error) {
      return [];
    }
  });

  // 2. Cada vez que el carrito cambie, lo guardamos en el navegador
  useEffect(() => {
    localStorage.setItem('carrito', JSON.stringify(cart));
  }, [cart]);

  // --- FUNCIÓN PARA AGREGAR (La Magia del +1) ---
  const addToCart = (product) => {
    setCart(prevCart => {
      // Buscamos si el producto ya existe en el carrito
      const existe = prevCart.find(item => item.id === product.id);

      if (existe) {
        // Si existe, le sumamos 1 a la cantidad
        return prevCart.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        // Si no existe, lo agregamos con cantidad 1
        // Aseguramos que tenga precio (sea 'price' o 'precio')
        const precioFinal = Number(product.price || product.precio || 0);
        return [...prevCart, { ...product, quantity: 1, precio: precioFinal }];
      }
    });
  };

  // Función para borrar un producto
  const removeFromCart = (id) => {
    setCart(prevCart => prevCart.filter(item => item.id !== id));
  };

  // Función para vaciar todo (al comprar)
  const clearCart = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};