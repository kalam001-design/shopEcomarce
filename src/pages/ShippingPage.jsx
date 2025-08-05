import React from 'react';
import { Container, Card, ListGroup, Row, Col, Button } from 'react-bootstrap';
import { FaTruck, FaClock, FaMapMarkedAlt, FaGlobe, FaQuestionCircle, FaPhoneAlt } from 'react-icons/fa';

const ShippingPage = () => {
  return (
    <Container className="my-5" style={{ maxWidth: 900 }}>
      <h1
        className="mb-5 fw-bold text-center"
        style={{ color: '#FF6F00', letterSpacing: 1.5 }}
      >
        Shipping Information
      </h1>

      {/* Shipping Options */}
      <Card className="shadow-sm mb-4 border-0">
        <Card.Body>
          <Row className="align-items-center">
            <Col xs={2} className="text-center text-orange">
              <FaTruck size={50} color="#FF6F00" />
            </Col>
            <Col>
              <h4 style={{ color: '#FF6F00' }}>Shipping Options & Costs</h4>
              <p>
                We offer flexible shipping options to get your order safely and quickly:
              </p>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <strong>Standard Shipping:</strong> 3-7 business days. Cost depends on location and order value.
                </ListGroup.Item>
                <ListGroup.Item>
                  <strong>Express Shipping:</strong> 1-3 business days. Higher fee applies.
                </ListGroup.Item>
                <ListGroup.Item>
                  <strong>Free Shipping:</strong> For orders over BDT 5,000 within Bangladesh.
                </ListGroup.Item>
              </ListGroup>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      {/* Delivery Times */}
      <Card className="shadow-sm mb-4 border-0">
        <Card.Body>
          <Row className="align-items-center">
            <Col xs={2} className="text-center">
              <FaClock size={50} color="#FF6F00" />
            </Col>
            <Col>
              <h4 style={{ color: '#FF6F00' }}>Delivery Times</h4>
              <p>
                Delivery depends on your location and the shipping option chosen.
                Please allow extra time during holidays or unexpected delays.
              </p>
              <p>
                You will receive a tracking number via email after your order ships.
              </p>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      {/* Order Tracking */}
      <Card className="shadow-sm mb-4 border-0">
        <Card.Body>
          <Row className="align-items-center">
            <Col xs={2} className="text-center">
              <FaMapMarkedAlt size={50} color="#FF6F00" />
            </Col>
            <Col>
              <h4 style={{ color: '#FF6F00' }}>Order Tracking</h4>
              <p>
                Use your tracking number to follow your order status on the courier’s website.
                For help, contact our support team.
              </p>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      {/* International Shipping */}
      <Card className="shadow-sm mb-4 border-0">
        <Card.Body>
          <Row className="align-items-center">
            <Col xs={2} className="text-center">
              <FaGlobe size={50} color="#FF6F00" />
            </Col>
            <Col>
              <h4 style={{ color: '#FF6F00' }}>International Shipping</h4>
              <p>
                Currently, we only ship within Bangladesh. We plan to expand international shipping soon.
              </p>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      {/* FAQ Section */}
      <Card className="shadow-sm mb-4 border-0">
        <Card.Body>
          <Row className="align-items-center">
            <Col xs={2} className="text-center">
              <FaQuestionCircle size={50} color="#FF6F00" />
            </Col>
            <Col>
              <h4 style={{ color: '#FF6F00' }}>Frequently Asked Questions</h4>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <strong>How do I know when my order has shipped?</strong>
                  <br />
                  You will receive an email notification with tracking details once your order is dispatched.
                </ListGroup.Item>
                <ListGroup.Item>
                  <strong>What if my package is delayed?</strong>
                  <br />
                  Delivery delays can happen due to weather or courier issues. Please contact customer support if your order is late.
                </ListGroup.Item>
                <ListGroup.Item>
                  <strong>Can I change my shipping address after ordering?</strong>
                  <br />
                  Changes are only possible within 1 hour of placing the order. Contact support immediately.
                </ListGroup.Item>
              </ListGroup>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      {/* Contact Support Callout */}
      <Card className="text-center shadow-sm border-0 p-4" style={{ backgroundColor: '#FFF4E5' }}>
        <FaPhoneAlt size={40} color="#FF6F00" className="mb-3" />
        <h5 className="fw-bold" style={{ color: '#FF6F00' }}>
          Need more help?
        </h5>
        <p>Contact our customer support team for any questions or assistance.</p>
        <Button variant="warning" href="/contact" className="text-white px-4">
          Contact Us
        </Button>
      </Card>
    </Container>
  );
};

export default ShippingPage;
