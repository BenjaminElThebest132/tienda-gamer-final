import React from 'react';

// Componente para el dashboard con datos de resumen inventados.
export function AdminDashboard() {
  // Datos de ejemplo
  const summaryData = {
    revenue: '15,800',
    orders: '1,250',
    users: 480,
    products: 150,
  };

  // Estilo para las tarjetas
  const cardStyle = {
    borderRadius: '8px',
    padding: '20px',
    color: 'white',
    position: 'relative',
    overflow: 'hidden',
  };

  return (
    <div>
      <h2>Resumen General</h2>
      <hr />
      <div className="row g-4">
        {/* Card de Ingresos */}
        <div className="col-lg-3 col-md-6">
          <div style={{ ...cardStyle, backgroundColor: '#28a745' }}>
            <h5>Ingresos (USD)</h5>
            <h2>${summaryData.revenue}</h2>
            <p className="mb-0">Estimado del mes</p>
          </div>
        </div>

        {/* Card de Órdenes */}
        <div className="col-lg-3 col-md-6">
          <div style={{ ...cardStyle, backgroundColor: '#007bff' }}>
            <h5>Nuevas Órdenes</h5>
            <h2>{summaryData.orders}</h2>
            <p className="mb-0">Este mes</p>
          </div>
        </div>
        
        {/* Card de Usuarios */}
        <div className="col-lg-3 col-md-6">
          <div style={{ ...cardStyle, backgroundColor: '#ffc107', color: '#333' }}>
            <h5>Usuarios Registrados</h5>
            <h2>{summaryData.users}</h2>
            <p className="mb-0">Total histórico</p>
          </div>
        </div>

        {/* Card de Productos */}
        <div className="col-lg-3 col-md-6">
          <div style={{ ...cardStyle, backgroundColor: '#dc3545' }}>
            <h5>Productos Activos</h5>
            <h2>{summaryData.products}</h2>
            <p className="mb-0">En catálogo</p>
          </div>
        </div>
      </div>
       <div className="alert alert-light mt-4">
        <h4 className="alert-heading">¡Bienvenido al Panel de Administrador!</h4>
        <p>Selecciona una opción del menú de la izquierda para empezar a gestionar el contenido.</p>
      </div>
    </div>
  );
}

// El resto de los stubs ya no son necesarios porque el panel principal
// usa los componentes reales o las secciones fueron eliminadas.
