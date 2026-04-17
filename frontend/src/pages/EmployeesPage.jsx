import CrudPage from '../components/common/CrudPage';

const statusBadges = {
  active: 'bg-success',
  inactive: 'bg-warning text-dark',
  terminated: 'bg-danger',
};

const columns = [
  { title: 'ID', dataIndex: 'employeeId', key: 'employeeId', width: 100 },
  { title: 'Name', key: 'name', render: (_, record) => `${record.firstName || ''} ${record.lastName || ''}` },
  { title: 'Department', dataIndex: 'department', key: 'department', render: (value) => <span className="badge bg-secondary">{value}</span> },
  { title: 'Position', dataIndex: 'position', key: 'position' },
  { title: 'Status', dataIndex: 'status', key: 'status', render: (value) => <span className={`badge ${statusBadges[value] || 'bg-secondary'}`}>{value}</span> },
];

const departments = ['Engineering', 'Sales', 'Marketing', 'HR', 'Finance', 'Operations'];
const statuses = ['active', 'inactive', 'terminated'];

const formFields = ({ values, onChange }) => (
  <>
    <div className="col-md-4">
      <label className="form-label">Employee ID</label>
      <input type="text" className="form-control" value={values.employeeId || ''} onChange={onChange('employeeId')} required />
    </div>
    <div className="col-md-4">
      <label className="form-label">First Name</label>
      <input type="text" className="form-control" value={values.firstName || ''} onChange={onChange('firstName')} required />
    </div>
    <div className="col-md-4">
      <label className="form-label">Last Name</label>
      <input type="text" className="form-control" value={values.lastName || ''} onChange={onChange('lastName')} required />
    </div>
    <div className="col-md-6">
      <label className="form-label">Email</label>
      <input type="email" className="form-control" value={values.email || ''} onChange={onChange('email')} required />
    </div>
    <div className="col-md-6">
      <label className="form-label">Phone</label>
      <input type="tel" className="form-control" value={values.phone || ''} onChange={onChange('phone')} />
    </div>
    <div className="col-md-6">
      <label className="form-label">Department</label>
      <select className="form-select" value={values.department || ''} onChange={onChange('department')} required>
        <option value="">Select department</option>
        {departments.map((department) => <option key={department} value={department}>{department}</option>)}
      </select>
    </div>
    <div className="col-md-6">
      <label className="form-label">Position</label>
      <input type="text" className="form-control" value={values.position || ''} onChange={onChange('position')} required />
    </div>
    <div className="col-md-6">
      <label className="form-label">Salary</label>
      <input type="number" step="0.01" className="form-control" value={values.salary || ''} onChange={onChange('salary')} />
    </div>
    <div className="col-md-6">
      <label className="form-label">Status</label>
      <select className="form-select" value={values.status || ''} onChange={onChange('status')}>
        <option value="">Select status</option>
        {statuses.map((status) => <option key={status} value={status}>{status}</option>)}
      </select>
    </div>
  </>
);

export default function EmployeesPage() {
  return <CrudPage title="Employees" endpoint="/employees" columns={columns} formFields={formFields} />;
}
