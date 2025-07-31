import axios from "axios";
import React, { useEffect, useState } from "react";
import { url } from "../../utils/baseurl";
import {
  CheckCircleFill,
  XCircleFill,
  ClockFill,
  HouseDoor,
  GeoAlt,
  CashStack,
  Calendar,
  PersonBadge,
} from "react-bootstrap-icons";
import { Spinner } from "react-bootstrap";

function BookedTab() {
  const [booking, setBooking] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = JSON.parse(sessionStorage.getItem("token"));

  const fetchBooking = async () => {
    try {
      const response = await axios.get(
        `${url}/property-management/booking-request`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setBooking(response.data.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooking();
  }, []);

  const getStatusBadge = (status) => {
    switch (status) {
      case "approved":
        return "bg-success";
      case "rejected":
        return "bg-danger";
      default:
        return "bg-warning";
    }
  };

  if (loading) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ minHeight: "300px" }}
      >
        <Spinner animation="border" variant="primary" />
      </div>
    );
  }

  return (
    <div className="tab-content animate__animated animate__fadeIn p-3">
      <h4 className="text-center my-4">
        <CheckCircleFill size={28} className="me-2 text-success" />
        Your Booked Properties
      </h4>

      {booking.length === 0 ? (
        <p className="text-center text-muted">No booked properties found</p>
      ) : (
        <div className="row g-4">
          {booking.map((item) => (
            <div key={item?.propertyId?._id} className="col-md-6 col-lg-4">
              <div className="card h-100 shadow-sm animate__animated animate__fadeInUp hover-effect">
                <div className="card-header d-flex justify-content-between align-items-center">
                  <h5 className="mb-0">
                    <HouseDoor className="me-2 text-primary" />
                    {item?.propertyId?.propertyName}
                  </h5>
                  <span className={`badge ${getStatusBadge(item?.status)}`}>
                    {item?.status}
                  </span>
                </div>
                <div className="card-body">
                  <div className="mb-3">
                    <h6 className="d-flex align-items-center">
                      <GeoAlt className="me-2 text-secondary" />
                      Address
                    </h6>
                    <p className="ms-4 mb-0">
                      {item?.propertyId?.address?.exactLocation},{" "}
                      {item?.propertyId?.address.city},{" "}
                      {item?.propertyId?.address.state} -{" "}
                      {item?.propertyId?.address.pincode}
                    </p>
                  </div>

                  <div className="row">
                    <div className="col-6 mb-3">
                      <h6 className="d-flex align-items-center">
                        <CashStack className="me-2 text-secondary" />
                        Rent
                      </h6>
                      <p className="ms-4 mb-0">
                        ₹{item?.propertyId?.rentAmount}/month
                      </p>
                    </div>
                    <div className="col-6 mb-3">
                      <h6 className="d-flex align-items-center">
                        <CashStack className="me-2 text-secondary" />
                        Deposit
                      </h6>
                      <p className="ms-4 mb-0">
                        ₹{item?.propertyId?.depositAmount}
                      </p>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-6">
                      <h6 className="d-flex align-items-center">
                        <HouseDoor className="me-2 text-secondary" />
                        Type
                      </h6>
                      <p className="ms-4 mb-0">
                        {item?.propertyId?.propertyType}
                      </p>
                    </div>
                    <div className="col-6">
                      <h6 className="d-flex align-items-center">
                        <Calendar className="me-2 text-secondary" />
                        Request Date
                      </h6>
                      <p className="ms-4 mb-0">
                        {new Date(item?.requestDate).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="card-footer bg-light">
                  <small className="text-muted d-flex align-items-center">
                    <PersonBadge className="me-2" />
                    Landlord ID: {item?.propertyId?.landlordId}
                  </small>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default BookedTab;
