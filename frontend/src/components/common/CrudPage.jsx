import { useState, useMemo } from 'react';
import useCrud from '../../hooks/useCrud';

const getValueByDataIndex = (record, dataIndex) => {
  if (Array.isArray(dataIndex)) {
    return dataIndex.reduce((value, key) => value?.[key], record);
  }
  return record?.[dataIndex];
};

export default function CrudPage({ title, endpoint, columns, formFields, searchPlaceholder = 'Search...' }) {
  const { data, loading, pagination, fetchData, create, update, remove } = useCrud(endpoint);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [search, setSearch] = useState('');
  const [formValues, setFormValues] = useState({});

  const visibleFields = typeof formFields === 'function' ? formFields({ values: formValues, onChange: (field) => (event) => {
    const value = event?.target?.value ?? event;
    setFormValues(prev => ({ ...prev, [field]: value }));
  } }) : formFields;

  const openCreate = () => {
    setEditing(null);
    setFormValues({});
    setModalOpen(true);
  };

  const openEdit = (record) => {
    setEditing(record);
    setFormValues(record);
    setModalOpen(true);
  };

  const handleSubmit = async (event) => {
    event?.preventDefault();
    if (editing) await update(editing._id, formValues);
    else await create(formValues);
    setModalOpen(false);
    setEditing(null);
    setFormValues({});
  };

  const handleSearch = () => {
    fetchData({ search, page: 1 });
  };

  const totalPages = Math.max(1, Math.ceil(pagination.total / pagination.pageSize));

  const rows = useMemo(() => data ?? [], [data]);

  return (
    <div className="container">
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center mb-4 gap-3">
        <div>
          <h2 className="h4 mb-1">{title}</h2>
          <p className="text-muted mb-0">Manage {title.toLowerCase()} records and workflow from one place.</p>
        </div>
        <div className="d-flex gap-2 w-100 w-md-auto">
          <div className="input-group">
            <input type="search" className="form-control" placeholder={searchPlaceholder} value={search} onChange={(e) => setSearch(e.target.value)} />
            <button type="button" className="btn btn-outline-primary" onClick={handleSearch}>Search</button>
          </div>
          <button type="button" className="btn btn-primary" onClick={openCreate}>Add New</button>
        </div>
      </div>

      <div className="table-responsive card card-glow p-3 mb-4">
        <table className="table table-borderless align-middle mb-0">
          <thead className="text-muted small text-uppercase border-bottom">
            <tr>
              {columns.map((column) => <th key={column.key || column.dataIndex}>{column.title}</th>)}
              <th className="text-end">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={columns.length + 1} className="text-center py-5">
                <div className="spinner-border text-primary" role="status"><span className="visually-hidden">Loading...</span></div>
              </td></tr>
            ) : rows.length === 0 ? (
              <tr><td colSpan={columns.length + 1} className="text-center py-5 text-muted">No records available.</td></tr>
            ) : rows.map((record) => (
              <tr key={record._id}>
                {columns.map((column) => (
                  <td key={column.key || column.dataIndex} style={{ minWidth: column.width || 120 }}>
                    {column.render ? column.render(getValueByDataIndex(record, column.dataIndex), record) : (getValueByDataIndex(record, column.dataIndex) ?? '-')}
                  </td>
                ))}
                <td className="text-end">
                  <button className="btn btn-sm btn-outline-secondary me-2" onClick={() => openEdit(record)}>Edit</button>
                  <button className="btn btn-sm btn-outline-danger" onClick={() => {
                    if (window.confirm('Delete this record?')) remove(record._id);
                  }}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <nav className="pagination-custom d-flex justify-content-end">
        <ul className="pagination mb-0">
          <li className={`page-item ${pagination.current === 1 ? 'disabled' : ''}`}>
            <button className="page-link" type="button" onClick={() => fetchData({ page: pagination.current - 1, search })}>Previous</button>
          </li>
          {Array.from({ length: totalPages }, (_, index) => (
            <li key={index} className={`page-item ${pagination.current === index + 1 ? 'active' : ''}`}>
              <button className="page-link" type="button" onClick={() => fetchData({ page: index + 1, search })}>{index + 1}</button>
            </li>
          ))}
          <li className={`page-item ${pagination.current === totalPages ? 'disabled' : ''}`}>
            <button className="page-link" type="button" onClick={() => fetchData({ page: pagination.current + 1, search })}>Next</button>
          </li>
        </ul>
      </nav>

      {modalOpen && (
        <>
          <div className="modal-backdrop-custom" onClick={() => { setModalOpen(false); setEditing(null); }} />
          <div className="modal-custom card p-4 shadow-lg">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <div>
                <h3 className="h5 mb-0">{editing ? `Edit ${title.slice(0, -1)}` : `New ${title.slice(0, -1)}`}</h3>
                <p className="text-muted small mb-0">Fill out the details to {editing ? 'update' : 'create'} this record.</p>
              </div>
              <button type="button" className="btn-close" aria-label="Close" onClick={() => { setModalOpen(false); setEditing(null); }} />
            </div>
            <form onSubmit={handleSubmit} className="row g-3">
              {visibleFields}
              <div className="col-12 d-flex justify-content-end gap-2 mt-3">
                <button type="button" className="btn btn-outline-secondary" onClick={() => { setModalOpen(false); setEditing(null); }}>Cancel</button>
                <button type="submit" className="btn btn-primary">{editing ? 'Save Changes' : 'Create Record'}</button>
              </div>
            </form>
          </div>
        </>
      )}
    </div>
  );
}
