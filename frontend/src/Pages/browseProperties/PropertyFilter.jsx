import React from "react";
import { Form, Row, Col, Badge } from "react-bootstrap";
import { Funnel, ArrowDown, ArrowUp } from "react-bootstrap-icons";

const propertyTypes = [
  { value: "", label: "All Types" },
  { value: "1BHK", label: "1 BHK" },
  { value: "2BHK", label: "2 BHK" },
  { value: "3BHK", label: "3 BHK" },
  { value: "Studio", label: "Studio" },
  { value: "Other", label: "Other" },
];

const availabilityOptions = [
  { value: "", label: "All Properties" },
  { value: "available", label: "Available Only" },
  { value: "unavailable", label: "Unavailable Only" },
];

function PropertyFilter({ filters, setFilters, propertyCount }) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="mb-4 p-3 bg-light rounded">
      <Row className="align-items-center">
        <Col md={3}>
          <Form.Group>
            <Form.Label className="d-flex align-items-center">
              <Funnel className="me-2" /> Property Type
            </Form.Label>
            <Form.Select
              name="propertyType"
              value={filters.propertyType}
              onChange={handleChange}
            >
              {propertyTypes.map((type) => (
                <option key={type.value} value={type.value}>
                  {type.label}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
        </Col>

        <Col md={3}>
          <Form.Group>
            <Form.Label>Availability</Form.Label>
            <Form.Select
              name="availability"
              value={filters.availability}
              onChange={handleChange}
            >
              {availabilityOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
        </Col>

        <Col md={3}>
          <Form.Group>
            <Form.Label>Sort by Rent</Form.Label>
            <Form.Select
              name="rentSort"
              value={filters.rentSort}
              onChange={handleChange}
            >
              <option value="">Default</option>
              <option value="lowToHigh">Low to High</option>
              <option value="highToLow">High to Low</option>
            </Form.Select>
            <div className="d-flex mt-2">
              <span className="text-muted small">
                {filters.rentSort === "lowToHigh" && (
                  <ArrowDown className="me-1" />
                )}
                {filters.rentSort === "highToLow" && (
                  <ArrowUp className="me-1" />
                )}
                {filters.rentSort
                  ? `Sorted ${
                      filters.rentSort === "lowToHigh"
                        ? "Low to High"
                        : "High to Low"
                    }`
                  : ""}
              </span>
            </div>
          </Form.Group>
        </Col>

        <Col md={3} className="text-end">
          <Badge bg="secondary" className="fs-6">
            {propertyCount} Properties Found
          </Badge>
        </Col>
      </Row>
    </div>
  );
}

export default PropertyFilter;
