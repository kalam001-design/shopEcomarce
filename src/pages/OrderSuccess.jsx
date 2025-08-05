import React from 'react';
import { Link } from 'react-router-dom';

const OrderSuccess = ({ orderId }) => {
  return (
    <div className="container text-center py-5">
      <h1 className="display-3 text-success mb-4">Thank You!</h1>
      <h3>Your order has been placed successfully.</h3>
      {orderId && (
        <p>
          <strong>Order ID:</strong> {orderId}
        </p>
      )}
      <p>We will process your order and notify you once it ships.</p>
      <div className="d-flex justify-content-center gap-3 mt-4">
        <Link to="/" className="btn btn-primary">
          Continue Shopping
        </Link>
        <Link to="/profile" className="btn btn-secondary">
          View My Orders
        </Link>
      </div>
    </div>
  );
};

export default OrderSuccess;
