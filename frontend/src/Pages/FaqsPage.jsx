import React, { useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import {
  QuestionCircleFill,
  ChevronDown,
  HouseDoorFill,
  CreditCardFill,
  TelephoneFill,
  ArrowRight,
} from "react-bootstrap-icons";
import Layout from "../Components/Layout/Layout";
import styles from "../styles/FaqsPage.module.css";

const FaqPage = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const faqSections = [
    {
      title: "Getting Started",
      icon: <QuestionCircleFill className={styles.sectionIcon} />,
      items: [
        {
          question: "How do I create an account?",
          answer:
            "To create an account, click the 'Sign Up' button in the top right corner of our website. You'll need to provide your name, email address, and create a password. After verifying your email, you can complete your profile.",
        },
        {
          question: "Is there a mobile app available?",
          answer:
            "Yes! Our mobile app is available for both iOS and Android devices. You can download it from the App Store or Google Play Store by searching for 'Havenkey'.",
        },
      ],
    },
    {
      title: "Property Management",
      icon: <HouseDoorFill className={styles.sectionIcon} />,
      items: [
        {
          question: "How do I add a property to my account?",
          answer:
            "Navigate to the 'Properties' section in your dashboard and click 'Add Property'. Fill in the property details including address, type, and amenities. You can add photos and set rental terms before saving.",
        },
        {
          question: "Can I manage multiple properties?",
          answer:
            "Absolutely. Our platform supports managing unlimited properties from a single dashboard. You can organize properties by location, type, or any custom grouping that works for your business.",
        },
      ],
    },
    {
      title: "Payments & Billing",
      icon: <CreditCardFill className={styles.sectionIcon} />,
      items: [
        {
          question: "What payment methods do you accept?",
          answer:
            "We accept all major credit/debit cards, UPI payments (Google Pay, PhonePe, etc.), net banking, and other popular payment methods in India. International payments are also supported.",
        },
        {
          question: "When will I receive my rental payments?",
          answer:
            "Payments are deposited directly to your registered bank account within 2-3 business days after the tenant makes the payment. You'll receive a notification when the transfer is initiated.",
        },
      ],
    },
  ];

  return (
    <Layout>
      <div className={styles.hero}>
        <Container>
          <Row className="align-items-center">
            <Col md={6}>
              <h1 className={styles.heroTitle}>
                <QuestionCircleFill className="me-3" />
                How can we help?
              </h1>
              <p className={styles.heroText}>
                Find answers to common questions about our platform and
                services. If you can't find what you're looking for, our support
                team is ready to help.
              </p>
              <Button variant="primary" size="lg" className={styles.ctaButton}>
                Contact Support <TelephoneFill className="ms-2" />
              </Button>
            </Col>
            <Col md={6} className="text-center">
              <div className={styles.heroIllustration}>
                <img
                  src="https://minnixproperties.com/wp-content/uploads/2023/02/M24645-Blog-FAQs-About-Renting-a-Home-featured.jpg"
                  alt="FAQ Illustration"
                  className="img-fluid"
                />
              </div>
            </Col>
          </Row>
        </Container>
      </div>

      <Container className={styles.faqContainer}>
        <Row className="justify-content-center mb-5">
          <Col lg={8} className="text-center">
            <h2 className={styles.sectionTitle}>Frequently Asked Questions</h2>
            <p className={styles.sectionSubtitle}>
              Browse through our most common questions below
            </p>
          </Col>
        </Row>

        <Row className="g-4">
          {faqSections.map((section, sectionIndex) => (
            <Col key={sectionIndex} lg={4} md={6}>
              <div className={styles.sectionCard}>
                <div className={styles.sectionHeader}>
                  {section.icon}
                  <h3 className={styles.sectionName}>{section.title}</h3>
                </div>
                <div className={styles.accordion}>
                  {section.items.map((item, itemIndex) => {
                    const index = `${sectionIndex}-${itemIndex}`;
                    return (
                      <div
                        key={itemIndex}
                        className={`${styles.accordionItem} ${
                          activeIndex === index ? styles.active : ""
                        }`}
                      >
                        <div
                          className={styles.accordionHeader}
                          onClick={() => toggleAccordion(index)}
                        >
                          <h4 className={styles.accordionQuestion}>
                            {item.question}
                          </h4>
                          <ChevronDown className={styles.accordionIcon} />
                        </div>
                        {activeIndex === index && (
                          <div className={styles.accordionBody}>
                            <p>{item.answer}</p>
                            <Button variant="link" className={styles.readMore}>
                              Read more <ArrowRight className="ms-1" />
                            </Button>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </Col>
          ))}
        </Row>
      </Container>

      <div className={styles.supportSection}>
        <Container>
          <Row className="align-items-center">
            <Col md={6}>
              <h2 className={styles.supportTitle}>Still need help?</h2>
              <p className={styles.supportText}>
                Our customer support team is available 24/7 to answer your
                questions and help you get the most out of our platform.
              </p>
            </Col>
            <Col md={6} className="text-md-end">
              <Button
                variant="outline-primary"
                size="lg"
                className={styles.supportButton}
              >
                <TelephoneFill className="me-2" />
                Contact Support
              </Button>
            </Col>
          </Row>
        </Container>
      </div>
    </Layout>
  );
};

export default FaqPage;
