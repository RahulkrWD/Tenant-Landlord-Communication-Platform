import React from "react";
import { HeartFill } from "react-bootstrap-icons";

function InterestedTab() {
  return (
    <div className="tab-content animate__animated animate__fadeIn">
      <h4 className="text-center my-4">
        <HeartFill size={28} className="me-2 text-danger" />
        Properties You're Interested In
      </h4>
      <p className="text-center text-muted">
        Interested properties will appear here
      </p>
    </div>
  );
}

export default InterestedTab;
