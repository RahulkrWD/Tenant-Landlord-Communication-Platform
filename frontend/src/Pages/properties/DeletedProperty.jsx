import React from "react";
import {
  Trash,
  ArrowCounterclockwise,
  HouseDoorFill,
  GeoAltFill,
  CurrencyRupee,
  ExclamationTriangleFill,
} from "react-bootstrap-icons";
import {
  Container,
  Row,
  Col,
  Card,
  Badge,
  Spinner,
  Alert,
  Button,
} from "react-bootstrap";

function DeletedProperty({
  deleteProperty,
  onRestore,
  onPermanentDelete,
  loading,
  error,
}) {
  // Format address object into readable string
  const formatAddress = (address) => {
    if (typeof address === "string") return address;
    return `${address.exactLocation}, ${address.city}, ${address.state} - ${address.pincode}`;
  };

  return (
    <Container className="py-3">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3 className="mb-0">
          <Trash className="me-2 text-danger" />
          Deleted Properties
        </h3>
        <Badge bg="secondary" pill className="fs-6">
          <HouseDoorFill className="me-1" />
          {deleteProperty.length}{" "}
          {deleteProperty.length === 1 ? "Property" : "Properties"}
        </Badge>
      </div>

      {error && (
        <Alert variant="danger" className="d-flex align-items-center">
          <ExclamationTriangleFill className="me-2" />
          {error}
        </Alert>
      )}

      {loading && (
        <div className="text-center py-4">
          <Spinner animation="border" variant="primary" />
          <p className="mt-2 text-muted">Loading deleted properties...</p>
        </div>
      )}

      {!loading && deleteProperty.length === 0 ? (
        <div className="text-center py-5">
          <HouseDoorFill size={48} className="text-muted mb-3" />
          <h4 className="text-muted">No Deleted Properties</h4>
          <p className="text-muted">Your trash bin is empty</p>
        </div>
      ) : (
        <Row className="g-4">
          {deleteProperty.map((property) => (
            <Col key={property._id} xs={12} md={6} lg={4}>
              <Card className="h-100 shadow-sm border-danger">
                <Card.Header className="bg-light text-danger d-flex justify-content-between align-items-center">
                  <Card.Title className="mb-0 text-truncate">
                    {property.propertyName}
                  </Card.Title>
                  <Badge bg="danger" pill>
                    Deleted
                  </Badge>
                </Card.Header>

                <Card.Body>
                  <div className="mb-3">
                    <h6 className="d-flex align-items-center text-muted">
                      <GeoAltFill className="me-2" />
                      Address
                    </h6>
                    <p className="mb-0">{formatAddress(property.address)}</p>
                  </div>

                  <div className="d-flex align-items-center mb-3">
                    <CurrencyRupee className="me-2 text-success" />
                    <div>
                      <small className="text-muted">Monthly Rent</small>
                      <h6 className="mb-0">₹{property.rentAmount}</h6>
                    </div>
                  </div>

                  {property.depositAmount > 0 && (
                    <div className="d-flex align-items-center">
                      <CurrencyRupee className="me-2 text-info" />
                      <div>
                        <small className="text-muted">Security Deposit</small>
                        <h6 className="mb-0">₹{property.depositAmount}</h6>
                      </div>
                    </div>
                  )}
                </Card.Body>

                <Card.Footer className="bg-white border-top-0">
                  <div className="d-flex justify-content-between gap-2">
                    <Button
                      variant="outline-success"
                      onClick={() => onRestore(property._id)}
                      disabled={loading}
                      className="d-flex align-items-center flex-grow-1 justify-content-center"
                    >
                      <ArrowCounterclockwise className="me-2" />
                      Restore
                    </Button>
                    <Button
                      variant="outline-danger"
                      onClick={() => onPermanentDelete(property._id)}
                      disabled={loading}
                      className="d-flex align-items-center flex-grow-1 justify-content-center"
                    >
                      <Trash className="me-2" />
                      Delete
                    </Button>
                  </div>
                </Card.Footer>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
}

export default DeletedProperty;
