import React, { useState } from 'react';
import { Container, Accordion, Form, InputGroup } from 'react-bootstrap';

const faqData = [
  {
    category: 'Ordering',
    qas: [
      {
        question: 'How do I place an order?',
        answer:
          'To place an order, browse our products, select your desired items, add them to your cart, and proceed to checkout.',
      },
      {
        question: 'Can I modify or cancel my order after placing it?',
        answer:
          'Orders can be modified or cancelled within 1 hour of placement by contacting our customer support.',
      },
      {
        question: 'What payment methods do you accept?',
        answer:
          'We accept major credit/debit cards, Bkash, and SSLCommerz payments for your convenience.',
      },
      {
        question: 'Is it safe to use my credit/debit card on your site?',
        answer:
          'Yes, our site uses secure encryption protocols to protect your payment information.',
      },
    ],
  },
  {
    category: 'Shipping & Delivery',
    qas: [
      {
        question: 'What are your shipping options and costs?',
        answer:
          'We offer standard and express shipping. Shipping costs vary by location and order value.',
      },
      {
        question: 'How long will my order take to arrive?',
        answer:
          'Delivery times depend on your location, typically 3-7 business days for local orders.',
      },
      {
        question: 'Do you ship internationally?',
        answer: 'Currently, we only ship within Bangladesh.',
      },
      {
        question: 'Can I track my order?',
        answer:
          'Yes, once your order is shipped, you will receive a tracking number via email.',
      },
    ],
  },
  {
    category: 'Returns & Exchanges',
    qas: [
      {
        question: 'What is your return/exchange policy?',
        answer:
          'Returns or exchanges are accepted within 7 days of delivery for eligible items in original condition.',
      },
      {
        question: 'How do I return or exchange an item?',
        answer:
          'Contact our customer support with your order details to initiate the return or exchange process.',
      },
      {
        question: 'How long does it take to process a return?',
        answer:
          'Return processing typically takes 5-10 business days after we receive the returned item.',
      },
      {
        question: 'Who pays for return shipping?',
        answer:
          'Return shipping costs are generally borne by the customer unless the item is defective or incorrect.',
      },
    ],
  },
  {
    category: 'Product Information',
    qas: [
      {
        question: 'How do I choose the right size?',
        answer:
          'Refer to our size guide available on each product page to select the best fit.',
      },
      {
        question: 'Are your products genuine and of high quality?',
        answer:
          'Yes, we source all our products from trusted manufacturers ensuring premium quality.',
      },
      {
        question: 'Do you restock sold-out items?',
        answer:
          'Frequently requested items are restocked regularly. Sign up for notifications on product pages.',
      },
    ],
  },
  {
    category: 'Account & Privacy',
    qas: [
      {
        question: 'How do I create an account?',
        answer:
          'Click on the "Login" button and select "Register" to create a new account with your email.',
      },
      {
        question: 'What if I forget my password?',
        answer:
          'Use the "Forgot Password" link on the login page to reset your password via email.',
      },
      {
        question: 'How do you protect my personal information?',
        answer:
          'We use industry-standard security measures to keep your data safe and private.',
      },
    ],
  },
  {
    category: 'Promotions & Discounts',
    qas: [
      {
        question: 'How do I use a coupon code?',
        answer:
          'Enter your coupon code during checkout in the "Apply Coupon" section and click "Apply".',
      },
      {
        question: 'Can I combine multiple offers?',
        answer:
          'Only one coupon or promotional offer can be applied per order.',
      },
      {
        question: 'When do you have sales or special promotions?',
        answer:
          'We run sales during festive seasons and special events. Subscribe to our newsletter to stay updated.',
      },
    ],
  },
  {
    category: 'Customer Support',
    qas: [
      {
        question: 'How can I contact customer service?',
        answer:
          'You can contact us via the Contact page, email, or phone during our business hours.',
      },
      {
        question: 'What are your customer service hours?',
        answer:
          'Our support team is available Sunday to Friday, 9 AM to 6 PM.',
      },
    ],
  },
];

const FaqPage = () => {
  const [searchTerm, setSearchTerm] = useState('');

  // Flatten all Q&A for search
  const allQAs = faqData.flatMap((cat) =>
    cat.qas.map((qa) => ({ ...qa, category: cat.category }))
  );

  // Filter QAs based on search term
  const filteredQAs = searchTerm
    ? allQAs.filter(
        (qa) =>
          qa.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
          qa.answer.toLowerCase().includes(searchTerm.toLowerCase()) ||
          qa.category.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : null;

  return (
    <Container className="my-5" style={{ maxWidth: 900 }}>
      <h1 className="mb-4 fw-bold text-center" style={{ color: '#FF6F00' }}>
        Frequently Asked Questions
      </h1>

      <InputGroup className="mb-4">
        <InputGroup.Text id="search-faq" style={{ backgroundColor: '#FF6F00', color: 'white' }}>
          🔍
        </InputGroup.Text>
        <Form.Control
          placeholder="Search FAQs..."
          aria-label="Search FAQs"
          aria-describedby="search-faq"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          spellCheck={false}
        />
      </InputGroup>

      <Accordion defaultActiveKey="0" alwaysOpen flush>
        {searchTerm
          ? filteredQAs.length > 0 ? (
              filteredQAs.map((qa, idx) => (
                <Accordion.Item eventKey={`${idx}`} key={`${qa.category}-${idx}`}>
                  <Accordion.Header>{qa.question} <small className="text-muted ms-2">({qa.category})</small></Accordion.Header>
                  <Accordion.Body>{qa.answer}</Accordion.Body>
                </Accordion.Item>
              ))
            ) : (
              <p className="text-center mt-4">No results found for "{searchTerm}".</p>
            )
          : faqData.map((cat, catIdx) => (
              <Accordion.Item eventKey={`${catIdx}`} key={cat.category}>
                <Accordion.Header>{cat.category}</Accordion.Header>
                <Accordion.Body>
                  <Accordion alwaysOpen flush>
                    {cat.qas.map((qa, idx) => (
                      <Accordion.Item eventKey={`${catIdx}-${idx}`} key={qa.question}>
                        <Accordion.Header>{qa.question}</Accordion.Header>
                        <Accordion.Body>{qa.answer}</Accordion.Body>
                      </Accordion.Item>
                    ))}
                  </Accordion>
                </Accordion.Body>
              </Accordion.Item>
            ))}
      </Accordion>
    </Container>
  );
};

export default FaqPage;
