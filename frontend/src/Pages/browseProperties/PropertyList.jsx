import React from "react";
import { Row, Col, Spinner, Card, Button, Badge } from "react-bootstrap";
import {
  HouseDoor,
  GeoAlt,
  CurrencyRupee,
  Eye,
  Heart,
  HeartFill,
  CheckCircle,
  XCircle,
} from "react-bootstrap-icons";
import { useNavigate } from "react-router-dom";
import { url } from "../../utils/baseurl";
import axios from "axios";

function PropertyList({ properties, loading }) {
  const token = JSON.parse(sessionStorage.getItem("token"));
  const navigate = useNavigate();
  const propertyTypeBadges = {
    "1BHK": "primary",
    "2BHK": "success",
    "3BHK": "info",
    Studio: "warning",
    Other: "secondary",
  };

  const formatAddress = (address) => {
    return `${address.exactLocation}, ${address.city}, ${address.state} - ${address.pincode}`;
  };

  if (loading) {
    return (
      <div className="text-center py-5">
        <Spinner animation="border" variant="primary" />
        <p className="mt-3">Loading properties...</p>
      </div>
    );
  }

  if (properties.length === 0) {
    return (
      <div className="text-center py-5">
        <HouseDoor size={48} className="text-muted mb-3" />
        <h4>No Properties Found</h4>
        <p className="text-muted">Try adjusting your filters</p>
      </div>
    );
  }

  const makeInterested = async (id) => {
    try {
      await axios.post(
        `${url}/property-management/interested/${id}`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      navigate("/my-properties");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Row xs={1} md={2} lg={3} className="g-4">
      {properties.map((property) => (
        <Col key={property._id}>
          <div
            className={`position-relative ${
              !property.isActive ? "disabled-card" : ""
            }`}
            style={
              !property.isActive ? { pointerEvents: "none", opacity: 0.5 } : {}
            }
          >
            <Card className="h-100 property-card">
              <Card.Header className="d-flex justify-content-between align-items-center">
                <Card.Title className="mb-0 text-truncate">
                  {property.propertyName}
                </Card.Title>
                <Badge
                  pill
                  bg={propertyTypeBadges[property.propertyType] || "secondary"}
                >
                  {property.propertyType}
                </Badge>
              </Card.Header>

              <Card.Body>
                <div className="mb-3">
                  <h6 className="d-flex align-items-center text-muted">
                    <GeoAlt className="me-2" />
                    Location
                  </h6>
                  <p className="mb-0">{formatAddress(property.address)}</p>
                </div>

                <div className="d-flex justify-content-between mb-3">
                  <div className="d-flex align-items-center">
                    <CurrencyRupee className="me-2 text-success" />
                    <div>
                      <small className="text-muted">Monthly Rent</small>
                      <h6 className="mb-0">₹{property.rentAmount}</h6>
                    </div>
                  </div>
                  <div className="d-flex align-items-center">
                    {property.isActive ? (
                      <Badge bg="success" className="d-flex align-items-center">
                        <CheckCircle className="me-1" />
                        Available
                      </Badge>
                    ) : (
                      <Badge bg="danger" className="d-flex align-items-center">
                        <XCircle className="me-1" />
                        Not Available
                      </Badge>
                    )}
                  </div>
                </div>
              </Card.Body>

              <Card.Footer className="bg-white">
                <div className="d-flex justify-content-between gap-2">
                  <Button
                    onClick={() => navigate(property._id)}
                    variant="outline-primary"
                    className="flex-grow-1"
                    disabled={!property.isActive}
                  >
                    <Eye className="me-1" /> View
                  </Button>
                  <Button
                    onClick={() => makeInterested(property._id)}
                    variant={
                      property.interested ? "success" : "outline-success"
                    }
                    className={`flex-grow-1 ${
                      property.interested ? "text-white" : ""
                    }`}
                    disabled={!property.isActive || property.interested}
                  >
                    {property.interested ? (
                      <>
                        <HeartFill className="me-1" /> Interested
                      </>
                    ) : (
                      <>
                        <Heart className="me-1" /> Interested
                      </>
                    )}
                  </Button>
                </div>
              </Card.Footer>
            </Card>
          </div>
        </Col>
      ))}
    </Row>
  );
}

export default PropertyList;
