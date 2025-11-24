import React from 'react';
import { Link } from 'react-router-dom';

export default function Registro() {
  return (
    <div className="container mt-4">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow-sm">
            <div className="card-body p-4">
              <h2 className="text-center mb-4">Crear Nueva Cuenta</h2>
              <fieldset disabled>
                <div className="mb-3">
                  <label className="form-label">Correo Electrónico</label>
                  <input type="email" className="form-control" />
                </div>
                <div className="mb-3">
                  <label className="form-label">Contraseña</label>
                  <input type="password" className="form-control" />
                </div>
                <button type="submit" className="btn btn-primary w-100">Registrarse</button>
              </fieldset>
              <p className="text-center text-muted mt-3">¿Ya tienes cuenta? <Link to="/login">Inicia Sesión</Link></p>
              <p className="text-center text-danger mt-2">Funcionalidad en desarrollo.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
