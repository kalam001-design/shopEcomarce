import React from 'react';
import { Container, Card } from 'react-bootstrap';

const TermsConditions = () => {
  return (
    <Container className="my-5" style={{ maxWidth: 800 }}>
      <h1 className="mb-4 fw-bold text-center" style={{ color: '#FF6F00' }}>
        Terms & Conditions
      </h1>

      <Card className="shadow-sm">
        <Card.Body>
          <p>
            Welcome to Royel Attire. By accessing or using our website and services, you agree to comply with and be bound by the following terms and conditions.
            Please read them carefully.
          </p>

          <h4 className="mt-4" style={{ color: '#FF6F00' }}>Use of Website</h4>
          <p>
            You agree to use this website only for lawful purposes. You must not use it in any way that may damage, disable, or impair its functionality or interfere with others’ use.
          </p>

          <h4 className="mt-4" style={{ color: '#FF6F00' }}>Products and Services</h4>
          <p>
            We strive to provide accurate product information and images. However, we do not guarantee that descriptions or other content is error-free.
            Product availability, pricing, and specifications may change without notice.
          </p>

          <h4 className="mt-4" style={{ color: '#FF6F00' }}>Orders and Payment</h4>
          <p>
            All orders are subject to acceptance and availability. We reserve the right to refuse or cancel any order.
            Payment must be made through the provided methods. You are responsible for providing accurate payment and shipping information.
          </p>

          <h4 className="mt-4" style={{ color: '#FF6F00' }}>Shipping and Delivery</h4>
          <p>
            Shipping policies, delivery times, and costs are detailed on our Shipping Information page.
            We are not responsible for delays beyond our control.
          </p>

          <h4 className="mt-4" style={{ color: '#FF6F00' }}>Returns and Refunds</h4>
          <p>
            Returns and refund policies are outlined on our Returns & Exchanges page.
            Please review them carefully before purchasing.
          </p>

          <h4 className="mt-4" style={{ color: '#FF6F00' }}>Intellectual Property</h4>
          <p>
            All content on this website, including text, graphics, logos, and images, is the property of Royel Attire or its licensors.
            Unauthorized use is prohibited.
          </p>

          <h4 className="mt-4" style={{ color: '#FF6F00' }}>Limitation of Liability</h4>
          <p>
            Royel Attire is not liable for any indirect, incidental, or consequential damages arising from your use of our website or products.
          </p>

          <h4 className="mt-4" style={{ color: '#FF6F00' }}>Changes to Terms</h4>
          <p>
            We reserve the right to update these terms at any time. Changes will be posted on this page.
            Continued use of the website constitutes acceptance of the updated terms.
          </p>

          <h4 className="mt-4" style={{ color: '#FF6F00' }}>Governing Law</h4>
          <p>
            These terms are governed by the laws of Bangladesh. Any disputes will be resolved in the courts located there.
          </p>

          <h4 className="mt-4" style={{ color: '#FF6F00' }}>Contact Us</h4>
          <p>
            For questions regarding these terms, please contact us at{' '}
            <a href="mailto:support@royelattire.com">support@royelattire.com</a>.
          </p>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default TermsConditions;
