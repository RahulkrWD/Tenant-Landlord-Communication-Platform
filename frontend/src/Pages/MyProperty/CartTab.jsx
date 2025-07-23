import React from "react";
import { Cart3 } from "react-bootstrap-icons";

function CartTab() {
  return (
    <div className="tab-content animate__animated animate__fadeIn">
      <h4 className="text-center my-4">
        <Cart3 size={28} className="me-2 text-primary" />
        Your Cart Items
      </h4>
      <p className="text-center text-muted">
        Cart functionality will be added soon
      </p>
    </div>
  );
}

export default CartTab;
