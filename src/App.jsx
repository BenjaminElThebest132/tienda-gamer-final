import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Shop from './pages/Shop';
import ProductDetail from './components/ProductDetail';
import Checkout from './pages/Checkout';
import PaymentSuccess from './pages/PaymentSuccess';
import PaymentError from './pages/PaymentError';
import AdminPanel from './pages/AdminPanel';
import Login from './pages/Login';
import { CartProvider } from './context/CartContext';

// IMPORTANTE: Importamos el nuevo componente de seguridad
import AdminRoute from './components/AdminRoute';

import Nosotros from './pages/Nosotros';
import Blog from './pages/Blog';
import Contacto from './pages/Contacto';
import Ofertas from './pages/Ofertas';
import Categorias from './pages/Categorias';
import Registro from './pages/Registro';

export default function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        <Navbar />
        <div className="container container-main" style={{ paddingTop: '70px' }}>
          <Routes>
            {/* Rutas Públicas */}
            <Route path="/" element={<Home />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/payment-success" element={<PaymentSuccess />} />
            <Route path="/payment-error" element={<PaymentError />} />
            <Route path="/login" element={<Login />} />
            
            <Route path="/nosotros" element={<Nosotros />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/contacto" element={<Contacto />} />
            <Route path="/ofertas" element={<Ofertas />} />
            <Route path="/categorias" element={<Categorias />} />
            <Route path="/registro" element={<Registro />} />

            {/* RUTA PROTEGIDA SOLO PARA ADMIN */}
            {/* Usamos AdminRoute para envolver el panel */}
            <Route 
              path="/admin/*" 
              element={
                <AdminRoute>
                  <AdminPanel />
                </AdminRoute>
              } 
            />
            
            {/* Ruta comodín */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </CartProvider>
    </BrowserRouter>
  );
}