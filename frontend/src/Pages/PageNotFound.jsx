import React from "react";
import { Container, Button } from "react-bootstrap";
import {
  ExclamationTriangleFill,
  ArrowLeft,
  HouseDoorFill,
} from "react-bootstrap-icons";
import { useNavigate } from "react-router-dom";
import styles from "../styles/PageNotFound.module.css";

const PageNotFound = () => {
  const navigate = useNavigate();

  return (
    <Container className={styles.container}>
      <div className={styles.content}>
        <div className={styles.errorIllustration}>
          <div className={styles.errorIcon}>
            <ExclamationTriangleFill />
          </div>
          <div className={styles.errorText}>404</div>
        </div>

        <h1 className={styles.title}>Page Not Found</h1>
        <p className={styles.message}>
          Oops! The page you're looking for doesn't exist or has been moved.
        </p>

        <div className={styles.actions}>
          <Button
            variant="primary"
            className={styles.actionButton}
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="me-2" />
            Go Back
          </Button>

          <Button
            variant="outline-primary"
            className={styles.actionButton}
            onClick={() => navigate("/")}
          >
            <HouseDoorFill className="me-2" />
            Home Page
          </Button>
        </div>
      </div>
    </Container>
  );
};

export default PageNotFound;
