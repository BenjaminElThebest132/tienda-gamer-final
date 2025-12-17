import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { db } from '../api/fakeDB';

export default function Registro() {
  const [form, setForm] = useState({ nombre: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [cargando, setCargando] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setCargando(true);

    if (!form.email || !form.password) {
      setError("El correo y la contraseña son obligatorios.");
      setCargando(false);
      return;
    }

    try {
      // Usamos el email del formulario como 'username' para la BD simulada
      await db.createUser({ username: form.email, password: form.password });
      alert("¡Cuenta creada con éxito! Ahora puedes iniciar sesión.");
      navigate('/login');
    } catch (err) {
      setError(err.message || "Error al registrarse.");
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow p-4">
            <h2 className="text-center mb-4 text-primary">Crear Nueva Cuenta</h2>
            
            <form onSubmit={handleSubmit}>
              {}
              <div className="mb-3">
                <label className="form-label">Nombre Completo</label>
                <input 
                  type="text" 
                  className="form-control" 
                  name="nombre"
                  value={form.nombre}
                  onChange={handleChange}
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
                  required 
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Contraseña</label>
                <input 
                  type="password" 
                  className="form-control" 
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  required 
                />
              </div>

              {error && <div className="alert alert-danger">{error}</div>}

              <button type="submit" className="btn btn-primary w-100" disabled={cargando}>
                {cargando ? 'Registrando...' : 'Registrarse'}
              </button>
            </form>

            <p className="text-center text-muted mt-3">
              ¿Ya tienes cuenta? <Link to="/login">Inicia Sesión</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}