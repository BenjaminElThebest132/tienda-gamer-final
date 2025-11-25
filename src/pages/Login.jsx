import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Conexión con tu Backend
    try {
      const response = await fetch('https://tienda-gamer-final.onrender.com/api/usuarios/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (response.ok) {
        // Guardamos usuario
        localStorage.setItem('usuario', JSON.stringify(data.usuario || data));
        
        // --- AQUÍ ESTÁ LA LÓGICA SIMPLE ---
        if (formData.email === 'admin@tienda.com') {
          // Si es admin, AL PANEL DIRECTO
          window.location.href = '/admin/dashboard'; 
        } else {
          // Si es normal, AL HOME
          navigate('/');
        }
      } else {
        alert("Credenciales incorrectas");
      }
    } catch (error) {
      console.error(error);
      alert("Error de conexión con el servidor");
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-dark">
      <div className="card p-4 shadow-lg bg-secondary text-white" style={{ maxWidth: '400px', width: '100%' }}>
        <h2 className="text-center mb-4">🎮 Login Gamer</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label>Email</label>
            <input 
              type="email" 
              name="email" 
              className="form-control" 
              value={formData.email} 
              onChange={handleChange} 
              required 
            />
          </div>
          <div className="mb-3">
            <label>Contraseña</label>
            <input 
              type="password" 
              name="password" 
              className="form-control" 
              value={formData.password} 
              onChange={handleChange} 
              required 
            />
          </div>
          <button type="submit" className="btn btn-primary w-100 fw-bold">
            ENTRAR
          </button>
        </form>
      </div>
    </div>
  );
}