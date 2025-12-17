import React, { useEffect, useState, useRef } from 'react';
import { db } from '../../api/fakeDB'; // 1. Importar la base de datos local

export default function AdminProducto() {
  const [productos, setProductos] = useState([]);
  const [error, setError] = useState('');
  
  // --- Control del Modal con React State ---
  const [showModal, setShowModal] = useState(false);
  const modalRef = useRef(null);
  
  const [nuevoProducto, setNuevoProducto] = useState({
    title: '',
    price: '',
    stock: '',
    description: '',
    category: 'Varios'
  });

  // Efecto para manejar la visibilidad del modal de forma programática
  useEffect(() => {
    if (!modalRef.current) return;
    const modal = new window.bootstrap.Modal(modalRef.current);
    if (showModal) {
      modal.show();
    } else {
      modal.hide();
    }
  }, [showModal]);

  const cargarProductos = async () => {
    try {
      const data = await db.getAllProducts();
      setProductos(data);
    } catch (err) {
      setError('Error al cargar productos');
    }
  };

  useEffect(() => {
    cargarProductos();
  }, []);

  const eliminarProducto = async (id) => {
    if (!window.confirm("¿Estás seguro de eliminar este producto?")) return;
    try {
      await db.deleteProduct(id);
      setProductos(prevProductos => prevProductos.filter(p => p.id !== id));
      alert("Producto eliminado con éxito.");
    } catch (error) {
      console.error(error);
      alert("Error al eliminar el producto.");
    }
  };

  const handleCrear = async (e) => {
    e.preventDefault();
    try {
      const productData = {
        title: nuevoProducto.title,
        price: parseFloat(nuevoProducto.price),
        stock: parseInt(nuevoProducto.stock, 10),
        description: nuevoProducto.description,
        category: nuevoProducto.category,
      };

      await db.createProduct(productData);
      
      alert("Producto creado con éxito");
      cargarProductos();
      setNuevoProducto({ title: '', price: '', stock: '', description: '', category: 'Varios' });
      setShowModal(false); // Cierra el modal a través del estado

    } catch (error) {
      console.error(error);
      alert("Error de conexión al crear");
    }
  };

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
        
        <button 
          className="btn btn-success fw-bold"
          onClick={() => setShowModal(true)} // Botón ahora controla el estado
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
              <th>Título</th>
              <th>Precio</th>
              <th>Stock</th>
              <th>Categoría</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {productos.map(p => (
              <tr key={p.id}>
                <td>{p.id}</td>
                <td className="fw-bold">{p.title}</td>
                <td>${Number(p.price).toLocaleString('es-CL')}</td>
                <td>
                  <span className={`badge ${p.stock > 5 ? 'bg-success' : 'bg-warning'}`}>
                    {p.stock} u.
                  </span>
                </td>
                <td>{p.category}</td>
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

      {/* --- MODAL DE CREACIÓN --- */}
      <div className="modal fade" ref={modalRef} id="modalCrearProducto" tabIndex="-1" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header bg-dark text-white">
              <h5 className="modal-title">Agregar Nuevo Producto</h5>
              <button type="button" className="btn-close btn-close-white" onClick={() => setShowModal(false)} aria-label="Close"></button>
            </div>
            <form onSubmit={handleCrear}>
              <div className="modal-body">
                <div className="mb-3">
                  <label className="form-label">Título del Producto</label>
                  <input type="text" className="form-control" name="title" required 
                         value={nuevoProducto.title} onChange={handleChange} />
                </div>
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Precio</label>
                    <input type="number" step="0.01" className="form-control" name="price" required 
                           value={nuevoProducto.price} onChange={handleChange} />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Stock</label>
                    <input type="number" className="form-control" name="stock" required 
                           value={nuevoProducto.stock} onChange={handleChange} />
                  </div>
                </div>
                <div className="mb-3">
                  <label className="form-label">Categoría</label>
                  <input type="text" className="form-control" name="category" required
                         value={nuevoProducto.category} onChange={handleChange} />
                </div>
                <div className="mb-3">
                  <label className="form-label">Descripción</label>
                  <textarea className="form-control" name="description" rows="2"
                            value={nuevoProducto.description} onChange={handleChange}></textarea>
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Cancelar</button>
                <button type="submit" className="btn btn-primary">Guardar Producto</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
