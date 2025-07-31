import React, { useEffect, useState } from "react";
import {
  HeartFill,
  HouseDoor,
  Cash,
  CurrencyRupee,
  GeoAlt,
  Trash,
} from "react-bootstrap-icons";
import { url } from "../../utils/baseurl";
import axios from "axios";
import { Button, Card, Row, Col, Badge, Spinner } from "react-bootstrap";
import { motion } from "framer-motion";

function InterestedTab() {
  const [interested, setInterested] = useState([]);
  const [loading, setLoading] = useState(true);
  const [removingId, setRemovingId] = useState(null);
  const token = JSON.parse(sessionStorage.getItem("token"));

  const fetchInterested = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${url}/property-management/interested`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setInterested(response.data.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveInterest = async (propertyId) => {
    try {
      setRemovingId(propertyId);
      await axios.delete(
        `${url}/property-management/interested/${propertyId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      fetchInterested(); // Refresh the list after removal
    } catch (error) {
      console.log(error);
    } finally {
      setRemovingId(null);
    }
  };

  useEffect(() => {
    fetchInterested();
  }, []);

  return (
    <div className="tab-content animate__animated animate__fadeIn p-3">
      {loading ? (
        <div className="text-center my-5">
          <Spinner animation="border" variant="primary" />
          <p className="mt-2">Loading your interests...</p>
        </div>
      ) : interested.length === 0 ? (
        <div className="text-center my-5">
          <HeartFill size={48} className="text-danger mb-3" />
          <p className="text-muted h5">
            No properties marked as interested yet
          </p>
          <p className="text-muted">
            Properties you're interested in will appear here
          </p>
        </div>
      ) : (
        <Row xs={1} md={2} lg={3} className="g-4">
          {interested.map((item) => (
            <Col key={item.propertyId._id}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                whileHover={{ scale: 1.02 }}
              >
                <Card className="h-100 shadow-sm border-0">
                  <Card.Header className="bg-primary text-white">
                    <div className="d-flex justify-content-between align-items-center">
                      <div>
                        <HouseDoor className="me-2" />
                        <strong>{item.propertyId.propertyName}</strong>
                      </div>
                      <Badge bg="light" text="dark">
                        {item.propertyId.propertyType}
                      </Badge>
                    </div>
                  </Card.Header>
                  <Card.Body>
                    <div className="mb-3">
                      <GeoAlt className="me-2 text-muted" />
                      <small className="text-muted">
                        {item.propertyId.address.exactLocation},{" "}
                        {item.propertyId.address.city},{" "}
                        {item.propertyId.address.state} -{" "}
                        {item.propertyId.address.pincode}
                      </small>
                    </div>

                    <div className="d-flex justify-content-between mb-2">
                      <div>
                        <Cash className="me-2 text-success" />
                        <span>Rent: </span>
                        <strong>
                          <CurrencyRupee />
                          {item.propertyId.rentAmount.toLocaleString()}
                        </strong>
                      </div>
                      <div>
                        <Cash className="me-2 text-warning" />
                        <span>Deposit: </span>
                        <strong>
                          <CurrencyRupee />
                          {item.propertyId.depositAmount.toLocaleString()}
                        </strong>
                      </div>
                    </div>

                    <div className="mt-3 d-flex justify-content-between align-items-center">
                      <small className="text-muted">
                        Added: {new Date(item.addedAt).toLocaleDateString()}
                      </small>
                      <Button
                        variant="outline-danger"
                        size="sm"
                        onClick={() =>
                          handleRemoveInterest(item.propertyId._id)
                        }
                        disabled={removingId === item.propertyId._id}
                      >
                        {removingId === item.propertyId._id ? (
                          <>
                            <Spinner
                              as="span"
                              animation="border"
                              size="sm"
                              role="status"
                              aria-hidden="true"
                            />
                            <span className="visually-hidden">Removing...</span>
                          </>
                        ) : (
                          <>
                            <Trash size={14} className="me-1" />
                            Remove
                          </>
                        )}
                      </Button>
                    </div>
                  </Card.Body>
                </Card>
              </motion.div>
            </Col>
          ))}
        </Row>
      )}
    </div>
  );
}

export default InterestedTab;
