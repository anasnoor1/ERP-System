import CrudPage from '../components/common/CrudPage';

const statusClasses = {
  draft: 'bg-secondary',
  sent: 'bg-primary',
  confirmed: 'bg-info text-dark',
  received: 'bg-success',
  cancelled: 'bg-danger',
};

const columns = [
  { title: 'Order #', dataIndex: 'orderNumber', key: 'orderNumber' },
  { title: 'Supplier', dataIndex: ['supplier', 'name'], key: 'supplier' },
  { title: 'Total', dataIndex: 'total', key: 'total', render: (value) => `$${Number(value || 0).toLocaleString()}` },
  { title: 'Status', dataIndex: 'status', key: 'status', render: (value) => <span className={`badge ${statusClasses[value] || 'bg-secondary'}`}>{value}</span> },
];

const statuses = ['draft', 'sent', 'confirmed', 'received', 'cancelled'];

const formFields = ({ values, onChange }) => (
  <>
    <div className="col-md-6">
      <label className="form-label">Order Number</label>
      <input type="text" className="form-control" value={values.orderNumber || ''} onChange={onChange('orderNumber')} required />
    </div>
    <div className="col-md-6">
      <label className="form-label">Supplier Name</label>
      <input type="text" className="form-control" value={values.supplier?.name || values.supplier || ''} onChange={(event) => {
        const value = event.target.value;
        onChange('supplier')({ target: { value: { name: value } } });
      }} />
    </div>
    <div className="col-md-6">
      <label className="form-label">Total</label>
      <input type="number" step="0.01" className="form-control" value={values.total || ''} onChange={onChange('total')} />
    </div>
    <div className="col-md-6">
      <label className="form-label">Status</label>
      <select className="form-select" value={values.status || ''} onChange={onChange('status')}>
        <option value="">Choose status</option>
        {statuses.map((status) => <option key={status} value={status}>{status}</option>)}
      </select>
    </div>
  </>
);

export default function PurchaseOrdersPage() {
  return <CrudPage title="Purchase Orders" endpoint="/purchase-orders" columns={columns} formFields={formFields} />;
}
