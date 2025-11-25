import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export default function Navbar() {
  const { cart } = useCart();
  const navigate = useNavigate();

  // 1. Recuperamos el usuario de forma segura
  let usuarioGuardado = null;
  try {
    usuarioGuardado = JSON.parse(localStorage.getItem('usuario'));
  } catch (e) {
    usuarioGuardado = null;
  }

  // 2. DETECTOR DE ADMIN (A prueba de fallos)
  let esAdmin = false;
  if (usuarioGuardado) {
    // Buscamos el email ya sea que venga directo o dentro de un objeto 'usuario'
    const email = usuarioGuardado.email || (usuarioGuardado.usuario && usuarioGuardado.usuario.email) || '';
    
    // Comparamos convirtiendo a minúsculas y quitando espacios vacíos
    if (email.toLowerCase().trim() === 'admin@tienda.com') {
      esAdmin = true;
    }
  }

  // Calculamos items del carrito
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
            <li className="nav-item"><Link className="nav-link" to="/contacto">Contacto</Link></li>
          </ul>

          <div className="d-flex align-items-center gap-3">
            {/* BOTÓN CARRITO */}
            <Link to="/checkout" className="btn btn-outline-success fw-bold position-relative">
               🛒 Carrito
               {totalItems > 0 && (
                 <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                   {totalItems}
                 </span>
               )}
            </Link>

            {/* MENÚ DE USUARIO */}
            {usuarioGuardado ? (
              <div className="dropdown">
                <button 
                  className="btn btn-secondary dropdown-toggle d-flex align-items-center gap-2" 
                  type="button" 
                  id="userMenu" 
                  data-bs-toggle="dropdown" 
                  aria-expanded="false"
                >
                  <i className="bi bi-person-circle"></i>
                  {/* Si detectamos que es admin, forzamos el texto "Administrador" */}
                  <span>{esAdmin ? "Administrador" : (usuarioGuardado.nombre || "Usuario")}</span>
                </button>
                
                <ul className="dropdown-menu dropdown-menu-end dropdown-menu-dark shadow" aria-labelledby="userMenu">
                  <li><h6 className="dropdown-header">Mi Cuenta</h6></li>
                  
                  {/* SOLO SE VE SI LA LÓGICA DE ADMIN FUNCIONÓ */}
                  {esAdmin && (
                    <li>
                      <Link className="dropdown-item text-warning fw-bold" to="/admin/dashboard">
                        ⚙️ Panel Admin
                      </Link>
                    </li>
                  )}
                  
                  <li><Link className="dropdown-item" to="/mis-ordenes">📦 Mis Pedidos</Link></li>
                  <li><hr className="dropdown-divider" /></li>
                  <li>
                    <button className="dropdown-item text-danger fw-bold" onClick={handleLogout}>
                      🚪 Cerrar Sesión
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