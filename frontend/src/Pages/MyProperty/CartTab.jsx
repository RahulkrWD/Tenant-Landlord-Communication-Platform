import React, { useEffect, useState } from "react";
import {
  Cart3,
  Trash,
  HouseDoor,
  CashStack,
  ShieldLock,
  Calendar,
  GeoAlt,
} from "react-bootstrap-icons";
import { Button, Card, Row, Col, Badge, Spinner, Alert } from "react-bootstrap";
import { motion } from "framer-motion";
import axios from "axios";
import { url } from "../../utils/baseurl";
import { Link } from "react-router-dom";

function CartTab() {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [removingId, setRemovingId] = useState(null);
  const [error, setError] = useState(null);
  const token = JSON.parse(sessionStorage.getItem("token"));

  const fetchCartItems = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${url}/property-management/cart`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCartItems(response.data.data);
    } catch (error) {
      console.error("Error fetching cart items:", error);
      setError("Failed to load cart items");
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveItem = async (propertyId) => {
    try {
      setRemovingId(propertyId);
      await axios.delete(
        `${url}/property-management/remove-from-cart/${propertyId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      fetchCartItems(); // Refresh the cart
    } catch (error) {
      console.error("Error removing item:", error);
      setError("Failed to remove property from cart");
    } finally {
      setRemovingId(null);
    }
  };

  useEffect(() => {
    fetchCartItems();
  }, []);

  return (
    <div className="tab-content p-3">
      {cartItems.length > 0 ? (
        <h4 className="text-center my-4">
          <Cart3 size={28} className="me-2 text-primary" />
          Your Property Shortlist
        </h4>
      ) : (
        ""
      )}

      {error && (
        <Alert variant="danger" onClose={() => setError(null)} dismissible>
          {error}
        </Alert>
      )}

      {loading ? (
        <div className="text-center my-5">
          <Spinner animation="border" variant="primary" />
          <p className="mt-2">Loading your shortlisted properties...</p>
        </div>
      ) : cartItems.length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center my-5"
        >
          <Cart3 size={48} className="text-muted mb-3" />
          <h5 className="text-muted">Your property shortlist is empty</h5>
          <p className="text-muted">Add properties you're interested in</p>
          <Link to="/browse-properties">
            <Button variant="primary" className="mt-3">
              Browse Properties
            </Button>
          </Link>
        </motion.div>
      ) : (
        <>
          <Row xs={1} md={2} lg={3} className="g-4 mb-4">
            {cartItems.map((item) => (
              <Col key={item.propertyId._id}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  whileHover={{ scale: 1.02 }}
                >
                  <Card className="h-100 shadow-sm">
                    <Card.Header className="bg-light d-flex justify-content-between align-items-center">
                      <div>
                        <HouseDoor className="me-2" />
                        <strong>{item.propertyId.propertyName}</strong>
                      </div>
                      <Badge bg="info" text="dark">
                        {item.propertyId.propertyType}
                      </Badge>
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

                      <div className="d-flex justify-content-between mb-3">
                        <div>
                          <CashStack className="me-2 text-success" />
                          <span>Rent: </span>
                          <strong>
                            ₹{item.propertyId.rentAmount.toLocaleString()}
                          </strong>
                        </div>
                        <div>
                          <ShieldLock className="me-2 text-warning" />
                          <span>Deposit: </span>
                          <strong>
                            ₹{item.propertyId.depositAmount.toLocaleString()}
                          </strong>
                        </div>
                      </div>

                      <div className="d-flex justify-content-between align-items-center mt-3">
                        <small className="text-muted">
                          <Calendar className="me-1" />
                          Added: {new Date(item.addedAt).toLocaleDateString()}
                        </small>
                        <Button
                          variant="outline-danger"
                          size="sm"
                          onClick={() => handleRemoveItem(item.propertyId._id)}
                          disabled={removingId === item.propertyId._id}
                        >
                          {removingId === item.propertyId._id ? (
                            <Spinner as="span" animation="border" size="sm" />
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

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          ></motion.div>
        </>
      )}
    </div>
  );
}

export default CartTab;
