import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // Importar useAuth

export default function Login() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth(); // Usar el hook de autenticación

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Usar la función de login del contexto
      const user = await login(formData.email, formData.password);
      
      // Redirección basada en el rol del usuario
      if (user.role === 'admin') {
        navigate('/admin/dashboard');
      } else {
        navigate('/');
      }
    } catch (err) {
      setError(err.message || 'Correo o contraseña incorrectos.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-dark">
      <div className="card p-4 shadow-lg bg-secondary text-white" style={{ maxWidth: '400px', width: '100%' }}>
        <h2 className="text-center mb-4">🎮 Login Gamer</h2>
        
        <form onSubmit={handleSubmit}>
          {error && <div className="alert alert-danger">{error}</div>}
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
            {loading ? "Conectando..." : "ENTRAR"}
          </button>
        </form>
      </div>
    </div>
  );
}
