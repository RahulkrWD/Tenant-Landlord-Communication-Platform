import React from "react";
import { Form, Button, Card, Spinner } from "react-bootstrap";
import {
  HouseDoorFill,
  GeoAltFill,
  CurrencyDollar,
} from "react-bootstrap-icons";
import styles from "./styles/CreateProperty.module.css";

function CreateProperty({ handleChange, handleSubmit, formData, loading }) {
  return (
    <Card className={`shadow-sm ${styles.card}`}>
      <Card.Body>
        <div className={styles.header}>
          <HouseDoorFill className={styles.headerIcon} />
          <h2 className={styles.title}>Create New Property</h2>
          <p className={styles.subtitle}>
            Fill in the details of your property
          </p>
        </div>

        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label className={styles.label}>Property Name</Form.Label>
            <div className={styles.inputGroup}>
              <HouseDoorFill className={styles.inputIcon} />
              <Form.Control
                type="text"
                name="propertyName"
                value={formData.propertyName}
                onChange={handleChange}
                placeholder="Enter property name"
                className={styles.input}
                required
                disabled={loading}
              />
            </div>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label className={styles.label}>Address</Form.Label>
            <div className={styles.inputGroup}>
              <GeoAltFill className={styles.inputIcon} />
              <Form.Control
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="Enter full address"
                className={styles.input}
                required
                disabled={loading}
              />
            </div>
          </Form.Group>

          <Form.Group className="mb-4">
            <Form.Label className={styles.label}>Monthly Rent</Form.Label>
            <div className={styles.inputGroup}>
              <CurrencyDollar className={styles.inputIcon} />
              <Form.Control
                type="number"
                name="rentAmount"
                value={formData.rentAmount}
                onChange={handleChange}
                placeholder="Enter rent amount"
                className={styles.input}
                min="1"
                required
                disabled={loading}
              />
            </div>
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
                Creating...
              </>
            ) : (
              "Create Property"
            )}
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
}

export default CreateProperty;
