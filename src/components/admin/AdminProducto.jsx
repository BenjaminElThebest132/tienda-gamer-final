import React, { useEffect, useState } from 'react';

export default function AdminProducto() {
  const [productos, setProductos] = useState([]);
  const [error, setError] = useState('');

  // 1. Función para cargar productos desde el Backend
  const cargarProductos = () => {
    fetch('https://tienda-gamer-final.onrender.com/api/productos')
      .then(res => res.json())
      .then(data => setProductos(data))
      .catch(err => setError('Error al cargar productos'));
  };

  // Cargamos al iniciar
  useEffect(() => {
    cargarProductos();
  }, []);

  // 2. Función para BORRAR un producto (DELETE)
  const eliminarProducto = async (id) => {
    if (!window.confirm("¿Estás seguro de que quieres eliminar este producto?")) return;

    try {
      const res = await fetch(`https://tienda-gamer-final.onrender.com/api/productos/${id}`, {
        method: 'DELETE'
      });

      if (res.ok) {
        // Si se borró bien, recargamos la lista visualmente quitando el producto
        setProductos(productos.filter(p => p.id !== id));
        alert("Producto eliminado correctamente");
      } else {
        alert("Error al eliminar");
      }
    } catch (error) {
      console.error(error);
      alert("Error de conexión");
    }
  };

  return (
    <div className="card p-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="text-primary">Gestión de Productos</h2>
        <button className="btn btn-success">
            + Nuevo Producto
        </button>
      </div>

      {error && <div className="alert alert-danger">{error}</div>}

      <div className="table-responsive">
        <table className="table table-striped table-hover">
          <thead className="table-dark">
            <tr>
              <th>ID</th>
              <th>Imagen</th>
              <th>Nombre</th>
              <th>Precio</th>
              <th>Stock</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {productos.map(p => (
              <tr key={p.id}>
                <td>{p.id}</td>
                <td>
                    <img 
                        src={p.imagen || "https://via.placeholder.com/50"} 
                        alt="img" 
                        style={{width: '50px', height: '50px', objectFit: 'cover'}} 
                    />
                </td>
                <td>{p.nombre}</td>
                <td>${Number(p.precio).toLocaleString('es-CL')}</td>
                <td>{p.stock}</td>
                <td>
                  <button 
                    className="btn btn-sm btn-danger ms-2"
                    onClick={() => eliminarProducto(p.id)}
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