import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export default function Navbar() {
  const { cart } = useCart();
  const navigate = useNavigate();
  
  const usuarioGuardado = JSON.parse(localStorage.getItem('usuario'));
  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  const handleLogout = () => {
    localStorage.removeItem('usuario');
    navigate('/login');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top shadow">
      <div className="container">
        <Link className="navbar-brand fw-bold text-uppercase" to="/">
           🎮 TiendaGamer
        </Link>
        
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon"></span>
        </button>
        
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/">Inicio</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/shop">Tienda</Link>
            </li>
            
            {/* --- AQUÍ ESTÁN LAS PÁGINAS QUE FALTABAN --- */}
            <li className="nav-item">
              <Link className="nav-link" to="/categorias">Categorías</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/ofertas">Ofertas</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/nosotros">Nosotros</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/blog">Blog</Link>
            </li>
            {/* ------------------------------------------- */}

            <li className="nav-item">
              <Link className="nav-link" to="/contacto">Contacto</Link>
            </li>
          </ul>

          <div className="d-flex align-items-center gap-3">
            {/* Carrito */}
            <Link to="/checkout" className="btn btn-outline-success position-relative">
              🛒 Carrito
              {totalItems > 0 && (
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                  {totalItems}
                </span>
              )}
            </Link>

            {/* Usuario */}
            {usuarioGuardado ? (
              <div className="dropdown">
                <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false">
                  👤 {usuarioGuardado.nombre}
                </button>
                <ul className="dropdown-menu dropdown-menu-end dropdown-menu-dark" aria-labelledby="dropdownMenuButton">
                  <li><Link className="dropdown-item" to="/admin/dashboard">Panel Admin</Link></li>
                  <li><hr className="dropdown-divider" /></li>
                  <li><button className="dropdown-item text-danger" onClick={handleLogout}>Cerrar Sesión</button></li>
                </ul>
              </div>
            ) : (
              <div className="d-flex gap-2">
                <Link to="/login" className="btn btn-outline-light">Ingresar</Link>
                <Link to="/registro" className="btn btn-primary">Registrarse</Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}