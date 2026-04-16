import { useState, useEffect } from 'react';
import { Row, Col, Card, Statistic, Table, Tag, Typography, Spin } from 'antd';
import { DollarOutlined, ShoppingCartOutlined, InboxOutlined, TeamOutlined, AlertOutlined, RiseOutlined } from '@ant-design/icons';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import api from '../services/api';

const COLORS = ['#1677ff', '#52c41a', '#faad14', '#ff4d4f', '#722ed1', '#13c2c2'];

export default function DashboardPage() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/dashboard/stats').then(({ data }) => setStats(data)).catch(() => {}).finally(() => setLoading(false));
  }, []);

  if (loading) return <Spin size="large" style={{ display: 'block', margin: '100px auto' }} />;

  const statCards = [
    { title: 'Revenue', value: stats?.revenue, prefix: '$', icon: <DollarOutlined />, color: '#1677ff' },
    { title: 'Sales Orders', value: stats?.salesCount, icon: <ShoppingCartOutlined />, color: '#52c41a' },
    { title: 'Products', value: stats?.totalProducts, icon: <InboxOutlined />, color: '#722ed1' },
    { title: 'Customers', value: stats?.totalCustomers, icon: <TeamOutlined />, color: '#faad14' },
    { title: 'Employees', value: stats?.totalEmployees, icon: <RiseOutlined />, color: '#13c2c2' },
    { title: 'Low Stock Alerts', value: stats?.lowStock, icon: <AlertOutlined />, color: '#ff4d4f' },
  ];

  const orderColumns = [
    { title: 'Order #', dataIndex: 'orderNumber', key: 'orderNumber' },
    { title: 'Customer', dataIndex: ['customer', 'name'], key: 'customer' },
    { title: 'Total', dataIndex: 'total', key: 'total', render: (v) => `$${v?.toLocaleString()}` },
    { title: 'Status', dataIndex: 'status', key: 'status', render: (s) => <Tag color={s === 'delivered' ? 'green' : s === 'cancelled' ? 'red' : 'blue'}>{s}</Tag> },
  ];

  return (
    <div>
      <Typography.Title level={3} style={{ marginBottom: 24 }}>Dashboard</Typography.Title>
      <Row gutter={[16, 16]}>
        {statCards.map((s, i) => (
          <Col xs={24} sm={12} lg={8} xl={4} key={i}>
            <Card className="stat-card" style={{ borderTop: `3px solid ${s.color}` }}>
              <Statistic title={s.title} value={s.value || 0} prefix={s.prefix} valueStyle={{ color: s.color }} />
            </Card>
          </Col>
        ))}
      </Row>
      <Row gutter={[16, 16]} style={{ marginTop: 24 }}>
        <Col xs={24} lg={16}>
          <Card title="Recent Sales Orders">
            <Table dataSource={stats?.recentSales || []} columns={orderColumns} pagination={false} rowKey="_id" size="small" />
          </Card>
        </Col>
        <Col xs={24} lg={8}>
          <Card title="Overview">
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie data={[
                  { name: 'Revenue', value: stats?.revenue || 0 },
                  { name: 'Expenses', value: stats?.expenses || 0 },
                ]} cx="50%" cy="50%" outerRadius={80} dataKey="value" label>
                  {[0,1].map((_, i) => <Cell key={i} fill={COLORS[i]} />)}
                </Pie>
                <Tooltip formatter={(v) => `$${v.toLocaleString()}`} />
              </PieChart>
            </ResponsiveContainer>
          </Card>
        </Col>
      </Row>
    </div>
  );
}
