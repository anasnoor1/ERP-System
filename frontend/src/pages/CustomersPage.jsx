import CrudPage from '../components/common/CrudPage';

const columns = [
  { title: 'Name', dataIndex: 'name', key: 'name' },
  { title: 'Email', dataIndex: 'email', key: 'email' },
  { title: 'Phone', dataIndex: 'phone', key: 'phone' },
  { title: 'Company', dataIndex: 'company', key: 'company' },
];

const formFields = ({ values, onChange }) => (
  <>
    <div className="col-md-6">
      <label className="form-label">Name</label>
      <input type="text" className="form-control" value={values.name || ''} onChange={onChange('name')} required />
    </div>
    <div className="col-md-6">
      <label className="form-label">Email</label>
      <input type="email" className="form-control" value={values.email || ''} onChange={onChange('email')} />
    </div>
    <div className="col-md-6">
      <label className="form-label">Phone</label>
      <input type="tel" className="form-control" value={values.phone || ''} onChange={onChange('phone')} />
    </div>
    <div className="col-md-6">
      <label className="form-label">Company</label>
      <input type="text" className="form-control" value={values.company || ''} onChange={onChange('company')} />
    </div>
  </>
);

export default function CustomersPage() {
  return <CrudPage title="Customers" endpoint="/customers" columns={columns} formFields={formFields} />;
}
