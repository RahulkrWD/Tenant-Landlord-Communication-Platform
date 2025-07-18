import React from "react";
import styles from "./styles/DeletedProperty.module.css";
import {
  Trash,
  ArrowCounterclockwise,
  HouseDoorFill,
} from "react-bootstrap-icons";
import { Container, Row, Col, Card, Badge } from "react-bootstrap";

function DeletedProperty({ deleteProperty, onRestore, onPermanentDelete }) {
  return (
    <Container className={styles.deletedContainer}>
      <div className={styles.header}>
        <div className={styles.summary}>
          <Badge bg="info" className={styles.badge}>
            <HouseDoorFill className="me-1" /> {deleteProperty.length}{" "}
            Properties
          </Badge>
        </div>
      </div>

      {deleteProperty.length === 0 ? (
        <div className={styles.emptyState}>
          <p>No deleted properties found</p>
        </div>
      ) : (
        <Row className="g-4">
          {deleteProperty.map((property) => (
            <Col key={property._id} xs={12} md={6} lg={4}>
              <Card className={`${styles.propertyCard} ${styles.animatedCard}`}>
                <Card.Body>
                  <Card.Title className={styles.propertyTitle}>
                    {property.propertyName}
                  </Card.Title>

                  <div className={styles.propertyDetails}>
                    <div className={styles.detailItem}>
                      <strong>Address:</strong> {property.address}
                    </div>
                    <div className={styles.detailItem}>
                      <strong>Rent:</strong> Rs {property.rentAmount}/month
                    </div>
                  </div>

                  <div className={styles.actionButtons}>
                    <button
                      className={`btn ${styles.restoreButton}`}
                      onClick={() => onRestore(property._id)}
                    >
                      <ArrowCounterclockwise className={styles.buttonIcon} />{" "}
                      Restore
                    </button>
                    <button
                      className={`btn ${styles.deleteButton}`}
                      onClick={() => onPermanentDelete(property._id)}
                    >
                      <Trash className={styles.buttonIcon} /> Delete
                    </button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
}

export default DeletedProperty;
