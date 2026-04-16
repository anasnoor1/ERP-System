import { Form, Input, Select, DatePicker, InputNumber, Tag } from 'antd';
import CrudPage from '../components/common/CrudPage';

const statusColors = { active: 'green', inactive: 'orange', terminated: 'red' };

const columns = [
  { title: 'ID', dataIndex: 'employeeId', key: 'employeeId', width: 100 },
  { title: 'Name', key: 'name', render: (_, r) => `${r.firstName} ${r.lastName}` },
  { title: 'Department', dataIndex: 'department', key: 'department', render: (v) => <Tag>{v}</Tag> },
  { title: 'Position', dataIndex: 'position', key: 'position' },
  { title: 'Status', dataIndex: 'status', key: 'status', render: (s) => <Tag color={statusColors[s]}>{s}</Tag> },
];

const formFields = (
  <>
    <Form.Item name="employeeId" label="Employee ID" rules={[{ required: true }]}><Input /></Form.Item>
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
      <Form.Item name="firstName" label="First Name" rules={[{ required: true }]}><Input /></Form.Item>
      <Form.Item name="lastName" label="Last Name" rules={[{ required: true }]}><Input /></Form.Item>
    </div>
    <Form.Item name="email" label="Email" rules={[{ required: true, type: 'email' }]}><Input /></Form.Item>
    <Form.Item name="phone" label="Phone"><Input /></Form.Item>
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
      <Form.Item name="department" label="Department" rules={[{ required: true }]}>
        <Select options={['Engineering', 'Sales', 'Marketing', 'HR', 'Finance', 'Operations'].map(d => ({ label: d, value: d }))} />
      </Form.Item>
      <Form.Item name="position" label="Position" rules={[{ required: true }]}><Input /></Form.Item>
    </div>
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
      <Form.Item name="salary" label="Salary"><InputNumber min={0} style={{ width: '100%' }} prefix="$" /></Form.Item>
      <Form.Item name="status" label="Status">
        <Select options={['active', 'inactive', 'terminated'].map(s => ({ label: s, value: s }))} />
      </Form.Item>
    </div>
  </>
);

export default function EmployeesPage() {
  return <CrudPage title="Employees" endpoint="/employees" columns={columns} formFields={formFields} />;
}
