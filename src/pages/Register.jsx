import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { FaUser, FaEnvelope, FaLock } from 'react-icons/fa';

const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setError('❌ Passwords do not match.');
      return;
    }

    try {
      setLoading(true);
      setError(null);
      setSuccess(null);

      const res = await axios.post('/api/users/register', {
        name: formData.name,
        email: formData.email,
        password: formData.password,
      });

      setSuccess('✅ Registration successful! Redirecting...');
      setTimeout(() => navigate('/login'), 1500);
    } catch (err) {
      const message = err.response?.data?.message || '❌ Registration failed.';
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container py-5 d-flex justify-content-center align-items-center" style={{ minHeight: '80vh' }}>
      <div className="border p-4 rounded shadow" style={{ width: '100%', maxWidth: 450 }}>
        <h3 className="text-center fw-bold mb-4">Create Your Account</h3>

        {error && <div className="alert alert-danger text-center">{error}</div>}
        {success && <div className="alert alert-success text-center">{success}</div>}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">Full Name</label>
            <div className="input-group">
              <span className="input-group-text"><FaUser /></span>
              <input
                id="name"
                name="name"
                type="text"
                className="form-control"
                required
                value={formData.name}
                onChange={handleChange}
                placeholder="Your full name"
                disabled={loading}
              />
            </div>
          </div>

          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email</label>
            <div className="input-group">
              <span className="input-group-text"><FaEnvelope /></span>
              <input
                id="email"
                name="email"
                type="email"
                className="form-control"
                required
                value={formData.email}
                onChange={handleChange}
                placeholder="email@example.com"
                disabled={loading}
              />
            </div>
          </div>

          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <div className="input-group">
              <span className="input-group-text"><FaLock /></span>
              <input
                id="password"
                name="password"
                type="password"
                className="form-control"
                required
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter password"
                disabled={loading}
              />
            </div>
          </div>

          <div className="mb-4">
            <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
            <div className="input-group">
              <span className="input-group-text"><FaLock /></span>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                className="form-control"
                required
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Repeat password"
                disabled={loading}
              />
            </div>
          </div>

          <div className="d-grid">
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? 'Registering...' : 'Register'}
            </button>
          </div>
        </form>

        <p className="text-center mt-3">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
