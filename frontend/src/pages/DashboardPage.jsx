import { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import api from '../services/api';

const COLORS = ['#0d6efd', '#20c997', '#ffc107', '#dc3545', '#6f42c1', '#0dcaf0'];

export default function DashboardPage() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/dashboard/stats').then(({ data }) => setStats(data)).catch(() => {}).finally(() => setLoading(false));
  }, []);

  if (loading) return (
    <div className="spinner-center">
      <div className="spinner-border text-primary" role="status"><span className="visually-hidden">Loading...</span></div>
    </div>
  );

  const statCards = [
    { title: 'Revenue', value: stats?.revenue, prefix: '$', color: 'primary' },
    { title: 'Sales Orders', value: stats?.salesCount, color: 'success' },
    { title: 'Products', value: stats?.totalProducts, color: 'secondary' },
    { title: 'Customers', value: stats?.totalCustomers, color: 'warning' },
    { title: 'Employees', value: stats?.totalEmployees, color: 'info' },
    { title: 'Low Stock', value: stats?.lowStock, color: 'danger' },
  ];

  const badgeForStatus = (status) => {
    const classes = {
      delivered: 'bg-success',
      cancelled: 'bg-danger',
      processing: 'bg-warning text-dark',
      shipped: 'bg-info text-dark',
      received: 'bg-success',
      draft: 'bg-secondary',
    };
    return <span className={`badge ${classes[status] || 'bg-secondary'}`}>{status}</span>;
  };

  return (
    <div className="container">
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center gap-3 mb-4">
        <div>
          <h2 className="h4 mb-1">Business Dashboard</h2>
          <p className="text-muted mb-0">A high-level view of orders, inventory, revenue, and team performance.</p>
        </div>
      </div>

      <div className="row g-3 mb-4">
        {statCards.map((item, index) => (
          <div className="col-12 col-sm-6 col-xl-4" key={index}>
            <div className="card stat-card p-4">
              <div className="d-flex align-items-center justify-content-between mb-3">
                <span className={`badge bg-${item.color} py-2 px-3 text-uppercase small`}>{item.title}</span>
                <span className="text-muted small">Today</span>
              </div>
              <div className="d-flex align-items-end gap-2">
                <h3 className="mb-0">{item.prefix || ''}{item.value?.toLocaleString() ?? 0}</h3>
                <span className={`text-${item.color}`}>↗</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="row g-4 mb-4">
        <div className="col-12 col-xl-6">
          <div className="card card-glow p-4 h-100">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <div>
                <h5 className="mb-1">Monthly Sales</h5>
                <small className="text-muted">Revenue trend over the last months</small>
              </div>
              <span className="badge bg-primary">Revenue</span>
            </div>
            <div style={{ width: '100%', height: 300 }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={stats?.monthlySales?.map(m => ({ month: m._id, revenue: m.total })) || []}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip formatter={(v) => `$${v?.toLocaleString()}`} />
                  <Bar dataKey="revenue" fill="#0d6efd" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
        <div className="col-12 col-xl-6">
          <div className="card card-glow p-4 h-100">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <div>
                <h5 className="mb-1">Top Products</h5>
                <small className="text-muted">Best selling items by quantity</small>
              </div>
              <span className="badge bg-success">Products</span>
            </div>
            <div style={{ width: '100%', height: 300 }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={stats?.topProducts || []} layout="vertical" margin={{ left: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" />
                  <YAxis dataKey="name" type="category" width={120} tick={{ fontSize: 12 }} />
                  <Tooltip formatter={(v) => v?.toLocaleString()} />
                  <Bar dataKey="totalSold" fill="#20c997" radius={[8, 8, 8, 8]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>

      <div className="row g-4">
        <div className="col-12 col-xl-6">
          <div className="card card-glow p-4 h-100">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <div>
                <h5 className="mb-1">Inventory Levels</h5>
                <small className="text-muted">Items that require restocking</small>
              </div>
              <span className="badge bg-warning text-dark">Stock</span>
            </div>
            <div style={{ width: '100%', height: 300 }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={stats?.inventoryData || []} margin={{ left: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" angle={-45} textAnchor="end" height={80} interval={0} />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="quantity" fill="#ffc107" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
        <div className="col-12 col-xl-6">
          <div className="card card-glow p-4 h-100">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <div>
                <h5 className="mb-1">Revenue vs Expenses</h5>
                <small className="text-muted">Financial balance from latest data</small>
              </div>
              <span className="badge bg-info text-dark">Finance</span>
            </div>
            <div style={{ width: '100%', height: 280 }}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={[
                      { name: 'Revenue', value: stats?.revenue || 0 },
                      { name: 'Expenses', value: stats?.expenses || 0 },
                    ]}
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    dataKey="value"
                    label
                  >
                    {[0, 1].map((_, index) => (
                      <Cell key={index} fill={COLORS[index]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => `$${value?.toLocaleString()}`} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
