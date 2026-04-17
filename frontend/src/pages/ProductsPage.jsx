import CrudPage from '../components/common/CrudPage';

const columns = [
  { title: 'SKU', dataIndex: 'sku', key: 'sku', width: 120 },
  { title: 'Name', dataIndex: 'name', key: 'name' },
  { title: 'Category', dataIndex: 'category', key: 'category', render: (value) => <span className="badge bg-secondary">{value}</span> },
  { title: 'Cost', dataIndex: 'costPrice', key: 'costPrice', render: (value) => `$${Number(value || 0).toFixed(2)}` },
  { title: 'Price', dataIndex: 'sellingPrice', key: 'sellingPrice', render: (value) => `$${Number(value || 0).toFixed(2)}` },
  { title: 'Stock', dataIndex: 'quantity', key: 'quantity', render: (value, record) => (
      <span className={`badge ${value <= record.reorderLevel ? 'bg-danger' : 'bg-success'}`}>{value}</span>
    ) },
];

const categories = ['Electronics', 'Clothing', 'Food', 'Office', 'Other'];

const formFields = ({ values, onChange }) => (
  <>
    <div className="col-md-6">
      <label className="form-label">Product Name</label>
      <input type="text" className="form-control" value={values.name || ''} onChange={onChange('name')} required />
    </div>
    <div className="col-md-6">
      <label className="form-label">SKU</label>
      <input type="text" className="form-control" value={values.sku || ''} onChange={onChange('sku')} required />
    </div>
    <div className="col-md-6">
      <label className="form-label">Category</label>
      <select className="form-select" value={values.category || ''} onChange={onChange('category')} required>
        <option value="">Choose category</option>
        {categories.map((category) => <option key={category} value={category}>{category}</option>)}
      </select>
    </div>
    <div className="col-md-6">
      <label className="form-label">Description</label>
      <textarea className="form-control" rows={2} value={values.description || ''} onChange={onChange('description')} />
    </div>
    <div className="col-md-3">
      <label className="form-label">Cost Price</label>
      <input type="number" step="0.01" className="form-control" value={values.costPrice || ''} onChange={onChange('costPrice')} />
    </div>
    <div className="col-md-3">
      <label className="form-label">Selling Price</label>
      <input type="number" step="0.01" className="form-control" value={values.sellingPrice || ''} onChange={onChange('sellingPrice')} />
    </div>
    <div className="col-md-3">
      <label className="form-label">Quantity</label>
      <input type="number" className="form-control" value={values.quantity || ''} onChange={onChange('quantity')} />
    </div>
    <div className="col-md-3">
      <label className="form-label">Reorder Level</label>
      <input type="number" className="form-control" value={values.reorderLevel || ''} onChange={onChange('reorderLevel')} />
    </div>
  </>
);

export default function ProductsPage() {
  return <CrudPage title="Products" endpoint="/products" columns={columns} formFields={formFields} />;
}
