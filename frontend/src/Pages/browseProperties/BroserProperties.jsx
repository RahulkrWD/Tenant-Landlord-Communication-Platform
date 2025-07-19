import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import Layout from "../../Components/Layout/Layout";
import PropertyFilter from "./PropertyFilter";
import PropertyList from "./PropertyList";
import Pagination from "./Pagination";
import axios from "axios";
import { url } from "../../utils/baseurl";
import "./styles/BrowseProperties.css";

function BrowseProperties() {
  const [properties, setProperties] = useState([]);
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [propertiesPerPage] = useState(6);
  const [filters, setFilters] = useState({
    propertyType: "",
    rentSort: "",
  });

  const token = JSON.parse(sessionStorage.getItem("token"));

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await axios.get(`${url}/property`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setProperties(response.data.properties || []);
        setFilteredProperties(response.data.properties || []);
      } catch (error) {
        console.error("Error fetching properties:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProperties();
  }, [token]);

  useEffect(() => {
    applyFilters();
  }, [filters, properties]);

  const applyFilters = () => {
    let result = [...properties];

    // Filter by property type
    if (filters.propertyType) {
      result = result.filter(
        (property) => property.propertyType === filters.propertyType
      );
    }

    // Sort by rent amount
    if (filters.rentSort === "lowToHigh") {
      result.sort((a, b) => a.rentAmount - b.rentAmount);
    } else if (filters.rentSort === "highToLow") {
      result.sort((a, b) => b.rentAmount - a.rentAmount);
    }

    setFilteredProperties(result);
    setCurrentPage(1); // Reset to first page when filters change
  };

  // Get current properties for pagination
  const indexOfLastProperty = currentPage * propertiesPerPage;
  const indexOfFirstProperty = indexOfLastProperty - propertiesPerPage;
  const currentProperties = filteredProperties.slice(
    indexOfFirstProperty,
    indexOfLastProperty
  );
  const totalPages = Math.ceil(filteredProperties.length / propertiesPerPage);

  return (
    <Layout>
      <Container className="py-4">
        <PropertyFilter
          filters={filters}
          setFilters={setFilters}
          propertyCount={filteredProperties.length}
        />

        <PropertyList properties={currentProperties} loading={loading} />

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </Container>
    </Layout>
  );
}

export default BrowseProperties;
