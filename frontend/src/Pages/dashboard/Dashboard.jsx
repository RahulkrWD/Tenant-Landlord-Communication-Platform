import React, { useEffect } from "react";
import Layout from "../../Components/Layout/Layout";
import { useNavigate } from "react-router-dom";
import getRole from "../../utils/checkRole";
import LandlordDashboard from "./LandlordDashboard";
import TenantDashboard from "./TenantDashboard";

function Dashboard() {
  const token = JSON.parse(sessionStorage.getItem("token"));
  const navigate = useNavigate();
  const role = getRole(token);

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token]);
  return (
    <Layout>
      {role == "landlord" ? <LandlordDashboard /> : <TenantDashboard />}
    </Layout>
  );
}

export default Dashboard;
