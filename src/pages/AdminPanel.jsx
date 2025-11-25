import React from 'react';
import { Routes, Route, NavLink, Navigate } from 'react-router-dom';
import './AdminPanel.css';

// 1. COMPONENTES REALES (Los que ya terminamos)
import AdminOrdenes from '../components/admin/AdminOrdenes';
import AdminUsuarios from '../components/admin/AdminUsuarios';
import AdminProductos from '../components/admin/AdminProducto';

// 2. COMPONENTES DE RELLENO (Los que faltan por hacer)
// NOTA: He quitado 'AdminOrdenes' y 'AdminUsuarios' de aquí para evitar el duplicado
import { AdminDashboard, AdminCategorias, AdminReportes } from '../components/admin/AdminStubs';

export default function AdminPanel() {
  return (
    <div className="d-flex admin-panel-container">
      {/* Sidebar - Menú Lateral */}
      <div className="sidebar bg-dark text-white p-3">
        <h4 className="mb-4">Dashboard</h4>
        <ul className="nav nav-pills flex-column">
          <li className="nav-item">
            <NavLink to="/admin/dashboard" className="nav-link text-white">Resumen</NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/admin/productos" className="nav-link text-white">Productos</NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/admin/ordenes" className="nav-link text-white">Órdenes</NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/admin/usuarios" className="nav-link text-white">Usuarios</NavLink>
          </li>
           <li className="nav-item">
            <NavLink to="/admin/categorias" className="nav-link text-white">Categorías</NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/admin/reportes" className="nav-link text-white">Reportes</NavLink>
          </li>
        </ul>
      </div>

      {/* Main Content - Área de Trabajo */}
      <div className="content p-4 w-100">
        <Routes>
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="productos" element={<AdminProductos />} />
          <Route path="ordenes" element={<AdminOrdenes />} />
          <Route path="usuarios" element={<AdminUsuarios />} />
          <Route path="categorias" element={<AdminCategorias />} />
          <Route path="reportes" element={<AdminReportes />} />
          <Route path="*" element={<Navigate to="dashboard" replace />} />
        </Routes>
      </div>
    </div>
  );
}