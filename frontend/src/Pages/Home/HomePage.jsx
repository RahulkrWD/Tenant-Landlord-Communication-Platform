import React from "react";
import { Container, Row, Col, Button, Card } from "react-bootstrap";
import {
  HouseDoorFill,
  PeopleFill,
  CashCoin,
  Tools,
  ChatSquareTextFill,
  ShieldLockFill,
  ArrowRight,
} from "react-bootstrap-icons";
import Layout from "../../Components/Layout/Layout";
import styles from "../../styles/HomePage.module.css";

const HomePage = () => {
  const features = [
    {
      icon: <HouseDoorFill className={styles.featureIcon} />,
      title: "Property Management",
      description: "Easily manage all your properties from one dashboard",
      color: "#4e73df",
    },
    {
      icon: <PeopleFill className={styles.featureIcon} />,
      title: "Tenant Portal",
      description: "Tenants can pay rent and submit requests easily",
      color: "#1cc88a",
    },
    {
      icon: <CashCoin className={styles.featureIcon} />,
      title: "Online Payments",
      description:
        "Secure online rent collection with multiple payment options",
      color: "#36b9cc",
    },
    {
      icon: <Tools className={styles.featureIcon} />,
      title: "Maintenance Tracking",
      description: "Streamline maintenance requests and repairs",
      color: "#f6c23e",
    },
    {
      icon: <ChatSquareTextFill className={styles.featureIcon} />,
      title: "Direct Messaging",
      description: "Communicate securely within the platform",
      color: "#e74a3b",
    },
    {
      icon: <ShieldLockFill className={styles.featureIcon} />,
      title: "Secure Platform",
      description: "Bank-level security for all your data",
      color: "#5a5c69",
    },
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <div className={styles.heroSection}>
        <Container>
          <Row className="align-items-center">
            <Col lg={6} className={styles.heroContent}>
              <h1 className={styles.heroTitle}>
                Modern Property Management Made Simple
              </h1>
              <p className={styles.heroText}>
                HavenKey connects landlords and tenants with powerful tools for
                rent collection, maintenance tracking, and seamless
                communication - all in one place.
              </p>
            </Col>
            <Col lg={6} className="text-center">
              <img
                src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
                alt="Modern Apartment Building"
                className={`img-fluid ${styles.heroImage}`}
              />
            </Col>
          </Row>
        </Container>
      </div>

      {/* Features Section */}
      <Container className={styles.featuresSection}>
        <Row className="justify-content-center mb-5">
          <Col lg={8} className="text-center">
            <h2 className={styles.sectionTitle}>
              Powerful Features for Everyone
            </h2>
            <p className={styles.sectionSubtitle}>
              Whether you're a landlord or tenant, HavenKey has tools to make
              property management easier
            </p>
          </Col>
        </Row>

        <Row className="g-4">
          {features.map((feature, index) => (
            <Col key={index} md={6} lg={4}>
              <Card className={styles.featureCard}>
                <Card.Body>
                  <div
                    className={styles.featureIconContainer}
                    style={{ backgroundColor: `${feature.color}20` }}
                  >
                    {React.cloneElement(feature.icon, {
                      style: { color: feature.color },
                    })}
                  </div>
                  <Card.Title className={styles.featureTitle}>
                    {feature.title}
                  </Card.Title>
                  <Card.Text className={styles.featureText}>
                    {feature.description}
                  </Card.Text>
                  <Button variant="link" className={styles.featureLink}>
                    Learn more <ArrowRight className="ms-1" />
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>

      {/* Testimonials Section */}
      <div className={styles.testimonialsSection}>
        <Container>
          <Row className="justify-content-center mb-5">
            <Col lg={8} className="text-center">
              <h2 className={styles.sectionTitle}>What Our Users Say</h2>
              <p className={styles.sectionSubtitle}>
                Don't just take our word for it - hear from our community
              </p>
            </Col>
          </Row>

          <Row className="g-4">
            <Col md={4}>
              <Card className={styles.testimonialCard}>
                <Card.Body>
                  <div className={styles.testimonialContent}>
                    <img
                      src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80"
                      alt="Sarah Johnson"
                      className={styles.testimonialImage}
                    />
                    <p className={styles.testimonialText}>
                      "As a landlord with multiple properties, HavenKey has
                      saved me hours each week. The rent collection is
                      seamless!"
                    </p>
                    <div className={styles.testimonialAuthor}>
                      <strong>Sarah Johnson</strong>
                      <span>Property Owner</span>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4}>
              <Card className={styles.testimonialCard}>
                <Card.Body>
                  <div className={styles.testimonialContent}>
                    <img
                      src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80"
                      alt="Raj Patel"
                      className={styles.testimonialImage}
                    />
                    <p className={styles.testimonialText}>
                      "Submitting maintenance requests through the app is so
                      easy. My landlord responds within hours!"
                    </p>
                    <div className={styles.testimonialAuthor}>
                      <strong>Raj Patel</strong>
                      <span>Tenant</span>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4}>
              <Card className={styles.testimonialCard}>
                <Card.Body>
                  <div className={styles.testimonialContent}>
                    <img
                      src="https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80"
                      alt="Michael Chen"
                      className={styles.testimonialImage}
                    />
                    <p className={styles.testimonialText}>
                      "The financial reporting saves me so much time during tax
                      season. Highly recommend for property managers!"
                    </p>
                    <div className={styles.testimonialAuthor}>
                      <strong>Michael Chen</strong>
                      <span>Property Manager</span>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>

      {/* CTA Section */}
      <div className={styles.ctaSection}>
        <Container>
          <Row className="justify-content-center">
            <Col lg={8} className="text-center">
              <h2 className={styles.ctaTitle}>
                Ready to Simplify Your Property Management?
              </h2>
              <p className={styles.ctaText}>
                Join thousands of landlords and tenants who trust HavenKey for
                their property needs.
              </p>
            </Col>
          </Row>
        </Container>
      </div>
    </Layout>
  );
};

export default HomePage;
