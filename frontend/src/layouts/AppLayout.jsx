import { useState } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const menuItems = [
  { path: '/', label: 'Dashboard' },
  { path: '/products', label: 'Products' },
  { path: '/customers', label: 'Customers' },
  { path: '/suppliers', label: 'Suppliers' },
  { path: '/sales-orders', label: 'Sales Orders' },
  { path: '/purchase-orders', label: 'Purchase Orders' },
  { path: '/employees', label: 'Employees' },
];

export default function AppLayout() {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="d-flex">
      <div className={`sidebar ${collapsed ? 'collapsed' : ''} ${mobileOpen ? 'show' : ''}`}>
        <div className="d-flex align-items-center justify-content-between px-4 py-3 border-bottom">
          <div className="brand">ERP Manager</div>
          <button className="btn btn-sm btn-outline-secondary d-lg-none" onClick={() => setMobileOpen(false)} aria-label="Close menu">
            ×
          </button>
        </div>
        <nav className="nav flex-column p-3 gap-1">
          {menuItems.map(item => (
            <button
              key={item.path}
              className={`nav-link text-start btn btn-sm ${location.pathname === item.path ? 'active' : 'text-muted'}`}
              onClick={() => { navigate(item.path); setMobileOpen(false); }}
            >
              {item.label}
            </button>
          ))}
        </nav>
      </div>

      <div className="flex-grow-1">
        <header className="topbar d-flex align-items-center justify-content-between px-4">
          <div className="d-flex align-items-center gap-3">
            <button className="btn btn-outline-primary d-lg-none" onClick={() => setMobileOpen(prev => !prev)} aria-label="Toggle menu">
              ☰
            </button>
            <div>
              <h1 className="h5 mb-0">ERP System</h1>
              <small className="text-muted">Operations, inventory, finance and teams in one place</small>
            </div>
          </div>
          <div className="d-flex align-items-center gap-3">
            <div className="text-end d-none d-md-block">
              <div className="fw-semibold">{user?.name || 'Admin'}</div>
              <div className="text-muted small">{user?.role || 'Administrator'}</div>
            </div>
            <button className="btn btn-outline-danger btn-sm" onClick={() => { logout(); navigate('/login'); }}>
              Sign Out
            </button>
          </div>
        </header>

        <main className="page-content">
          <div className="page-content-inner">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
