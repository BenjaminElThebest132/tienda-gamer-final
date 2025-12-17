import React from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Shop from './pages/Shop';
import ProductDetail from './components/ProductDetail';
import Checkout from './pages/Checkout';
import Login from './pages/Login';
import Registro from './pages/Registro';
import Categorias from './pages/Categorias';
import Ofertas from './pages/Ofertas';
import Nosotros from './pages/Nosotros';
import Contacto from './pages/Contacto';
import { CartProvider } from './context/CartContext';
import AdminPanel from './pages/AdminPanel';
import AdminRoute from './components/AdminRoute';
import { AuthProvider } from './context/AuthContext';

// Componente auxiliar para decidir si mostramos el Navbar
function Layout() {
  const location = useLocation();
  // Si la ruta empieza con "/admin", NO mostramos el Navbar
  const esAdminPanel = location.pathname.startsWith('/admin');

  return (
    <>
      {!esAdminPanel && <Navbar />}
      <div className={!esAdminPanel ? "container container-main" : ""} style={!esAdminPanel ? { paddingTop: '80px' } : {}}>
        <Routes>
          {/* Rutas Públicas */}
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/categorias" element={<Categorias />} />
          <Route path="/ofertas" element={<Ofertas />} />
          <Route path="/nosotros" element={<Nosotros />} />
          <Route path="/contacto" element={<Contacto />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/login" element={<Login />} />
          <Route path="/registro" element={<Registro />} />

          {/* RUTA ADMIN PROTEGIDA */}
          <Route 
            path="/admin/*" 
            element={
              <AdminRoute>
                <AdminPanel />
              </AdminRoute>
            } 
          />
          
          {/* Cualquier ruta rara va al inicio */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>
          <Layout />
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}