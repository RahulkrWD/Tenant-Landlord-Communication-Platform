import React from "react";
import {
  Form,
  Button,
  Card,
  Spinner,
  Row,
  Col,
  FloatingLabel,
  Alert,
} from "react-bootstrap";
import {
  HouseDoorFill,
  GeoAltFill,
  CurrencyRupee,
  InfoCircleFill,
} from "react-bootstrap-icons";

const propertyTypes = [
  { value: "1BHK", label: "1 BHK" },
  { value: "2BHK", label: "2 BHK" },
  { value: "3BHK", label: "3 BHK" },
  { value: "Studio", label: "Studio Apartment" },
  { value: "Other", label: "Other" },
];

function CreateProperty({
  handleChange,
  handleSubmit,
  formData,
  loading,
  error,
}) {
  return (
    <Card className="shadow">
      <Card.Header className="bg-light">
        <div className="d-flex align-items-center mb-2">
          <HouseDoorFill className="text-primary me-2" size={28} />
          <h4 className="mb-0">Create New Property</h4>
        </div>
        <p className="text-muted mb-0">
          Fill in all required details to list your property
        </p>
      </Card.Header>

      <Card.Body>
        {error && (
          <Alert variant="danger" className="d-flex align-items-center">
            <InfoCircleFill className="me-2" />
            {error}
          </Alert>
        )}

        <Form onSubmit={handleSubmit}>
          {/* Property Basic Info */}
          <div className="mb-4">
            <h5 className="border-bottom pb-2 mb-3">
              <HouseDoorFill className="me-2 text-secondary" />
              Basic Information
            </h5>

            <Row className="g-3">
              <Col md={6}>
                <FloatingLabel
                  controlId="propertyName"
                  label="Property Name"
                  className="mb-3"
                >
                  <Form.Control
                    type="text"
                    name="propertyName"
                    value={formData.propertyName}
                    onChange={handleChange}
                    placeholder="Sunshine Apartments"
                    required
                    disabled={loading}
                  />
                </FloatingLabel>
              </Col>

              <Col md={6}>
                <FloatingLabel controlId="propertyType" label="Property Type">
                  <Form.Select
                    name="propertyType"
                    value={formData.propertyType}
                    onChange={handleChange}
                    required
                    disabled={loading}
                  >
                    <option value="">Select property type</option>
                    {propertyTypes.map((type) => (
                      <option key={type.value} value={type.value}>
                        {type.label}
                      </option>
                    ))}
                  </Form.Select>
                </FloatingLabel>
              </Col>
            </Row>
          </div>

          {/* Address Section */}
          <div className="mb-4">
            <h5 className="border-bottom pb-2 mb-3">
              <GeoAltFill className="me-2 text-secondary" />
              Address Details
            </h5>

            <Row className="g-3">
              <Col md={6}>
                <FloatingLabel controlId="state" label="State">
                  <Form.Control
                    type="text"
                    name="state"
                    value={formData.address.state}
                    onChange={handleChange}
                    placeholder="Maharashtra"
                    required
                    disabled={loading}
                  />
                </FloatingLabel>
              </Col>

              <Col md={6}>
                <FloatingLabel controlId="city" label="City">
                  <Form.Control
                    type="text"
                    name="city"
                    value={formData.address.city}
                    onChange={handleChange}
                    placeholder="Mumbai"
                    required
                    disabled={loading}
                  />
                </FloatingLabel>
              </Col>

              <Col md={6}>
                <FloatingLabel controlId="pincode" label="Pincode">
                  <Form.Control
                    type="number"
                    name="pincode"
                    value={formData.address.pincode}
                    onChange={handleChange}
                    placeholder="400001"
                    required
                    disabled={loading}
                  />
                </FloatingLabel>
              </Col>

              <Col md={6}>
                <FloatingLabel controlId="exactLocation" label="Exact Location">
                  <Form.Control
                    type="text"
                    name="exactLocation"
                    value={formData.address.exactLocation}
                    onChange={handleChange}
                    placeholder="Street, Landmark, etc."
                    required
                    disabled={loading}
                  />
                </FloatingLabel>
              </Col>
            </Row>
          </div>

          {/* Pricing Section */}
          <div className="mb-4">
            <h5 className="border-bottom pb-2 mb-3">
              <CurrencyRupee className="me-2 text-secondary" />
              Pricing Details
            </h5>

            <Row className="g-3">
              <Col md={6}>
                <FloatingLabel controlId="rentAmount" label="Monthly Rent (₹)">
                  <Form.Control
                    type="number"
                    name="rentAmount"
                    value={formData.rentAmount}
                    onChange={handleChange}
                    placeholder="15000"
                    min="1"
                    required
                    disabled={loading}
                  />
                </FloatingLabel>
              </Col>

              <Col md={6}>
                <FloatingLabel
                  controlId="depositAmount"
                  label="Security Deposit (₹)"
                >
                  <Form.Control
                    type="number"
                    name="depositAmount"
                    value={formData.depositAmount}
                    onChange={handleChange}
                    placeholder="30000"
                    min="0"
                    disabled={loading}
                  />
                </FloatingLabel>
              </Col>
            </Row>
          </div>

          <div className="d-grid mt-4">
            <Button
              variant="primary"
              size="lg"
              type="submit"
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
                  Creating Property...
                </>
              ) : (
                <>
                  <HouseDoorFill className="me-2" />
                  Create Property
                </>
              )}
            </Button>
          </div>
        </Form>
      </Card.Body>
    </Card>
  );
}

export default CreateProperty;
