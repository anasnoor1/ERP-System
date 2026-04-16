import { Tag } from 'antd';
import CrudPage from '../components/common/CrudPage';

const statusColors = { draft: 'default', confirmed: 'blue', processing: 'orange', shipped: 'cyan', delivered: 'green', cancelled: 'red' };
const paymentColors = { unpaid: 'red', partial: 'orange', paid: 'green', refunded: 'purple' };

const columns = [
  { title: 'Order #', dataIndex: 'orderNumber', key: 'orderNumber' },
  { title: 'Customer', dataIndex: ['customer', 'name'], key: 'customer' },
  { title: 'Total', dataIndex: 'total', key: 'total', render: (v) => `$${v?.toLocaleString()}` },
  { title: 'Status', dataIndex: 'status', key: 'status', render: (s) => <Tag color={statusColors[s]}>{s}</Tag> },
  { title: 'Payment', dataIndex: 'paymentStatus', key: 'paymentStatus', render: (s) => <Tag color={paymentColors[s]}>{s}</Tag> },
];

export default function SalesOrdersPage() {
  return <CrudPage title="Sales Orders" endpoint="/sales-orders" columns={columns} formFields={<p>Use the API to create sales orders with line items.</p>} />;
}
