// src/pages/Login.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  // 1. Cambiamos 'username' por 'email' para que coincida con la base de datos
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [cargando, setCargando] = useState(false); // Para deshabilitar el botón mientras piensa
  const navigate = useNavigate();

  const handle = async (e) => {
    e.preventDefault();
    setError('');
    setCargando(true); // Activamos modo "pensando"

    try {
      // 2. CONEXIÓN REAL AL BACKEND
      const response = await fetch('https://tienda-gamer-final.onrender.com/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email: form.email,
            password: form.password
        })
      });

      const data = await response.json();

      // 3. Si la respuesta es exitosa (Status 200)
      if (response.ok) {
        // Guardamos al usuario en el navegador para recordar que inició sesión
        localStorage.setItem('usuario', JSON.stringify(data.usuario));
        
        // Redirigimos al panel de administración
        navigate('/admin/dashboard'); 
      } else {
        // 4. Si hay error (ej: "Contraseña incorrecta"), lo mostramos
        setError(data.error || 'Error al iniciar sesión');
      }

    } catch (err) {
      setError('No se pudo conectar con el servidor. Revisa si el Backend está encendido.');
    } finally {
      setCargando(false); // Apagamos modo "pensando"
    }
  };

  return (
    <div className="container mt-5">
      <div className="col-md-6 offset-md-3">
        <div className="card shadow p-4">
            <h2 className="text-center mb-4">Iniciar Sesión</h2>
            
            <form onSubmit={handle}>
            <div className="mb-3">
                <label className="form-label">Correo Electrónico</label>
                <input 
                    type="email" 
                    className="form-control" 
                    value={form.email} 
                    onChange={e => setForm({...form, email: e.target.value})} 
                    placeholder="ejemplo@correo.com"
                    required 
                />
            </div>
            
            <div className="mb-3">
                <label className="form-label">Contraseña</label>
                <input 
                    type="password" 
                    className="form-control" 
                    value={form.password} 
                    onChange={e => setForm({...form, password: e.target.value})} 
                    required 
                />
            </div>

            {error && <div className="alert alert-danger text-center">{error}</div>}

            <div className="d-grid">
                <button className="btn btn-primary" disabled={cargando}>
                    {cargando ? 'Verificando...' : 'Entrar'}
                </button>
            </div>
            </form>
        </div>
      </div>
    </div>
  );
}