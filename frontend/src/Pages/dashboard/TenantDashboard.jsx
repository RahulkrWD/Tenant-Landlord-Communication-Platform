import React, { useEffect } from "react";

function TenantDashboard() {
  const token = JSON.parse(sessionStorage.getItem("toke"));

  return (
    <div>
      <h3>TenantDashboard</h3>
    </div>
  );
}

export default TenantDashboard;
