import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, InputGroup } from 'react-bootstrap';
import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube, FaPhoneAlt, FaEnvelope } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 3000);
    }
  };

  const brandColor = '#FF6F00';
  const bgColor = '#1e1e1e';
  const textColor = '#f1f1f1';

  const linkHoverStyle = {
    transition: 'color 0.3s',
  };

  const handleMouseEnter = (e) => {
    e.target.style.color = brandColor;
  };

  const handleMouseLeave = (e) => {
    e.target.style.color = textColor;
  };

  return (
    <footer style={{ backgroundColor: bgColor, color: textColor }} className="pt-5 mt-5 border-top shadow-sm">
      <Container>
        <Row className="gy-4">
          <Col md={4}>
            <h5 className="fw-bold mb-3 text-white">Customer Support</h5>
            <p className="small text-light d-flex align-items-center mb-2">
              <FaPhoneAlt className="me-2" /> 
              <a
                href="tel:+880123456789"
                style={{ color: textColor, textDecoration: 'none' }}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                +880 1234 567 890
              </a>
            </p>
            <p className="small text-light d-flex align-items-center">
              <FaEnvelope className="me-2" /> 
              <a
                href="mailto:support@royelattire.com"
                style={{ color: textColor, textDecoration: 'none' }}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                support@royelattire.com
              </a>
            </p>
            <p className="small mt-3 text-light">
              Your trusted online clothing store with fast delivery and quality products.
            </p>
          </Col>

          {/* Quick Links */}
          <Col md={2} xs={6}>
            <h6 className="fw-bold mb-3 text-white">Quick Links</h6>
            <ul className="list-unstyled">
              {['/', '/slug', '/about', '/contact'].map((path, i) => {
                const labels = ['Home', 'Shop', 'About', 'Contact'];
                return (
                  <li key={path} className="mb-1">
                    <Link
                      to={path}
                      className="text-decoration-none"
                      style={{ color: textColor, ...linkHoverStyle }}
                      onMouseEnter={handleMouseEnter}
                      onMouseLeave={handleMouseLeave}
                    >
                      {labels[i]}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </Col>

          {/* Support Links */}
          <Col md={2} xs={6}>
            <h6 className="fw-bold mb-3 text-white">Support</h6>
            <ul className="list-unstyled">
              {['/faq', '/returns', '/shipping', '/privacy-policy'].map((path, i) => {
                const labels = ['FAQ', 'Returns', 'Shipping', 'Privacy Policy'];
                return (
                  <li key={path} className="mb-1">
                    <Link
                      to={path}
                      className="text-decoration-none"
                      style={{ color: textColor, ...linkHoverStyle }}
                      onMouseEnter={handleMouseEnter}
                      onMouseLeave={handleMouseLeave}
                    >
                      {labels[i]}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </Col>

          {/* Newsletter & Social */}
          <Col md={4}>
            <h6 className="fw-bold mb-3 text-white">Subscribe for Updates</h6>
            <Form onSubmit={handleSubscribe}>
              <InputGroup>
                <Form.Control
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <Button
                  variant="primary"
                  type="submit"
                  style={{ backgroundColor: brandColor, borderColor: brandColor }}
                >
                  Subscribe
                </Button>
              </InputGroup>
            </Form>

            <AnimatePresence>
              {subscribed && (
                <motion.small
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                  className="text-success mt-2 d-block"
                >
                  ✅ Thank you for subscribing!
                </motion.small>
              )}
            </AnimatePresence>

            <div className="mt-4 d-flex gap-3">
              {[FaFacebookF,  FaInstagram, FaYoutube].map((Icon, i) => {
                const links = [
                  'https://www.facebook.com/royel.attire',
                  'https://www.instagram.com/roy.aleattire/',
                  'https://youtube.com',
                ];
                const labels = ['Facebook', 'Twitter', 'Instagram', 'YouTube'];
                return (
                  <a
                    key={i}
                    href={links[i]}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={labels[i]}
                    className="fs-5"
                    style={{ color: textColor }}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                  >
                    <Icon />
                  </a>
                );
              })}
            </div>
          </Col>
        </Row>

        <hr style={{ borderColor: '#444' }} />

        <Row>
          <Col className="text-center py-3">
            <small className="text-light">
              &copy; {new Date().getFullYear()}{' '}
              <span style={{ color: brandColor }}>Royel Attire</span>. All rights reserved.
            </small>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
