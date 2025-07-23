import React from "react";

import { CheckCircleFill } from "react-bootstrap-icons";
function BookedTab() {
  return (
    <div className="tab-content animate__animated animate__fadeIn">
      <h4 className="text-center my-4">
        <CheckCircleFill size={28} className="me-2 text-success" />
        Your Booked Properties
      </h4>
      <p className="text-center text-muted">
        Booked properties will appear here
      </p>
    </div>
  );
}

export default BookedTab;
