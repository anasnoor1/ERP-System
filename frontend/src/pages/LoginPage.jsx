import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function LoginPage() {
  const [values, setValues] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const onChange = (field) => (event) => {
    setValues(prev => ({ ...prev, [field]: event.target.value }));
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError('');
    try {
      await login(values.email, values.password);
      navigate('/');
    } catch {
      setError('Invalid credentials, please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="d-flex align-items-center justify-content-center" style={{ minHeight: '100vh', background: 'radial-gradient(circle at top, rgba(59,130,246,0.16), transparent 40%), linear-gradient(135deg, #eef2ff 0%, #f8fafc 100%)' }}>
      <div className="card shadow-lg rounded-4" style={{ width: '100%', maxWidth: 420, border: '1px solid rgba(15,23,42,0.08)' }}>
        <div className="card-body p-5">
          <div className="text-center mb-4">
            <h2 className="h4 fw-semibold">ERP Manager</h2>
            <p className="text-muted mb-0">Secure sign in to manage orders, inventory, and people.</p>
          </div>
          {error && <div className="alert alert-danger py-2">{error}</div>}
          <form onSubmit={onSubmit} className="mb-3">
            <div className="mb-3">
              <label className="form-label">Email</label>
              <input type="email" className="form-control form-control-lg" placeholder="admin@erp.com" value={values.email} onChange={onChange('email')} required />
            </div>
            <div className="mb-4">
              <label className="form-label">Password</label>
              <input type="password" className="form-control form-control-lg" placeholder="Enter your password" value={values.password} onChange={onChange('password')} required />
            </div>
            <button type="submit" className="btn btn-primary btn-lg w-100" disabled={loading}>
              {loading ? <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true" /> : null}
              Sign In
            </button>
          </form>
          <div className="text-center text-muted small">
            Default credentials: <strong>admin@erp.com</strong> / <strong>Admin@123</strong>
          </div>
        </div>
      </div>
    </div>
  );
}
