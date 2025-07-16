import React, { useEffect } from "react";
import Layout from "../../Components/Layout/Layout";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const token = sessionStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token]);
  return (
    <Layout>
      <h3>Dashboard</h3>
    </Layout>
  );
}

export default Dashboard;
