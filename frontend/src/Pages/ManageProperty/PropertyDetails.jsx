import React, { useEffect } from "react";
import Layout from "../../Components/Layout/Layout";
import getRole from "../../utils/checkRole";
import { useNavigate } from "react-router-dom";

function PropertyDetails() {
  const token = sessionStorage.getItem("token");
  const role = getRole(token);
  const navigate = useNavigate();
  useEffect(() => {
    if (!token && !role == "landlord") {
      navigate("/login");
    }
  }, [token, navigate]);
  return (
    <Layout>
      <h2>Hello</h2>
    </Layout>
  );
}

export default PropertyDetails;
