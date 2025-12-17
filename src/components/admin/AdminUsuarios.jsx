import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';

const API_URL = 'https://tienda-gamer-final.onrender.com/api';

export default function AdminUsuarios() {
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user: currentUser } = useAuth(); // Obtener el usuario actual para evitar auto-eliminación

  const fetchUsers = async () => {
    setLoading(true);
    try {
      // 1. Apuntar al endpoint real
      const response = await fetch(`${API_URL}/usuarios`);
      if (!response.ok) throw new Error('Error al cargar usuarios');
      
      const data = await response.json();
      setUsuarios(data);
    } catch (err) {
      console.error("Error cargando usuarios:", err);
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDelete = async (userId) => {
    if (userId === currentUser.id) {
      alert("No puedes eliminar tu propia cuenta de administrador.");
      return;
    }
    if (window.confirm('¿Estás seguro de que quieres eliminar este usuario?')) {
      try {
        // 2. Enviar petición DELETE al endpoint real
        const response = await fetch(`${API_URL}/usuarios/${userId}`, {
            method: 'DELETE',
            // Si la ruta está protegida, necesitarás un token. Asumimos que sí.
            headers: {
                'Authorization': `Bearer ${currentUser.token}` 
            }
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'No se pudo eliminar el usuario.');
        }

        setUsuarios(prevUsers => prevUsers.filter(u => u.id !== userId));
        alert('Usuario eliminado con éxito.');
      } catch (err) {
        console.error("Error eliminando usuario:", err);
        alert(`Error al eliminar el usuario: ${err.message}`);
      }
    }
  };

  if (loading) return <div className="text-center p-5">Cargando usuarios...</div>;

  return (
    <div className="card p-4 shadow-sm">
      <h2 className="text-primary mb-4 fw-bold">👥 Usuarios Registrados</h2>

      <div className="table-responsive">
        <table className="table table-striped align-middle">
          <thead className="table-dark">
            <tr>
              <th>ID</th>
              <th>Usuario (Email)</th>
              <th>Rol</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {usuarios.map(user => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td className="fw-bold">{user.username}</td>
                <td>
                  <span className={`badge ${user.role === 'admin' ? 'bg-danger' : 'bg-secondary'}`}>
                    {user.role}
                  </span>
                </td>
                <td>
                  <button 
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDelete(user.id)}
                    disabled={user.id === currentUser.id}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
