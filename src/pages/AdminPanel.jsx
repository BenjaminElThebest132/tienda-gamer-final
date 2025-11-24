import React from 'react';
import { Routes, Route, NavLink, Navigate } from 'react-router-dom';
import './AdminPanel.css';

// --- ESTAS SON LAS RUTAS DE IMPORTACIÓN CORRECTAS Y LIMPIAS ---
import { AdminDashboard, AdminOrdenes, AdminUsuarios, AdminCategorias, AdminReportes } from '../components/admin/AdminStubs';
import AdminProductos from '../components/admin/AdminProducto';


export default function AdminPanel() {
  return (
    <div className="d-flex admin-panel-container">
      {/* Sidebar */}
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

      {/* Main Content */}
      <div className="content p-4">
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

