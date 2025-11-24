import React from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div>
      {/* HERO SECTION (Portada) */}
      <div 
        className="p-5 text-center bg-image rounded-3" 
        style={{
          backgroundImage: "url('https://wallpapers.com/images/hd/gaming-setup-background-a141566a56-2560x1440-wallpaper-nu5728-1.jpg')", 
          backgroundSize: 'cover', 
          backgroundPosition: 'center',
          height: '400px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative'
        }}
      >
        {/* Capa oscura para que se lea el texto */}
        <div style={{backgroundColor: 'rgba(0, 0, 0, 0.6)', position: 'absolute', top: 0, bottom: 0, left: 0, right: 0}}></div>

        <div className="mask" style={{zIndex: 1}}>
          <div className="d-flex justify-content-center align-items-center h-100">
            <div className="text-white">
              <h1 className="mb-3 display-3 fw-bold">Tienda Gamer Pro</h1>
              <h4 className="mb-3">El mejor hardware para llevar tu nivel al máximo</h4>
              <Link to="/shop" className="btn btn-outline-light btn-lg mt-3" role="button">
                VER CATÁLOGO
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* SECCIÓN DE VENTAJAS */}
      <div className="container mt-5">
        <div className="row text-center">
          <div className="col-md-4 mb-4">
            <div className="card p-4 h-100">
              <h3>🚀</h3>
              <h4>Envíos Rápidos</h4>
              <p>Recibe tu equipo en menos de 24 horas.</p>
            </div>
          </div>
          <div className="col-md-4 mb-4">
            <div className="card p-4 h-100">
              <h3>🛡️</h3>
              <h4>Garantía Total</h4>
              <p>6 meses de garantía en todos los periféricos.</p>
            </div>
          </div>
          <div className="col-md-4 mb-4">
            <div className="card p-4 h-100">
              <h3>💎</h3>
              <h4>Calidad Premium</h4>
              <p>Marcas oficiales: Logitech, Razer, HyperX.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}