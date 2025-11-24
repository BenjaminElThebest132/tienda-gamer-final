import React from 'react';

// Un componente genérico para no repetir código
const AdminStub = ({ title }) => (
  <div>
    <h2>{title}</h2>
    <hr />
    <div className="alert alert-info">
      <h4 className="alert-heading">En Desarrollo</h4>
      <p>Esta sección del panel de administración está actualmente en construcción.</p>
    </div>
  </div>
);

// Exportamos cada componente de relleno usando el componente genérico
export function AdminDashboard() { return <AdminStub title="Resumen (Dashboard)" />; }
export function AdminOrdenes() { return <AdminStub title="Gestión de Órdenes" />; }
export function AdminUsuarios() { return <AdminStub title="Gestión de Usuarios" />; }
export function AdminCategorias() { return <AdminStub title="Gestión de Categorías" />; }
export function AdminReportes() { return <AdminStub title="Reportes" />; }

