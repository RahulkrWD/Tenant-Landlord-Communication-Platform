import React, { useState } from "react";
import {
  Container,
  Form,
  Button,
  Row,
  Col,
  Alert,
  Spinner,
} from "react-bootstrap";
import {
  CalendarCheckFill,
  PersonFill,
  Building,
  TelephoneFill,
  EnvelopeFill,
  GeoAltFill,
  CheckCircleFill,
} from "react-bootstrap-icons";
import Layout from "../Components/Layout/Layout";
import styles from "../styles/ScheduleDemo.module.css";
import axios from "axios";
import { url } from "../utils/baseurl";

const ScheduleDemoPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    propertyCount: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const scheduleDemo = async (demoData) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post(`${url}/schedule-demo`, demoData);
      if (response.data.success) {
        setSuccess(true);
        return true;
      }
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Failed to schedule demo. Please try again."
      );
      return false;
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await scheduleDemo(formData);

    if (success) {
      setFormData({
        name: "",
        company: "",
        email: "",
        phone: "",
        propertyCount: "",
        message: "",
      });

      // Auto-hide success message after 5 seconds
      setTimeout(() => setSuccess(false), 5000);
    }
  };

  return (
    <Layout>
      <Container className={`${styles.demoContainer} py-5`}>
        <Row className="align-items-center">
          <Col lg={6} className="mb-5 mb-lg-0">
            <div className={styles.heroSection}>
              <div className={styles.iconWrapper}>
                <CalendarCheckFill className={styles.mainIcon} />
              </div>
              <h1 className={styles.heroTitle}>Get a Demo</h1>
              <p className={styles.heroText}>
                Thank you for your interest in getting more online and on-time
                payments from your residents with Havenkey!
              </p>
              <p className={styles.heroText}>
                Please fill out the form and someone on our team will reach out
                in the next 1-2 business days.
              </p>
              <div className={styles.benefits}>
                <h5 className={styles.benefitsTitle}>What to expect:</h5>
                <ul className={styles.benefitsList}>
                  <li>15-minute personalized demo</li>
                  <li>See the platform in action</li>
                  <li>Get all your questions answered</li>
                  <li>No obligation or hard sell</li>
                </ul>
              </div>
            </div>
          </Col>

          <Col lg={6}>
            <div className={styles.formCard}>
              <h3 className={styles.formTitle}>Schedule Your Demo</h3>

              {success && (
                <Alert variant="success" className={styles.alert}>
                  <CheckCircleFill className="me-2" />
                  Demo request submitted successfully! We'll contact you
                  shortly.
                </Alert>
              )}

              {error && (
                <Alert
                  variant="danger"
                  className={styles.alert}
                  onClose={() => setError(null)}
                  dismissible
                >
                  {error}
                </Alert>
              )}

              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <div className={styles.inputGroup}>
                    <PersonFill className={styles.inputIcon} />
                    <Form.Control
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Full Name"
                      required
                      className={styles.formInput}
                      disabled={loading}
                    />
                  </div>
                </Form.Group>

                <Form.Group className="mb-3">
                  <div className={styles.inputGroup}>
                    <Building className={styles.inputIcon} />
                    <Form.Control
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      placeholder="Company Name"
                      required
                      className={styles.formInput}
                      disabled={loading}
                    />
                  </div>
                </Form.Group>

                <Form.Group className="mb-3">
                  <div className={styles.inputGroup}>
                    <EnvelopeFill className={styles.inputIcon} />
                    <Form.Control
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Email Address"
                      required
                      className={styles.formInput}
                      disabled={loading}
                    />
                  </div>
                </Form.Group>

                <Form.Group className="mb-3">
                  <div className={styles.inputGroup}>
                    <TelephoneFill className={styles.inputIcon} />
                    <Form.Control
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="Phone Number"
                      className={styles.formInput}
                      disabled={loading}
                    />
                  </div>
                </Form.Group>

                <Form.Group className="mb-3">
                  <div className={styles.inputGroup}>
                    <GeoAltFill className={styles.inputIcon} />
                    <Form.Select
                      name="propertyCount"
                      value={formData.propertyCount}
                      onChange={handleChange}
                      className={styles.formInput}
                      required
                      disabled={loading}
                    >
                      <option value="">Number of Properties</option>
                      <option value="1-5">1-5 Properties</option>
                      <option value="6-20">6-20 Properties</option>
                      <option value="21-50">21-50 Properties</option>
                      <option value="50+">50+ Properties</option>
                    </Form.Select>
                  </div>
                </Form.Group>

                <Form.Group className="mb-4">
                  <Form.Control
                    as="textarea"
                    rows={3}
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Any specific questions or requirements?"
                    className={styles.textarea}
                    disabled={loading}
                  />
                </Form.Group>

                <Button
                  variant="primary"
                  type="submit"
                  className={styles.submitButton}
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <Spinner
                        as="span"
                        animation="border"
                        size="sm"
                        role="status"
                        aria-hidden="true"
                        className="me-2"
                      />
                      Submitting...
                    </>
                  ) : (
                    "Request Demo"
                  )}
                </Button>
              </Form>
            </div>
          </Col>
        </Row>
      </Container>
    </Layout>
  );
};

export default ScheduleDemoPage;
