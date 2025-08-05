import React, { useState } from 'react';
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Image,
  InputGroup,
  Alert,
} from 'react-bootstrap';
import { useSelector } from 'react-redux';

const CheckoutPage = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const [formData, setFormData] = useState({
    phone: '',
    name: '',
    email: '',
    address: '',
    deliveryType: 'INSIDE DHAKA',
    paymentMethod: 'cod',
    onlineGateway: '',
    coupon: '',
    note: '',
    agree: false,
  });

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const itemCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const shipping = formData.deliveryType === 'OUTSIDE DHAKA' ? 130 : 70;
  const total = subtotal + shipping;

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.agree) {
      alert('Please agree to the terms & conditions.');
      return;
    }

    console.log('Order Submitted:', formData);
    alert('Order placed successfully!');
  };

  return (
    <Container className="py-4">
      <Row>
        {/* Left: Shipping & Payment Form */}
        <Col md={8}>
          <h5 className="mb-3">Shipping Details</h5>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Your Phone *</Form.Label>
              <Form.Control
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                placeholder="Enter your phone number"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Your Name *</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="Enter your full name"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Email Address (Optional)</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email address"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Your Address *</Form.Label>
              <Form.Control
                as="textarea"
                rows={2}
                name="address"
                value={formData.address}
                onChange={handleChange}
                required
                placeholder="Enter your address"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Delivery Type *</Form.Label>
              <div>
                <Form.Check
                  inline
                  label="INSIDE DHAKA"
                  name="deliveryType"
                  type="radio"
                  value="INSIDE DHAKA"
                  checked={formData.deliveryType === 'INSIDE DHAKA'}
                  onChange={handleChange}
                />
                <Form.Check
                  inline
                  label="OUTSIDE DHAKA"
                  name="deliveryType"
                  type="radio"
                  value="OUTSIDE DHAKA"
                  checked={formData.deliveryType === 'OUTSIDE DHAKA'}
                  onChange={handleChange}
                />
              </div>
            </Form.Group>

            <h5 className="mt-4">Select Payment</h5>
            <Form.Check
              type="radio"
              label="Cash on Delivery"
              name="paymentMethod"
              value="cod"
              checked={formData.paymentMethod === 'cod'}
              onChange={handleChange}
              inline
            />
            <Form.Check
              type="radio"
              label="Online Payment"
              name="paymentMethod"
              value="online"
              checked={formData.paymentMethod === 'online'}
              onChange={handleChange}
              inline
            />

            {/* COD Image */}
            {formData.paymentMethod === 'cod' && (
              <Image
                src="/src/assets/icons/cod.png"
                width={180}
                className="mt-3"
                alt="Cash on Delivery"
              />
            )}

            {/* Online Payment Gateway */}
            {formData.paymentMethod === 'online' && (
              <div className="mt-3">
                <Form.Check
                  type="radio"
                  id="bkash"
                  name="onlineGateway"
                  label={
                    <div className="d-flex align-items-center gap-2">
                      <Image src="/src/assets/icons/bkash.png" height={50} alt="Bkash" />
                    </div>
                  }
                  value="bkash"
                  onChange={handleChange}
                  checked={formData.onlineGateway === 'bkash'}
                />
                <Form.Check
                  type="radio"
                  id="ssl"
                  name="onlineGateway"
                  label={
                    <div className="d-flex align-items-center gap-2 mt-2">
                      <Image src="/src/assets/icons/ssl.png" height={40} alt="SSLCommerz" />
                    </div>
                  }
                  value="ssl"
                  onChange={handleChange}
                  checked={formData.onlineGateway === 'ssl'}
                />
              </div>
            )}
          </Form>
        </Col>

        {/* Right: Order Summary */}
        <Col md={4}>
          <div className="bg-light p-3 rounded shadow-sm">
            <h5>Order Summary</h5>

            {/* ✅ Free Delivery Alert */}
            {itemCount >= 3 && (
              <Alert variant="success" className="fw-semibold text-center">
                🎁 You've unlocked <strong>FREE DELIVERY</strong> by ordering 3 or more items!
              </Alert>
            )}

            {cartItems.map((item) => (
              <div key={item.id} className="d-flex justify-content-between align-items-start mb-2">
                <div className="d-flex gap-2">
                  <Image src={item.image} width={40} height={40} rounded />
                  <div>
                    <small>{item.name}</small>
                    <br />
                    <small className="text-muted">Size: {item.size}</small>
                  </div>
                </div>
                <div>BDT {item.price * item.quantity}</div>
              </div>
            ))}

            <div className="border-top pt-2 mt-2">
              <div className="d-flex justify-content-between">
                <small>Subtotal</small>
                <small>BDT {subtotal}</small>
              </div>

              <Form.Group className="my-2">
                <InputGroup>
                  <Form.Control
                    type="text"
                    name="coupon"
                    value={formData.coupon}
                    onChange={handleChange}
                    placeholder="Enter your code"
                  />
                  <Button variant="outline-secondary">Apply</Button>
                </InputGroup>
              </Form.Group>

              <div className="d-flex justify-content-between">
                <small>Shipping</small>
                <small>BDT {shipping}</small>
              </div>

              <div className="d-flex justify-content-between fw-bold mt-2">
                <span>TOTAL</span>
                <span>BDT {total}</span>
              </div>

              <Form.Group className="mt-2">
                <Form.Control
                  as="textarea"
                  rows={2}
                  name="note"
                  placeholder="Order Note"
                  value={formData.note}
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Group className="mt-3">
                <Form.Check
                  type="checkbox"
                  name="agree"
                  label={
                    <>
                      I agree to the{' '}
                      <a href="/terms-conditions" target="_blank" rel="noreferrer">
                        Terms & Conditions
                      </a>{' '}
                      and{' '}
                      <a href="/privacy-policy" target="_blank" rel="noreferrer">
                        Privacy Policy
                      </a>
                    </>
                  }
                  checked={formData.agree}
                  onChange={handleChange}
                />
              </Form.Group>

              <Button
                type="submit"
                variant="info"
                className="w-100 text-white mt-3"
                onClick={handleSubmit}
              >
                Confirm Order
              </Button>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default CheckoutPage;
