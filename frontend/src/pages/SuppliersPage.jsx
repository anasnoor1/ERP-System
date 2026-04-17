import CrudPage from '../components/common/CrudPage';

const columns = [
  { title: 'Name', dataIndex: 'name', key: 'name' },
  { title: 'Email', dataIndex: 'email', key: 'email' },
  { title: 'Company', dataIndex: 'company', key: 'company' },
  { title: 'Payment Terms', dataIndex: 'paymentTerms', key: 'paymentTerms' },
];

const paymentTerms = ['Net 15', 'Net 30', 'Net 45', 'Net 60', 'Due on Receipt'];

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
    <div className="col-md-6">
      <label className="form-label">Payment Terms</label>
      <select className="form-select" value={values.paymentTerms || ''} onChange={onChange('paymentTerms')}>
        <option value="">Select terms</option>
        {paymentTerms.map(term => <option key={term} value={term}>{term}</option>)}
      </select>
    </div>
  </>
);

export default function SuppliersPage() {
  return <CrudPage title="Suppliers" endpoint="/suppliers" columns={columns} formFields={formFields} />;
}
