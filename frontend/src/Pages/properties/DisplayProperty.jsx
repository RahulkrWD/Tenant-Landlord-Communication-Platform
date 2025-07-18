import React from "react";
import { Row, Col, Alert, Spinner, Button, Badge } from "react-bootstrap";
import {
  HouseDoorFill,
  PencilFill,
  TrashFill,
  PlusCircleFill,
} from "react-bootstrap-icons";
import styles from "./styles/DisplayProperty.module.css";
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
      <div className={styles.loadingContainer}>
        <Spinner animation="border" variant="primary" />
        <p className={styles.loadingText}>Loading properties...</p>
      </div>
    );
  }

  if (error) {
    return (
      <Alert variant="danger" className={styles.errorAlert}>
        {error}
      </Alert>
    );
  }

  const addToproperty = () => {
    setActiveTab("create");
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.summary}>
          <Badge bg="info" className={styles.badge}>
            <HouseDoorFill className="me-1" /> {properties.length} Properties
          </Badge>
        </div>
      </div>

      {properties.length > 0 ? (
        <Row className={styles.propertyGrid}>
          {properties.map((property) => (
            <Col
              key={property._id}
              xs={12}
              md={6}
              lg={4}
              className={styles.propertyCol}
            >
              <div className={styles.propertyCard}>
                <div className={styles.cardHeader}>
                  <HouseDoorFill className={styles.propertyIcon} />
                </div>

                <div className={styles.cardBody}>
                  <h3 className={styles.propertyTitle}>
                    {property.propertyName}
                  </h3>
                  <div className={styles.propertyMeta}>
                    <span className={styles.metaItem}>
                      <strong>Address:</strong> {property.address}
                    </span>
                    <span className={styles.metaItem}>
                      <strong>Rent:</strong> Rs {property.rentAmount}/month
                    </span>
                  </div>
                </div>

                <div className={styles.cardFooter}>
                  <Link
                    to={property._id}
                    className={`text-decoration-none text-bg-success ${styles.actionButton}`}
                  >
                    <PencilFill className="m-1" /> View Details
                  </Link>
                  <Button
                    variant="outline-danger"
                    size="sm"
                    onClick={() => onDelete(property._id)}
                    className={styles.actionButton}
                  >
                    <TrashFill className="me-1" /> Delete
                  </Button>
                </div>
              </div>
            </Col>
          ))}
        </Row>
      ) : (
        <div className={styles.emptyState}>
          <HouseDoorFill size={48} className={styles.emptyIcon} />
          <h3 className={styles.emptyTitle}>No Properties Found</h3>
          <p className={styles.emptyText}>
            You haven't added any properties yet
          </p>
          <Button
            onClick={addToproperty}
            variant="primary"
            className={styles.addButton}
          >
            <PlusCircleFill className="me-2" /> Add First Property
          </Button>
        </div>
      )}
    </div>
  );
}

export default DisplayProperty;
