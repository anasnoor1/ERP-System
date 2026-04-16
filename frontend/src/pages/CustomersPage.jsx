import { Form, Input } from 'antd';
import CrudPage from '../components/common/CrudPage';

const columns = [
  { title: 'Name', dataIndex: 'name', key: 'name' },
  { title: 'Email', dataIndex: 'email', key: 'email' },
  { title: 'Phone', dataIndex: 'phone', key: 'phone' },
  { title: 'Company', dataIndex: 'company', key: 'company' },
];

const formFields = (
  <>
    <Form.Item name="name" label="Name" rules={[{ required: true }]}><Input /></Form.Item>
    <Form.Item name="email" label="Email" rules={[{ type: 'email' }]}><Input /></Form.Item>
    <Form.Item name="phone" label="Phone"><Input /></Form.Item>
    <Form.Item name="company" label="Company"><Input /></Form.Item>
  </>
);

export default function CustomersPage() {
  return <CrudPage title="Customers" endpoint="/customers" columns={columns} formFields={formFields} />;
}
