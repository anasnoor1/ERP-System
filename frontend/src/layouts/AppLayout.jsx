import { useState } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { Layout, Menu, Avatar, Dropdown, Typography, theme } from 'antd';
import {
  DashboardOutlined, ShoppingCartOutlined, ShopOutlined, TeamOutlined,
  UserOutlined, InboxOutlined, TruckOutlined, LogoutOutlined,
  MenuFoldOutlined, MenuUnfoldOutlined,
} from '@ant-design/icons';
import { useAuth } from '../contexts/AuthContext';

const { Header, Sider, Content } = Layout;

const menuItems = [
  { key: '/', icon: <DashboardOutlined />, label: 'Dashboard' },
  { key: '/products', icon: <InboxOutlined />, label: 'Products' },
  { key: '/customers', icon: <TeamOutlined />, label: 'Customers' },
  { key: '/suppliers', icon: <TruckOutlined />, label: 'Suppliers' },
  { key: '/sales-orders', icon: <ShoppingCartOutlined />, label: 'Sales Orders' },
  { key: '/purchase-orders', icon: <ShopOutlined />, label: 'Purchase Orders' },
  { key: '/employees', icon: <UserOutlined />, label: 'Employees' },
];

export default function AppLayout() {
  const [collapsed, setCollapsed] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { token: { colorBgContainer, borderRadiusLG } } = theme.useToken();

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider trigger={null} collapsible collapsed={collapsed} theme="light"
        style={{ borderRight: '1px solid #f0f0f0' }}>
        <div style={{ height: 64, display: 'flex', alignItems: 'center', justifyContent: 'center', borderBottom: '1px solid #f0f0f0' }}>
          <Typography.Title level={4} style={{ margin: 0, color: '#1677ff' }}>
            {collapsed ? 'E' : 'ERP System'}
          </Typography.Title>
        </div>
        <Menu mode="inline" selectedKeys={[location.pathname]} items={menuItems}
          onClick={({ key }) => navigate(key)} style={{ border: 'none' }} />
      </Sider>
      <Layout>
        <Header style={{ padding: '0 24px', background: colorBgContainer, display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid #f0f0f0' }}>
          {collapsed
            ? <MenuUnfoldOutlined onClick={() => setCollapsed(false)} style={{ fontSize: 18 }} />
            : <MenuFoldOutlined onClick={() => setCollapsed(true)} style={{ fontSize: 18 }} />}
          <Dropdown menu={{ items: [
            { key: 'profile', label: user?.name, disabled: true },
            { key: 'role', label: `Role: ${user?.role}`, disabled: true },
            { type: 'divider' },
            { key: 'logout', icon: <LogoutOutlined />, label: 'Logout', danger: true,
              onClick: () => { logout(); navigate('/login'); } },
          ] }}>
            <Avatar style={{ backgroundColor: '#1677ff', cursor: 'pointer' }}>
              {user?.name?.[0]?.toUpperCase()}
            </Avatar>
          </Dropdown>
        </Header>
        <Content style={{ margin: 24, padding: 24, background: colorBgContainer, borderRadius: borderRadiusLG, overflow: 'auto' }}>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
}
