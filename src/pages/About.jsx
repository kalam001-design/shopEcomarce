import React, { useState } from 'react';
import { Container, Row, Col, Image, Card, Form, Button, Carousel } from 'react-bootstrap';
import { motion } from 'framer-motion';

const teamMembers = [
  { name: 'Kalam Ahmmed', role: 'Founder & CEO', img: '/src/assets/team/profile.jpg' },
  { name: 'Shamim Hasan', role: 'Creative Director', img: '/src/assets/team/profile.jpg' },
  { name: 'Khalid', role: 'Head of Marketing', img: '/src/assets/team/profile.jpg' },
];

const testimonials = [
  {
    id: 1,
    name: 'Nabila Ahmed',
    feedback:
      'Royel Attire provides high-quality products and excellent customer service. Their styles always keep me looking fresh!',
    avatar: '/src/assets/testimonials/images.jpeg',
  },
  {
    id: 2,
    name: 'Arif Chowdhury',
    feedback:
      'I love their winter collection! Warm, stylish, and perfect for chilly days. Highly recommended.',
    avatar: '/src/assets/testimonials/images.jpeg',
  },
  {
    id: 3,
    name: 'Maya Khan',
    feedback:
      'The team at Royel Attire really cares about their customers. Great mission and awesome products!',
    avatar: '/src/assets/testimonials/images.jpeg',
  },
];

const AboutPage = () => {
  const [contactData, setContactData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [formStatus, setFormStatus] = useState(null);

  const handleChange = (e) => {
    setContactData({ ...contactData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send data to your backend or an email service
    setFormStatus('Thank you for your message! We will get back to you soon.');
    setContactData({ name: '', email: '', message: '' });
  };

  return (
    <Container className="my-5">
      <h1 className="text-center fw-bold mb-4" style={{ color: '#FF6F00' }}>
        About Royel Attire
      </h1>
      <Row className="align-items-center mb-5">
        <Col md={6} className="mb-4 mb-md-0">
          <Image
            src="/src/assets/logo/royel attire.png"
            alt="Royel Attire Brand Story"
            fluid
            rounded
            style={{ maxHeight: 400, objectFit: 'cover', width: '100%' }}
          />
        </Col>
        <Col md={6}>
          <h3 className="fw-semibold mb-3">Our Story</h3>
          <p>
            Royel Attire started with a passion for blending modern fashion with timeless quality. We believe every
            garment should empower and inspire confidence. Since our inception, we have focused on delivering
            stylish, comfortable, and durable clothing for all occasions.
          </p>
          <p>
            From classic Panjabi styles to trendy T-shirts and lifestyle accessories, our collection is curated with
            care and crafted with love for our customers.
          </p>
        </Col>
      </Row>

      <Row className="mb-5">
        <Col md={6} className="mb-4 mb-md-0">
          <h3 className="fw-semibold mb-3">Our Mission</h3>
          <p>
            To provide high-quality, fashionable clothing that makes everyone feel special — without compromising on
            sustainability and ethical practices.
          </p>
        </Col>
        <Col md={6}>
          <h3 className="fw-semibold mb-3">Our Vision</h3>
          <p>
            To be the leading brand for contemporary South Asian fashion worldwide, innovating style with integrity
            and care for the planet.
          </p>
        </Col>
      </Row>

      <h3 className="text-center fw-bold mb-4" style={{ color: '#FF6F00' }}>
        Meet The Team
      </h3>
      <Row className="g-4 mb-5">
        {teamMembers.map((member, i) => (
          <Col md={4} key={member.name}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.2, duration: 0.6 }}
            >
              <Card className="text-center shadow-sm h-100">
                <Card.Img
                  variant="top"
                  src={member.img}
                  alt={member.name}
                  style={{ height: 250, objectFit: 'cover' }}
                />
                <Card.Body>
                  <Card.Title className="fw-semibold">{member.name}</Card.Title>
                  <Card.Text className="text-muted">{member.role}</Card.Text>
                </Card.Body>
              </Card>
            </motion.div>
          </Col>
        ))}
      </Row>

      {/* Contact & Map Section */}
      <Row className="mb-5">
        <Col md={6} className="mb-4 mb-md-0">
          <h3 className="fw-semibold mb-3" style={{ color: '#FF6F00' }}>
            Contact Us
          </h3>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="contactName" className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Your full name"
                name="name"
                value={contactData.name}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="contactEmail" className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="your.email@example.com"
                name="email"
                value={contactData.email}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="contactMessage" className="mb-3">
              <Form.Label>Message</Form.Label>
              <Form.Control
                as="textarea"
                rows={4}
                placeholder="Write your message here..."
                name="message"
                value={contactData.message}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Button type="submit" variant="warning" className="text-white px-4">
              Send Message
            </Button>
            {formStatus && (
              <p className="mt-3 text-success" role="alert" aria-live="polite">
                {formStatus}
              </p>
            )}
          </Form>
        </Col>

        <Col md={6}>
          <h3 className="fw-semibold mb-3" style={{ color: '#FF6F00' }}>
            Find Us Here
          </h3>
          <div style={{ borderRadius: 8, overflow: 'hidden', boxShadow: '0 2px 8px rgba(0,0,0,0.15)' }}>
            <iframe
              title="Royel Attire Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3651.9021454142297!2d90.40633771543696!3d23.750869494631135!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755b85e09154621%3A0x87fbbbd041f4eabb!2sDhaka%2C%20Bangladesh!5e0!3m2!1sen!2sus!4v1691244464013!5m2!1sen!2sus"
              width="100%"
              height="300"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </Col>
      </Row>

      {/* Testimonials Carousel */}
      <h3 className="text-center fw-bold mb-4" style={{ color: '#FF6F00' }}>
        What Our Customers Say
      </h3>
      <Carousel variant="dark" interval={5000} pause="hover" indicators={true} controls={true}>
        {testimonials.map(({ id, name, feedback, avatar }) => (
          <Carousel.Item key={id}>
            <div className="d-flex flex-column align-items-center px-3">
              <Image
                src={avatar}
                alt={name}
                roundedCircle
                width={100}
                height={100}
                className="mb-3 shadow-sm"
                style={{ objectFit: 'cover' }}
              />
              <blockquote className="blockquote text-center">
                <p className="mb-3 fst-italic">&quot;{feedback}&quot;</p>
                <footer className="blockquote-footer">{name}</footer>
              </blockquote>
            </div>
          </Carousel.Item>
        ))}
      </Carousel>
    </Container>
  );
};

export default AboutPage;
