import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromWishlist } from '../redux/wishlistSlice';
import { Modal, Button } from 'react-bootstrap';
import axios from 'axios';

const Profile = () => {
  const [activeTab, setActiveTab] = useState('account');

  const user = useSelector((state) => state.auth.user);
  const wishlistItems = useSelector((state) => state.wishlist.wishlistItems);
  const orders = useSelector((state) => state.order.orders);

  const dispatch = useDispatch();

  const handleRemoveFromWishlist = (id) => {
    dispatch(removeFromWishlist(id));
  };

  // Edit Profile Modal state
  const [showEditModal, setShowEditModal] = useState(false);
  const [editData, setEditData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    password: '',
  });
  const [saving, setSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(null);

  const handleEditChange = (e) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };

  const handleSaveProfile = async () => {
    try {
      setSaving(true);
      setSaveSuccess(null);
      const res = await axios.patch('/api/users/profile', {
        name: editData.name,
        email: editData.email,
        password: editData.password || undefined,
      });
      setSaveSuccess('Profile updated successfully.');
      setShowEditModal(false);
      setSaving(false);
      // Optionally refresh user state here
    } catch (err) {
      console.error('Update failed:', err);
      setSaveSuccess('Failed to update profile.');
      setSaving(false);
    }
  };

  return (
    <div className="container py-5">
      <h2 className="mb-4 fw-bold">👤 My Profile</h2>
      <div className="row">
        {/* Sidebar */}
        <div className="col-md-3 mb-4">
          <div className="list-group">
            {['account', 'wishlist', 'orders'].map((tab) => (
              <button
                key={tab}
                className={`list-group-item list-group-item-action ${activeTab === tab ? 'active fw-bold' : ''}`}
                onClick={() => setActiveTab(tab)}
              >
                {tab === 'account' && '👤 Account'}
                {tab === 'wishlist' && '❤️ Wishlist'}
                {tab === 'orders' && '📦 Orders'}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="col-md-9">
          {activeTab === 'account' && (
            <div>
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h4>👤 Account Details</h4>
                {user && (
                  <button className="btn btn-outline-primary btn-sm" onClick={() => setShowEditModal(true)}>
                    ✏️ Edit Profile
                  </button>
                )}
              </div>
              {user ? (
                <div className="border rounded p-3 bg-light">
                  <p><strong>Name:</strong> {user.name}</p>
                  <p><strong>Email:</strong> {user.email}</p>
                </div>
              ) : (
                <div className="alert alert-warning">Please log in to view your profile.</div>
              )}
            </div>
          )}

          {activeTab === 'wishlist' && (
            <div>
              <h4 className="mb-3">❤️ Wishlist</h4>
              {wishlistItems.length === 0 ? (
                <div className="alert alert-info">Your wishlist is empty.</div>
              ) : (
                <div className="row">
                  {wishlistItems.map((item) => (
                    <div key={item.id} className="col-sm-6 col-md-4 mb-4">
                      <div className="card h-100 border shadow-sm">
                        <img src={item.image} className="card-img-top" alt={item.title} />
                        <div className="card-body d-flex flex-column">
                          <h6 className="card-title">{item.title}</h6>
                          <p className="card-text mb-2 fw-semibold">৳{item.price}</p>
                          <button
                            className="btn btn-outline-danger btn-sm mt-auto"
                            onClick={() => handleRemoveFromWishlist(item.id)}
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === 'orders' && (
            <div>
              <h4 className="mb-3">📦 Order History</h4>
              {orders.length === 0 ? (
                <div className="alert alert-info">No orders found.</div>
              ) : (
                <div className="table-responsive">
                  <table className="table table-bordered table-hover">
                    <thead className="table-light">
                      <tr>
                        <th>#</th>
                        <th>Order ID</th>
                        <th>Total</th>
                        <th>Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {orders.map((order, index) => (
                        <tr key={order._id}>
                          <td>{index + 1}</td>
                          <td>{order._id}</td>
                          <td>৳{order.total}</td>
                          <td>{new Date(order.date).toLocaleDateString()}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Edit Profile Modal */}
      <Modal show={showEditModal} onHide={() => setShowEditModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Edit Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <div className="mb-3">
              <label className="form-label">Name</label>
              <input
                type="text"
                name="name"
                className="form-control"
                value={editData.name}
                onChange={handleEditChange}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Email</label>
              <input
                type="email"
                name="email"
                className="form-control"
                value={editData.email}
                onChange={handleEditChange}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">New Password (optional)</label>
              <input
                type="password"
                name="password"
                className="form-control"
                value={editData.password}
                onChange={handleEditChange}
              />
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowEditModal(false)}>Cancel</Button>
          <Button variant="primary" onClick={handleSaveProfile} disabled={saving}>
            {saving ? 'Saving...' : 'Save Changes'}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Profile;
