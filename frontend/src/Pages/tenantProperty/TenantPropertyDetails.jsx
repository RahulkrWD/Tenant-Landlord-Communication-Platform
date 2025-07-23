import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  HouseDoor,
  GeoAlt,
  CurrencyRupee,
  Person,
  Envelope,
  Telephone,
  CartPlus,
  CreditCard,
  Heart,
  ArrowLeft,
} from "react-bootstrap-icons";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Badge,
  Spinner,
  Alert,
} from "react-bootstrap";
import Layout from "../../Components/Layout/Layout";
import axios from "axios";
import { url } from "../../utils/baseurl";
import "./styles/TenantPropertyDetails.css";

function TenantPropertyDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [property, setProperty] = useState(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const token = JSON.parse(sessionStorage.getItem("token"));

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const response = await axios.get(`${url}/property/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setProperty(response.data.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to load property details");
        setLoading(false);
        console.error("Error fetching property:", err);
      }
    };

    fetchProperty();
  }, [id]);

  if (loading) {
    return (
      <Layout>
        <Container className="text-center py-5">
          <Spinner animation="border" variant="primary" />
          <p className="mt-3">Loading property details...</p>
        </Container>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <Container className="py-5">
          <Alert variant="danger">{error}</Alert>
          <Button
            variant="primary"
            onClick={() => navigate(-1)}
            className="mt-3"
          >
            <ArrowLeft className="me-2" />
            Go Back
          </Button>
        </Container>
      </Layout>
    );
  }
  return (
    <Layout>
      <Container className="py-4">
        <Button
          variant="outline-secondary"
          onClick={() => navigate(-1)}
          className="mb-4"
        >
          <ArrowLeft className="me-2" />
          Back to Properties
        </Button>

        {/* Two Column Layout */}
        <div className="property-details-container">
          {/* Property Info */}
          <Card className="property-card">
            <Card.Body>
              <div className="d-flex justify-content-between align-items-start flex-wrap mb-3">
                <div>
                  <h2 className="mb-1">{property?.propertyName}</h2>
                  <Badge
                    bg={property?.isActive ? "success" : "danger"}
                    className="mb-2"
                  >
                    {property?.isActive ? "Available" : "Not Available"}
                  </Badge>
                </div>
                <Button
                  variant={property.interested ? "danger" : "outline-danger"}
                >
                  <Heart className={property.interested ? "fill" : ""} />
                </Button>
              </div>

              <Badge bg="info" className="mb-3">
                <HouseDoor className="me-1" />
                {property.propertyType}
              </Badge>

              <h5 className="d-flex align-items-center mt-3">
                <GeoAlt className="me-2 text-primary" />
                Address
              </h5>
              <p>
                {property?.address?.exactLocation}, {property?.address?.city},{" "}
                {property.address.state} - {property.address?.pincode}
              </p>

              <h5 className="d-flex align-items-center mt-3">
                <CurrencyRupee className="me-2 text-primary" />
                Rent Details
              </h5>
              <Row className="mb-3">
                <Col xs={6}>
                  <small className="text-muted">Monthly Rent</small>
                  <h5 className="text-success mt-1">₹{property?.rentAmount}</h5>
                </Col>
                <Col xs={6}>
                  <small className="text-muted">Deposit</small>
                  <h5 className="text-info mt-1">₹{property?.depositAmount}</h5>
                </Col>
              </Row>

              <div className="d-grid gap-2 property-actions mt-4">
                <Button
                  variant="primary"
                  size="lg"
                  onClick={() => navigate("/my-properties")}
                >
                  <CreditCard className="me-2" />
                  Book Now
                </Button>
                <Button
                  variant="outline-primary"
                  size="lg"
                  onClick={() => navigate("/my-properties")}
                >
                  <CartPlus className="me-2" />
                  Add to Cart
                </Button>
              </div>
            </Card.Body>
          </Card>

          {/* Landlord Info */}
          <Card className="landlord-card">
            <Card.Body>
              <h4 className="mb-4">
                <Person className="me-2 text-primary" />
                Landlord Details
              </h4>
              <div className="d-flex align-items-start flex-column gap-4">
                <div className="d-flex align-items-center">
                  <Person size={22} className="me-3 text-secondary" />
                  <div>
                    <small className="text-muted">Name</small>
                    <h6>{property?.landlord?.name}</h6>
                  </div>
                </div>
                <div className="d-flex align-items-center">
                  <Envelope size={22} className="me-3 text-secondary" />
                  <div>
                    <small className="text-muted">Email</small>
                    <h6>{property?.landlord?.email}</h6>
                  </div>
                </div>
                <div className="d-flex align-items-center">
                  <Telephone size={22} className="me-3 text-secondary" />
                  <div>
                    <small className="text-muted">Phone</small>
                    <h6>{property?.landlord?.phone}</h6>
                  </div>
                </div>
              </div>
            </Card.Body>
          </Card>
        </div>
      </Container>
    </Layout>
  );
}

export default TenantPropertyDetails;
