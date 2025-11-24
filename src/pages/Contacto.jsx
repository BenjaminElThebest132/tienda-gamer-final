import React, { useState } from 'react';

export default function Contacto() {
  // Estado para guardar lo que escribes
  const [form, setForm] = useState({ nombre: '', email: '', mensaje: '' });

  // Función que permite escribir en los inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("¡Mensaje enviado! (Simulación)");
    setForm({ nombre: '', email: '', mensaje: '' }); // Limpiar formulario
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card shadow p-4">
            <h2 className="text-center mb-4 text-primary fw-bold">Contáctanos</h2>
            <p className="text-center text-muted mb-4">¿Tienes dudas sobre tu setup? ¡Escríbenos!</p>
            
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">Nombre</label>
                <input 
                  type="text" 
                  className="form-control" 
                  name="nombre"
                  value={form.nombre} 
                  onChange={handleChange} 
                  placeholder="Tu Gamertag o Nombre"
                  required 
                />
              </div>
              
              <div className="mb-3">
                <label className="form-label">Correo Electrónico</label>
                <input 
                  type="email" 
                  className="form-control" 
                  name="email"
                  value={form.email} 
                  onChange={handleChange} 
                  placeholder="nombre@ejemplo.com"
                  required 
                />
              </div>
              
              <div className="mb-3">
                <label className="form-label">Mensaje</label>
                <textarea 
                  className="form-control" 
                  rows="5"
                  name="mensaje"
                  value={form.mensaje}
                  onChange={handleChange}
                  placeholder="Cuéntanos qué necesitas..."
                  required
                ></textarea>
              </div>

              <div className="d-grid">
                <button type="submit" className="btn btn-success btn-lg">
                  Enviar Mensaje 🚀
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}