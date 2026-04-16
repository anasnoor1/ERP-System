import { Tag } from 'antd';
import CrudPage from '../components/common/CrudPage';

const statusColors = { draft: 'default', sent: 'blue', confirmed: 'cyan', received: 'green', cancelled: 'red' };

const columns = [
  { title: 'Order #', dataIndex: 'orderNumber', key: 'orderNumber' },
  { title: 'Supplier', dataIndex: ['supplier', 'name'], key: 'supplier' },
  { title: 'Total', dataIndex: 'total', key: 'total', render: (v) => `$${v?.toLocaleString()}` },
  { title: 'Status', dataIndex: 'status', key: 'status', render: (s) => <Tag color={statusColors[s]}>{s}</Tag> },
];

export default function PurchaseOrdersPage() {
  return <CrudPage title="Purchase Orders" endpoint="/purchase-orders" columns={columns} formFields={<p>Use the API to create purchase orders with line items.</p>} />;
}
