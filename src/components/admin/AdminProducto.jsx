import React, { useEffect, useState } from 'react';

export default function AdminProducto() {
  const [productos, setProductos] = useState([]);
  const [error, setError] = useState('');
  
  // ESTADO PARA EL FORMULARIO DE CREACIÓN
  const [nuevoProducto, setNuevoProducto] = useState({
    nombre: '',
    precio: '',
    stock: '',
    imagen: '',
    descripcion: '' // Agregado por si tu backend lo requiere
  });

  // URL DE LA API (Centralizada)
  const API_URL = 'https://tienda-gamer-final.onrender.com/api/productos';

  // 1. CARGAR PRODUCTOS (GET)
  const cargarProductos = () => {
    fetch(API_URL)
      .then(res => res.json())
      .then(data => setProductos(data))
      .catch(err => setError('Error al cargar productos'));
  };

  useEffect(() => {
    cargarProductos();
  }, []);

  // 2. ELIMINAR PRODUCTO (DELETE)
  const eliminarProducto = async (id) => {
    if (!window.confirm("¿Estás seguro de eliminar este producto?")) return;

    try {
      const res = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setProductos(productos.filter(p => p.id !== id));
        alert("Producto eliminado");
      } else {
        alert("Error al eliminar");
      }
    } catch (error) {
      console.error(error);
    }
  };

  // 3. CREAR PRODUCTO (POST) - ¡NUEVA FUNCIONALIDAD!
  const handleCrear = async (e) => {
    e.preventDefault(); // Evita que se recargue la página
    try {
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(nuevoProducto)
      });

      if (res.ok) {
        alert("Producto creado con éxito");
        cargarProductos(); // Recargamos la lista
        setNuevoProducto({ nombre: '', precio: '', stock: '', imagen: '', descripcion: '' }); // Limpiamos form
        // Cerramos modal programáticamente (opcional, o manual por el usuario)
      } else {
        alert("Error al crear. Verifica los datos.");
      }
    } catch (error) {
      console.error(error);
      alert("Error de conexión al crear");
    }
  };

  // Manejador de inputs del formulario
  const handleChange = (e) => {
    setNuevoProducto({
      ...nuevoProducto,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="card p-4 shadow-sm">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="text-primary fw-bold">Gestión de Productos</h2>
        
        {/* BOTÓN QUE ABRE EL MODAL */}
        <button 
          className="btn btn-success fw-bold"
          data-bs-toggle="modal" 
          data-bs-target="#modalCrearProducto"
        >
          + Nuevo Producto
        </button>
      </div>

      {error && <div className="alert alert-danger">{error}</div>}

      <div className="table-responsive">
        <table className="table table-striped table-hover align-middle">
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
                    alt="producto" 
                    className="rounded border"
                    style={{width: '50px', height: '50px', objectFit: 'cover'}} 
                  />
                </td>
                <td className="fw-bold">{p.nombre}</td>
                <td>${Number(p.precio).toLocaleString('es-CL')}</td>
                <td>
                  <span className={`badge ${p.stock > 5 ? 'bg-success' : 'bg-warning'}`}>
                    {p.stock} u.
                  </span>
                </td>
                <td>
                  <button 
                    className="btn btn-sm btn-danger"
                    onClick={() => eliminarProducto(p.id)}
                  >
                    <i className="bi bi-trash"></i> Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* --- MODAL DE CREACIÓN (BOOTSTRAP 5) --- */}
      <div className="modal fade" id="modalCrearProducto" tabIndex="-1" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header bg-dark text-white">
              <h5 className="modal-title">Agregar Nuevo Producto</h5>
              <button type="button" className="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <form onSubmit={handleCrear}>
              <div className="modal-body">
                <div className="mb-3">
                  <label className="form-label">Nombre del Producto</label>
                  <input type="text" className="form-control" name="nombre" required 
                         value={nuevoProducto.nombre} onChange={handleChange} />
                </div>
                <div className="row">
                  <div className="col-6 mb-3">
                    <label className="form-label">Precio</label>
                    <input type="number" className="form-control" name="precio" required 
                           value={nuevoProducto.precio} onChange={handleChange} />
                  </div>
                  <div className="col-6 mb-3">
                    <label className="form-label">Stock</label>
                    <input type="number" className="form-control" name="stock" required 
                           value={nuevoProducto.stock} onChange={handleChange} />
                  </div>
                </div>
                <div className="mb-3">
                  <label className="form-label">URL de Imagen</label>
                  <input type="text" className="form-control" name="imagen" placeholder="https://..." 
                         value={nuevoProducto.imagen} onChange={handleChange} />
                </div>
                <div className="mb-3">
                  <label className="form-label">Descripción</label>
                  <textarea className="form-control" name="descripcion" rows="2"
                            value={nuevoProducto.descripcion} onChange={handleChange}></textarea>
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                <button type="submit" className="btn btn-primary">Guardar Producto</button>
              </div>
            </form>
          </div>
        </div>
      </div>

    </div>
  );
}