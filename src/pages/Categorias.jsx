import React from 'react';

export default function Categorias() {
  const categorias = [
    { id: 1, nombre: "Periféricos", icono: "🖱️", desc: "Mouses, Teclados y Headsets" },
    { id: 2, nombre: "Componentes", icono: "💾", desc: "RAM, SSD, Tarjetas de Video" },
    { id: 3, nombre: "Monitores", icono: "🖥️", desc: "Pantallas 144Hz y 4K" },
    { id: 4, nombre: "Sillas Gamer", icono: "💺", desc: "Ergonomía para largas sesiones" },
  ];

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-5 fw-bold text-white">Explora por Categorías</h2>
      <div className="row g-4">
        {categorias.map(cat => (
          <div className="col-md-6 col-lg-3" key={cat.id}>
            <div className="card h-100 text-center p-4">
              <div className="display-1 mb-3">{cat.icono}</div>
              <h4 className="card-title text-primary">{cat.nombre}</h4>
              <p className="card-text text-muted">{cat.desc}</p>
              <button className="btn btn-outline-light mt-auto">Ver Productos</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}