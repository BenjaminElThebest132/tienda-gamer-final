import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export default function Navbar() {
  const { cart } = useCart();
  const navigate = useNavigate();
  
  const usuarioGuardado = JSON.parse(localStorage.getItem('usuario'));
  
  // Sumamos la cantidad total de productos
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
            <li className="nav-item"><Link className="nav-link" to="/">Inicio</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/shop">Tienda</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/categorias">Categorías</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/ofertas">Ofertas</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/nosotros">Nosotros</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/blog">Blog</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/contacto">Contacto</Link></li>
          </ul>

          <div className="d-flex align-items-center gap-3">
            
            {/* BOTÓN CARRITO */}
            <Link to="/checkout" className="btn btn-outline-success fw-bold">
              🛒 Carrito {totalItems > 0 ? `(${totalItems})` : ''}
            </Link>

            {/* MENU DE USUARIO (DROPDOWN) */}
            {usuarioGuardado ? (
              <div className="dropdown">
                {/* El atributo data-bs-toggle="dropdown" es el que hace la magia */}
                <button 
                  className="btn btn-secondary dropdown-toggle" 
                  type="button" 
                  id="userMenu" 
                  data-bs-toggle="dropdown" 
                  aria-expanded="false"
                >
                  👤 {usuarioGuardado.nombre}
                </button>
                
                <ul className="dropdown-menu dropdown-menu-end dropdown-menu-dark" aria-labelledby="userMenu">
                  {/* Link al Admin (Visible para todos para la demo) */}
                  <li>
                    <Link className="dropdown-item text-warning" to="/admin/dashboard">
                      ⚙️ Panel Admin
                    </Link>
                  </li>
                  
                  <li><hr className="dropdown-divider" /></li>
                  
                  {/* Logout */}
                  <li>
                    <button className="dropdown-item text-danger" onClick={handleLogout}>
                      Cerrar Sesión
                    </button>
                  </li>
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