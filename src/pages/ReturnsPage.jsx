import React, { useState } from 'react';
import { Container, Card, ListGroup, Form, Button, Alert } from 'react-bootstrap';

const ReturnsPage = () => {
  const [formData, setFormData] = useState({
    orderNumber: '',
    email: '',
    reason: '',
    details: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    // Simulate API call delay
    setTimeout(() => {
      console.log('Return request submitted:', formData);
      setSubmitted(true);
      setLoading(false);
      setFormData({ orderNumber: '', email: '', reason: '', details: '' });
    }, 1500);
  };

  return (
    <Container className="my-5" style={{ maxWidth: 800 }}>
      <h1 className="mb-4 fw-bold text-center" style={{ color: '#FF6F00' }}>
        Returns & Exchanges Policy
      </h1>

      <Card className="shadow-sm mb-5">
        <Card.Body>
          <p>
            At Royel Attire, we want you to be completely satisfied with your purchase.
            If for any reason you are not happy, we offer a straightforward returns and exchanges process.
          </p>

          <h4 className="mt-4" style={{ color: '#FF6F00' }}>
            Eligibility for Returns
          </h4>
          <ul>
            <li>Returns are accepted within 7 days from the date of delivery.</li>
            <li>Items must be in their original condition, unused, unwashed, with tags attached.</li>
            <li>Certain products like undergarments and personalized items cannot be returned.</li>
          </ul>

          <h4 className="mt-4" style={{ color: '#FF6F00' }}>
            How to Initiate a Return or Exchange
          </h4>
          <ol>
            <li>Contact our customer support via email or phone with your order details.</li>
            <li>We will provide you with the return authorization and instructions.</li>
            <li>Pack the item securely and ship it back within 5 days.</li>
            <li>Once we receive and inspect the item, we will process your refund or exchange.</li>
          </ol>

          <h4 className="mt-4" style={{ color: '#FF6F00' }}>
            Refund Process
          </h4>
          <p>
            Refunds will be issued to the original payment method within 7 business days after approval.
            Shipping fees are non-refundable.
          </p>

          <h4 className="mt-4" style={{ color: '#FF6F00' }}>
            Return Shipping Costs
          </h4>
          <p>
            Return shipping costs are the responsibility of the customer unless the item was defective or incorrect.
          </p>

          <h4 className="mt-4" style={{ color: '#FF6F00' }}>
            Frequently Asked Questions
          </h4>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <strong>Can I exchange an item for a different size?</strong>
              <br />
              Yes, you can request an exchange by contacting our support within the return period.
            </ListGroup.Item>
            <ListGroup.Item>
              <strong>What if my item is defective?</strong>
              <br />
              Please contact us immediately with photos and details; we will arrange a return or replacement.
            </ListGroup.Item>
            <ListGroup.Item>
              <strong>How do I track my return shipment?</strong>
              <br />
              Use the tracking number provided by your shipping service. We recommend using a trackable method.
            </ListGroup.Item>
          </ListGroup>
        </Card.Body>
      </Card>

      {/* Return Request Form */}
      <Card className="shadow-sm">
        <Card.Body>
          <h3 className="mb-4" style={{ color: '#FF6F00' }}>
            Submit a Return Request
          </h3>

          {submitted && (
            <Alert variant="success" onClose={() => setSubmitted(false)} dismissible>
              Your return request has been submitted successfully. Our support team will contact you soon.
            </Alert>
          )}

          <Form onSubmit={handleSubmit} noValidate>
            <Form.Group className="mb-3" controlId="orderNumber">
              <Form.Label>Order Number</Form.Label>
              <Form.Control
                type="text"
                name="orderNumber"
                value={formData.orderNumber}
                onChange={handleChange}
                required
                placeholder="Enter your order number"
                disabled={loading}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="email">
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="Enter your email"
                disabled={loading}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="reason">
              <Form.Label>Reason for Return or Exchange</Form.Label>
              <Form.Select
                name="reason"
                value={formData.reason}
                onChange={handleChange}
                required
                disabled={loading}
              >
                <option value="">Select a reason</option>
                <option value="wrong-size">Wrong Size</option>
                <option value="defective">Defective or Damaged</option>
                <option value="changed-mind">Changed My Mind</option>
                <option value="other">Other</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-4" controlId="details">
              <Form.Label>Additional Details (optional)</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="details"
                value={formData.details}
                onChange={handleChange}
                placeholder="Provide any additional details to help us process your request."
                disabled={loading}
              />
            </Form.Group>

            <Button
              variant="warning"
              type="submit"
              disabled={loading}
              className="text-white fw-semibold"
            >
              {loading ? (
                <>
                  <span
                    className="spinner-border spinner-border-sm me-2"
                    role="status"
                    aria-hidden="true"
                  ></span>
                  Submitting...
                </>
              ) : (
                'Submit Request'
              )}
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default ReturnsPage;
