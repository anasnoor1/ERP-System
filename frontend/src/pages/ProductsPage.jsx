import { Form, Input, InputNumber, Select, Tag } from 'antd';
import CrudPage from '../components/common/CrudPage';

const columns = [
  { title: 'SKU', dataIndex: 'sku', key: 'sku', width: 120 },
  { title: 'Name', dataIndex: 'name', key: 'name' },
  { title: 'Category', dataIndex: 'category', key: 'category', render: (v) => <Tag>{v}</Tag> },
  { title: 'Cost', dataIndex: 'costPrice', key: 'costPrice', render: (v) => `$${v?.toFixed(2)}` },
  { title: 'Price', dataIndex: 'sellingPrice', key: 'sellingPrice', render: (v) => `$${v?.toFixed(2)}` },
  { title: 'Stock', dataIndex: 'quantity', key: 'quantity', render: (v, r) => <Tag color={v <= r.reorderLevel ? 'red' : 'green'}>{v}</Tag> },
];

const formFields = (
  <>
    <Form.Item name="name" label="Product Name" rules={[{ required: true }]}><Input /></Form.Item>
    <Form.Item name="sku" label="SKU" rules={[{ required: true }]}><Input /></Form.Item>
    <Form.Item name="category" label="Category" rules={[{ required: true }]}>
      <Select options={['Electronics', 'Clothing', 'Food', 'Office', 'Other'].map(c => ({ label: c, value: c }))} />
    </Form.Item>
    <Form.Item name="description" label="Description"><Input.TextArea rows={2} /></Form.Item>
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
      <Form.Item name="costPrice" label="Cost Price" rules={[{ required: true }]}><InputNumber min={0} style={{ width: '100%' }} prefix="$" /></Form.Item>
      <Form.Item name="sellingPrice" label="Selling Price" rules={[{ required: true }]}><InputNumber min={0} style={{ width: '100%' }} prefix="$" /></Form.Item>
      <Form.Item name="quantity" label="Quantity"><InputNumber min={0} style={{ width: '100%' }} /></Form.Item>
      <Form.Item name="reorderLevel" label="Reorder Level"><InputNumber min={0} style={{ width: '100%' }} /></Form.Item>
    </div>
  </>
);

export default function ProductsPage() {
  return <CrudPage title="Products" endpoint="/products" columns={columns} formFields={formFields} />;
}
