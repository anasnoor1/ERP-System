import { Form, Input, Select } from 'antd';
import CrudPage from '../components/common/CrudPage';

const columns = [
  { title: 'Name', dataIndex: 'name', key: 'name' },
  { title: 'Email', dataIndex: 'email', key: 'email' },
  { title: 'Company', dataIndex: 'company', key: 'company' },
  { title: 'Payment Terms', dataIndex: 'paymentTerms', key: 'paymentTerms' },
];

const formFields = (
  <>
    <Form.Item name="name" label="Name" rules={[{ required: true }]}><Input /></Form.Item>
    <Form.Item name="email" label="Email"><Input /></Form.Item>
    <Form.Item name="phone" label="Phone"><Input /></Form.Item>
    <Form.Item name="company" label="Company"><Input /></Form.Item>
    <Form.Item name="paymentTerms" label="Payment Terms">
      <Select options={['Net 15', 'Net 30', 'Net 45', 'Net 60', 'Due on Receipt'].map(t => ({ label: t, value: t }))} />
    </Form.Item>
  </>
);

export default function SuppliersPage() {
  return <CrudPage title="Suppliers" endpoint="/suppliers" columns={columns} formFields={formFields} />;
}
