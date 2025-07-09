import React from "react";
import Layout from "../../Components/Layout/Layout";

const HomePage = () => {
  const token = sessionStorage.getItem("token");
  return (
    <Layout>
      <h3>Home Page</h3>
    </Layout>
  );
};
export default HomePage;
