import React from "react";
import { Container, Row, Col, Card, Button, Badge } from "react-bootstrap";
import {
  HouseDoor,
  People,
  CashCoin,
  Tools,
  ChatSquareText,
  GraphUp,
  ShieldCheck,
  CalendarCheck,
  Building,
  CheckCircle,
} from "react-bootstrap-icons";
import Layout from "../Components/Layout/Layout";
import styles from "../styles/PropertyManagers.module.css";

const PropertyManagersPage = () => {
  const features = [
    {
      icon: <HouseDoor className={styles.featureIcon} />,
      title: "Property Portfolio",
      description:
        "Manage all your properties from a single dashboard with detailed analytics.",
      image:
        "https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    },
    {
      icon: <People className={styles.featureIcon} />,
      title: "Tenant Management",
      description:
        "Track tenant information, lease terms, and communication history.",
      image:
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    },
    {
      icon: <CashCoin className={styles.featureIcon} />,
      title: "Rent Collection",
      description:
        "Automated rent collection with multiple payment options and reminders.",
      image:
        "https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    },
    {
      icon: <Tools className={styles.featureIcon} />,
      title: "Maintenance Tracking",
      description: "Streamline maintenance requests and track repair progress.",
      image:
        "https://images.unsplash.com/photo-1600566752227-8f3b540324b2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    },
    {
      icon: <ChatSquareText className={styles.featureIcon} />,
      title: "Communication Hub",
      description: "Centralized messaging with tenants, vendors, and owners.",
      image:
        "https://images.unsplash.com/photo-1552581234-26160f608093?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    },
    {
      icon: <GraphUp className={styles.featureIcon} />,
      title: "Financial Reporting",
      description:
        "Generate detailed financial reports and export to accounting software.",
      image:
        "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    },
  ];

  const benefits = [
    {
      icon: <ShieldCheck className={styles.benefitIcon} />,
      title: "Reduced Risk",
      description:
        "Compliance tracking and document storage minimize legal exposure",
    },
    {
      icon: <CalendarCheck className={styles.benefitIcon} />,
      title: "Time Savings",
      description: "Automate repetitive tasks and save 10+ hours weekly",
    },
    {
      icon: <Building className={styles.benefitIcon} />,
      title: "Portfolio Growth",
      description:
        "Tools to efficiently scale your property management business",
    },
    {
      icon: <CheckCircle className={styles.benefitIcon} />,
      title: "Higher Occupancy",
      description: "Marketing tools and tenant screening reduce vacancy rates",
    },
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <div className={styles.heroSection}>
        <Container>
          <Row className="align-items-center">
            <Col lg={6} className={styles.heroContent}>
              <Badge bg="light" text="dark" className={styles.heroBadge}>
                Professional Property Management
              </Badge>
              <h1 className={styles.heroTitle}>
                Streamline Your Property Management Business
              </h1>
              <p className={styles.heroText}>
                Our comprehensive platform helps professional property managers
                save time, reduce stress, and grow their portfolios efficiently.
              </p>
              <div className={styles.heroButtons}>
                <Button variant="primary" size="lg" className="me-3">
                  Request Demo
                </Button>
                <Button variant="outline-light" size="lg">
                  Learn More
                </Button>
              </div>
            </Col>
            <Col lg={6} className="text-center">
              <img
                src="https://images.unsplash.com/photo-1600585152220-90363fe7e115?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
                alt="Property Management"
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
              Powerful Features for Property Managers
            </h2>
            <p className={styles.sectionSubtitle}>
              Everything you need to efficiently manage properties at scale
            </p>
          </Col>
        </Row>

        <Row className="g-4">
          {features.map((feature, index) => (
            <Col key={index} lg={4} md={6}>
              <Card className={styles.featureCard}>
                <div className={styles.featureImageContainer}>
                  <img
                    src={feature.image}
                    alt={feature.title}
                    className={styles.featureImage}
                  />
                </div>
                <Card.Body>
                  <div className={styles.featureIconContainer}>
                    {feature.icon}
                  </div>
                  <Card.Title className={styles.featureTitle}>
                    {feature.title}
                  </Card.Title>
                  <Card.Text className={styles.featureText}>
                    {feature.description}
                  </Card.Text>
                  <Button variant="link" className={styles.featureLink}>
                    Learn more →
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>

      {/* Benefits Section */}
      <div className={styles.benefitsSection}>
        <Container>
          <Row className="align-items-center">
            <Col lg={6} className="mb-5 mb-lg-0">
              <img
                src="https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
                alt="Property Manager Benefits"
                className={`img-fluid ${styles.benefitsImage}`}
              />
            </Col>
            <Col lg={6}>
              <h2 className={styles.sectionTitle}>
                Grow Your Property Management Business
              </h2>
              <p className={styles.benefitsIntro}>
                Professional property managers using our platform report:
              </p>

              <div className={styles.benefitsGrid}>
                {benefits.map((benefit, index) => (
                  <div key={index} className={styles.benefitItem}>
                    <div className={styles.benefitIconContainer}>
                      {benefit.icon}
                    </div>
                    <div>
                      <h4 className={styles.benefitTitle}>{benefit.title}</h4>
                      <p className={styles.benefitText}>
                        {benefit.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <Button variant="primary" size="lg" className="mt-4">
                Get Started Today
              </Button>
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
                Ready to Transform Your Property Management?
              </h2>
              <p className={styles.ctaText}>
                Join thousands of professional property managers who trust our
                platform to streamline their operations and grow their business.
              </p>
              <Button variant="light" size="lg" className="me-3">
                Schedule Demo
              </Button>
              <Button variant="outline-light" size="lg">
                Contact Sales
              </Button>
            </Col>
          </Row>
        </Container>
      </div>
    </Layout>
  );
};

export default PropertyManagersPage;
