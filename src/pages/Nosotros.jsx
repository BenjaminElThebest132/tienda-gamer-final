import React from 'react';

export default function Nosotros() {
  return (
    <div className="container mt-5">
      <div className="card p-5">
        <div className="row align-items-center">
          <div className="col-md-6">
            <h2 className="text-primary fw-bold mb-4">Sobre TiendaGamer</h2>
            <p className="text-light">
              Somos un grupo de apasionados por el hardware y los videojuegos. 
              Nacimos con la misión de traer a Chile los mejores periféricos del mercado 
              a precios justos.
            </p>
            <p className="text-light">
              Desde 2024, equipamos a jugadores casuales y profesionales con la tecnología 
              que necesitan para ganar.
            </p>
            <div className="mt-4">
              <div className="d-flex align-items-center mb-3">
                <span className="fs-2 me-3">🏆</span>
                <span className="text-muted">Distribuidores Oficiales</span>
              </div>
              <div className="d-flex align-items-center">
                <span className="fs-2 me-3">🇨🇱</span>
                <span className="text-muted">Envíos a todo Chile</span>
              </div>
            </div>
          </div>
          <div className="col-md-6 text-center">
             {/* Un emoji gigante o imagen */}
             <div style={{fontSize: '10rem'}}>🎮</div>
          </div>
        </div>
      </div>
    </div>
  );
}