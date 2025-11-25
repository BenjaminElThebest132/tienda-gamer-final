import React, { useEffect, useState } from 'react';

export default function AdminOrdenes() {
  const [ordenes, setOrdenes] = useState([]);
  const [loading, setLoading] = useState(true);

  // Cargar órdenes desde el Backend
  useEffect(() => {
    fetch('https://tienda-gamer-final.onrender.com/api/ordenes')
      .then(res => res.json())
      .then(data => {
        setOrdenes(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error cargando órdenes:", err);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="text-center p-5">Cargando órdenes...</div>;

  return (
    <div className="card p-4 shadow-sm">
      <h2 className="text-primary mb-4 fw-bold">📦 Historial de Órdenes</h2>
      
      {ordenes.length === 0 ? (
        <div className="alert alert-info">No hay órdenes registradas todavía.</div>
      ) : (
        <div className="table-responsive">
          <table className="table table-hover align-middle">
            <thead className="table-dark">
              <tr>
                <th>#ID</th>
                <th>Usuario (ID)</th>
                <th>Fecha</th>
                <th>Total</th>
                <th>Estado</th>
              </tr>
            </thead>
            <tbody>
              {ordenes.map(orden => (
                <tr key={orden.id}>
                  <td className="fw-bold">#{orden.id}</td>
                  <td>
                    <span className="badge bg-secondary">
                      User {orden.usuario_id || orden.userId}
                    </span>
                  </td>
                  <td>{new Date(orden.createdAt).toLocaleDateString('es-CL')}</td>
                  <td className="text-success fw-bold">
                    ${Number(orden.total).toLocaleString('es-CL')}
                  </td>
                  <td>
                    {/* Lógica simple de colores para el estado */}
                    <span className={`badge ${orden.estado === 'completado' ? 'bg-success' : 'bg-warning text-dark'}`}>
                      {orden.estado || 'Pendiente'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}