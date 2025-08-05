import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FaEnvelope, FaLock } from 'react-icons/fa';

const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // Simulated async login function
  const fakeLogin = ({ email, password }) =>
    new Promise((resolve, reject) => {
      setTimeout(() => {
        if (email === 'user@example.com' && password === 'password') {
          resolve({ name: 'John Doe', email });
        } else {
          reject(new Error('Invalid email or password'));
        }
      }, 1500);
    });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const user = await fakeLogin(formData);
      console.log('Login success:', user);
      setLoading(false);
      // TODO: Save user to Redux or Context here
      navigate('/profile');
    } catch (err) {
      setLoading(false);
      setError(err.message);
    }
  };

  return (
    <div className="container py-5 d-flex justify-content-center align-items-center" style={{ minHeight: '80vh' }}>
      <div className="border p-4 rounded shadow" style={{ width: '100%', maxWidth: 400 }}>
        <h3 className="text-center mb-4 fw-bold">Login to Your Account</h3>

        {error && (
          <div className="alert alert-danger text-center py-2">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email</label>
            <div className="input-group">
              <span className="input-group-text"><FaEnvelope /></span>
              <input
                type="email"
                id="email"
                name="email"
                className="form-control"
                placeholder="user@example.com"
                required
                value={formData.email}
                onChange={handleChange}
                disabled={loading}
              />
            </div>
          </div>

          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <div className="input-group">
              <span className="input-group-text"><FaLock /></span>
              <input
                type="password"
                id="password"
                name="password"
                className="form-control"
                placeholder="••••••••"
                required
                value={formData.password}
                onChange={handleChange}
                disabled={loading}
              />
            </div>
          </div>

          <div className="d-grid mb-2">
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </div>

          <div className="text-center">
            <small>
              Forgot your password? <Link to="/reset-password">Reset it</Link>
            </small>
          </div>

          <div className="text-center mt-3">
            <small>
              Don’t have an account? <Link to="/register">Create one</Link>
            </small>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
