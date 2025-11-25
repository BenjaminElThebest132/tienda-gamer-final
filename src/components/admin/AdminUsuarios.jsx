import React, { useEffect, useState } from 'react';

export default function AdminUsuarios() {
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);

  // Cargar usuarios desde el Backend
  useEffect(() => {
    fetch('https://tienda-gamer-final.onrender.com/api/usuarios')
      .then(res => res.json())
      .then(data => {
        setUsuarios(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error cargando usuarios:", err);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="text-center p-5">Cargando usuarios...</div>;

  return (
    <div className="card p-4 shadow-sm">
      <h2 className="text-primary mb-4 fw-bold">👥 Usuarios Registrados</h2>

      <div className="table-responsive">
        <table className="table table-striped align-middle">
          <thead className="table-dark">
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Email</th>
              <th>Rol</th>
              <th>Fecha Registro</th>
            </tr>
          </thead>
          <tbody>
            {usuarios.map(user => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td className="fw-bold">{user.nombre}</td>
                <td>{user.email}</td>
                <td>
                  {/* Destacamos si es admin o usuario normal */}
                  <span className={`badge ${user.rol === 'admin' ? 'bg-danger' : 'bg-primary'}`}>
                    {user.rol || 'cliente'}
                  </span>
                </td>
                <td>{new Date(user.createdAt).toLocaleDateString('es-CL')}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}