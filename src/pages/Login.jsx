import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false); // Para mostrar que está cargando
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Activamos estado de carga
    
    // 1. SOLUCIÓN MAYÚSCULAS: Forzamos minúsculas antes de enviar
    const datosLogin = {
        email: formData.email.toLowerCase().trim(), // "Admin" -> "admin"
        password: formData.password
    };

    try {
      // 2. PETICIÓN AL SERVIDOR
      const response = await fetch('https://tienda-gamer-final.onrender.com/api/usuarios/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(datosLogin)
      });

      // Verificación de seguridad por si el servidor devuelve error HTML (común en Render)
      const contentType = response.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        throw new Error("El servidor está despertando... espera 30 seg e intenta de nuevo.");
      }

      const data = await response.json();

      if (response.ok) {
        // Guardamos usuario
        localStorage.setItem('usuario', JSON.stringify(data.usuario || data));
        
        // 3. REDIRECCIÓN
        if (datosLogin.email === 'admin@tienda.com') {
          window.location.href = '/admin/dashboard'; // Forzamos recarga hacia admin
        } else {
          window.location.href = '/'; // Forzamos recarga hacia home
        }
      } else {
        alert(data.message || "Correo o contraseña incorrectos");
      }
    } catch (error) {
      console.error(error);
      // Mensaje explicativo para ti y el profesor
      alert("Error de conexión: Es probable que el servidor de Render esté 'despertando'. Espera 30 segundos y vuelve a dar clic en Entrar.");
    } finally {
      setLoading(false); // Desactivamos carga
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-dark">
      <div className="card p-4 shadow-lg bg-secondary text-white" style={{ maxWidth: '400px', width: '100%' }}>
        <h2 className="text-center mb-4">🎮 Login Gamer</h2>
        
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input 
              type="email" 
              name="email" 
              className="form-control" 
              value={formData.email} 
              onChange={handleChange} 
              placeholder="admin@tienda.com"
              required 
            />
          </div>
          
          <div className="mb-3">
            <label className="form-label">Contraseña</label>
            <input 
              type="password" 
              name="password" 
              className="form-control" 
              value={formData.password} 
              onChange={handleChange} 
              required 
            />
          </div>
          
          <button type="submit" className="btn btn-primary w-100 fw-bold" disabled={loading}>
            {loading ? "Conectando con servidor..." : "ENTRAR"}
          </button>
        </form>
      </div>
    </div>
  );
}