import React from 'react';
import { Container, Card } from 'react-bootstrap';

const PrivacyPolicy = () => {
  return (
    <Container className="my-5" style={{ maxWidth: 800 }}>
      <h1 className="mb-4 fw-bold text-center" style={{ color: '#FF6F00' }}>
        Privacy Policy
      </h1>

      <Card className="shadow-sm">
        <Card.Body>
          <p>
            At Royel Attire, your privacy is our priority. This Privacy Policy explains how we collect,
            use, and protect your personal information when you visit our website or use our services.
          </p>

          <h4 className="mt-4" style={{ color: '#FF6F00' }}>Information We Collect</h4>
          <ul>
            <li><strong>Personal Information:</strong> Such as your name, email address, shipping address, phone number, and payment details.</li>
            <li><strong>Usage Data:</strong> Information on how you use our website, including pages visited, time spent, and interactions.</li>
            <li><strong>Cookies and Tracking:</strong> We use cookies and similar technologies to improve your experience and gather analytics.</li>
          </ul>

          <h4 className="mt-4" style={{ color: '#FF6F00' }}>How We Use Your Information</h4>
          <ul>
            <li>To process your orders and manage your account.</li>
            <li>To communicate with you about your orders, promotions, and updates.</li>
            <li>To improve our website, products, and services.</li>
            <li>To comply with legal obligations.</li>
          </ul>

          <h4 className="mt-4" style={{ color: '#FF6F00' }}>How We Protect Your Data</h4>
          <p>
            We implement appropriate security measures to protect your personal data from unauthorized access,
            alteration, disclosure, or destruction. Our website uses SSL encryption for data transmission.
          </p>

          <h4 className="mt-4" style={{ color: '#FF6F00' }}>Your Rights</h4>
          <ul>
            <li>You can access, update, or delete your personal information by contacting our support.</li>
            <li>You may unsubscribe from marketing communications at any time.</li>
            <li>We do not sell your personal information to third parties.</li>
          </ul>

          <h4 className="mt-4" style={{ color: '#FF6F00' }}>Cookies Policy</h4>
          <p>
            Cookies help us provide a better user experience by remembering your preferences and visit details.
            You can disable cookies in your browser settings, but some features may not function properly.
          </p>

          <h4 className="mt-4" style={{ color: '#FF6F00' }}>Changes to This Policy</h4>
          <p>
            We may update this Privacy Policy from time to time. Changes will be posted on this page with the updated date.
          </p>

          <h4 className="mt-4" style={{ color: '#FF6F00' }}>Contact Us</h4>
          <p>
            If you have questions or concerns about this Privacy Policy, please contact us at{' '}
            <a href="mailto:support@royelattire.com">support@royelattire.com</a>.
          </p>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default PrivacyPolicy;
