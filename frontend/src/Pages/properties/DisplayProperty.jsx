import React from "react";
import { Row, Col, Alert, Spinner, Button, Badge, Card } from "react-bootstrap";
import {
  HouseDoorFill,
  PencilFill,
  TrashFill,
  PlusCircleFill,
  GeoAltFill,
  CurrencyRupee,
} from "react-bootstrap-icons";
import { Link } from "react-router-dom";

function DisplayProperty({
  properties,
  loading,
  error,
  onDelete,
  setActiveTab,
}) {
  if (loading) {
    return (
      <div className="text-center py-5">
        <Spinner animation="border" variant="primary" />
        <p className="mt-3 text-muted">Loading your properties...</p>
      </div>
    );
  }

  if (error) {
    return (
      <Alert variant="danger" className="mx-3 my-4">
        <strong>Error loading properties:</strong> {error}
      </Alert>
    );
  }

  const formatAddress = (address) => {
    return `${address.exactLocation}, ${address.city}, ${address.state} - ${address.pincode}`;
  };

  const propertyTypeBadges = {
    "1BHK": "primary",
    "2BHK": "success",
    "3BHK": "info",
    Studio: "warning",
    Other: "secondary",
  };

  return (
    <div className="p-3">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="mb-0">
          <HouseDoorFill className="me-2" />
          My Properties
        </h2>
        <Button
          variant="primary"
          onClick={() => setActiveTab("create")}
          className="d-flex align-items-center"
        >
          <PlusCircleFill className="me-2" />
          Add Property
        </Button>
      </div>

      <Badge bg="light" text="dark" className="mb-3 p-2">
        <HouseDoorFill className="me-1" />
        {properties.length}{" "}
        {properties.length === 1 ? "Property" : "Properties"}
      </Badge>

      {properties.length > 0 ? (
        <Row xs={1} md={2} lg={3} className="g-4">
          {properties.map((property) => (
            <Col key={property._id}>
              <Card className="h-100 shadow-sm">
                <Card.Header className="bg-light">
                  <div className="d-flex justify-content-between align-items-center">
                    <h5 className="mb-0 text-truncate">
                      {property.propertyName}
                    </h5>
                    <Badge
                      pill
                      bg={
                        propertyTypeBadges[property.propertyType] || "secondary"
                      }
                      className="ms-2"
                    >
                      {property.propertyType}
                    </Badge>
                  </div>
                </Card.Header>

                <Card.Body>
                  <div className="mb-3">
                    <h6 className="d-flex align-items-center text-muted">
                      <GeoAltFill className="me-2" />
                      Address
                    </h6>
                    <p className="mb-0">{formatAddress(property.address)}</p>
                  </div>

                  <Row className="g-2">
                    <Col xs={6}>
                      <div className="d-flex align-items-center">
                        <CurrencyRupee className="me-2 text-success" />
                        <div>
                          <small className="text-muted">Monthly Rent</small>
                          <h6 className="mb-0">{property.rentAmount}</h6>
                        </div>
                      </div>
                    </Col>
                    <Col xs={6}>
                      <div className="d-flex align-items-center">
                        <CurrencyRupee className="me-2 text-info" />
                        <div>
                          <small className="text-muted">Deposit</small>
                          <h6 className="mb-0">
                            {property.depositAmount || "0"}
                          </h6>
                        </div>
                      </div>
                    </Col>
                  </Row>
                </Card.Body>

                <Card.Footer className="bg-white border-top-0">
                  <div className="d-flex justify-content-between">
                    <Link
                      to={`/properties/${property._id}`}
                      className="btn btn-sm btn-outline-primary d-flex align-items-center"
                    >
                      <PencilFill className="me-1" />
                      Details
                    </Link>
                    <Button
                      variant="outline-danger"
                      size="sm"
                      onClick={() => onDelete(property._id)}
                      className="d-flex align-items-center"
                    >
                      <TrashFill className="me-1" />
                      Delete
                    </Button>
                  </div>
                </Card.Footer>
              </Card>
            </Col>
          ))}
        </Row>
      ) : (
        <div className="text-center py-5">
          <HouseDoorFill size={48} className="text-muted mb-3" />
          <h3 className="mb-2">No Properties Added</h3>
          <p className="text-muted mb-4">
            You haven't added any properties yet. Get started by adding your
            first property.
          </p>
          <Button
            variant="primary"
            size="lg"
            onClick={() => setActiveTab("create")}
            className="d-inline-flex align-items-center"
          >
            <PlusCircleFill className="me-2" />
            Add Property
          </Button>
        </div>
      )}
    </div>
  );
}

export default DisplayProperty;
