import CrudPage from '../components/common/CrudPage';

const statusClasses = {
  draft: 'bg-secondary',
  confirmed: 'bg-primary',
  processing: 'bg-warning text-dark',
  shipped: 'bg-info text-dark',
  delivered: 'bg-success',
  cancelled: 'bg-danger',
};

const paymentClasses = {
  unpaid: 'bg-danger',
  partial: 'bg-warning text-dark',
  paid: 'bg-success',
  refunded: 'bg-secondary',
};

const columns = [
  { title: 'Order #', dataIndex: 'orderNumber', key: 'orderNumber' },
  { title: 'Customer', dataIndex: ['customer', 'name'], key: 'customer' },
  { title: 'Total', dataIndex: 'total', key: 'total', render: (value) => `$${Number(value || 0).toLocaleString()}` },
  { title: 'Status', dataIndex: 'status', key: 'status', render: (value) => <span className={`badge ${statusClasses[value] || 'bg-secondary'}`}>{value}</span> },
  { title: 'Payment', dataIndex: 'paymentStatus', key: 'paymentStatus', render: (value) => <span className={`badge ${paymentClasses[value] || 'bg-secondary'}`}>{value}</span> },
];

const statuses = ['draft', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled'];
const paymentStatuses = ['unpaid', 'partial', 'paid', 'refunded'];

const formFields = ({ values, onChange }) => (
  <>
    <div className="col-md-6">
      <label className="form-label">Order Number</label>
      <input type="text" className="form-control" value={values.orderNumber || ''} onChange={onChange('orderNumber')} required />
    </div>
    <div className="col-md-6">
      <label className="form-label">Customer Name</label>
      <input type="text" className="form-control" value={values.customer?.name || values.customer || ''} onChange={(event) => {
        const value = event.target.value;
        onChange('customer')({ target: { value: { name: value } } });
      }} />
    </div>
    <div className="col-md-4">
      <label className="form-label">Total</label>
      <input type="number" step="0.01" className="form-control" value={values.total || ''} onChange={onChange('total')} />
    </div>
    <div className="col-md-4">
      <label className="form-label">Status</label>
      <select className="form-select" value={values.status || ''} onChange={onChange('status')}>
        <option value="">Choose status</option>
        {statuses.map((status) => <option key={status} value={status}>{status}</option>)}
      </select>
    </div>
    <div className="col-md-4">
      <label className="form-label">Payment Status</label>
      <select className="form-select" value={values.paymentStatus || ''} onChange={onChange('paymentStatus')}>
        <option value="">Choose payment status</option>
        {paymentStatuses.map((status) => <option key={status} value={status}>{status}</option>)}
      </select>
    </div>
  </>
);

export default function SalesOrdersPage() {
  return <CrudPage title="Sales Orders" endpoint="/sales-orders" columns={columns} formFields={formFields} />;
}
