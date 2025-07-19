import React, { useEffect, useState } from "react";
import { Tab, Tabs, Container, Alert } from "react-bootstrap";
import { PlusCircleFill, ListUl, Trash } from "react-bootstrap-icons";
import Layout from "../../Components/Layout/Layout";
import CreateProperty from "./CreateProperty";
import DisplayProperty from "./DisplayProperty";
import axios from "axios";
import { url } from "../../utils/baseurl";
import styles from "./styles/Properties.module.css";
import DeletedProperty from "./DeletedProperty";

function Properties() {
  const [activeTab, setActiveTab] = useState("view"); // Default to view tab
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const token = JSON.parse(sessionStorage.getItem("token"));

  const [formData, setFormData] = useState({
    propertyName: "",
    propertyType: "",
    address: {
      state: "",
      city: "",
      pincode: "",
      exactLocation: "",
    },
    rentAmount: "",
    depositAmount: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Check if the field is part of the address object
    if (name in formData.address) {
      setFormData((prev) => ({
        ...prev,
        address: {
          ...prev.address,
          [name]: value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const createProperty = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      await axios.post(`${url}/property`, formData, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });

      setSuccess("Property created successfully!");
      getProperties();
      setActiveTab("view");
      resetForm();
    } catch (error) {
      setError(error.response?.data?.message || "Failed to create property");
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      propertyName: "",
      propertyType: "",
      address: {
        state: "",
        city: "",
        pincode: "",
        exactLocation: "",
      },
      rentAmount: "",
      depositAmount: "",
    });
  };

  const getProperties = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${url}/property`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      setProperties(response.data.properties || []);
    } catch (error) {
      setError("Failed to fetch properties");
    } finally {
      setLoading(false);
    }
  };

  const deleteProperty = async (id) => {
    setLoading(true);
    setError(null);
    try {
      await axios.patch(
        `${url}/property/${id}`,
        {},
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
      getProperties();
    } catch (error) {
      setError(error.response?.data?.message || "Failed to delete property");
    } finally {
      setLoading(false);
    }
  };

  const hardDelete = async (id) => {
    setLoading(true);
    setError(null);
    try {
      await axios.delete(`${url}/property/${id}`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      setSuccess("Property permanently deleted!");
      getProperties();
    } catch (error) {
      setError(error.response?.data?.message || "Failed to delete property");
    } finally {
      setLoading(false);
    }
  };

  const isActive = properties.filter((item) => item.isActive);
  const isDeleted = properties.filter((item) => !item.isActive);

  useEffect(() => {
    getProperties();
  }, []);

  return (
    <Layout>
      <Container className={`${styles.container} py-4`}>
        {error && (
          <Alert variant="danger" onClose={() => setError(null)} dismissible>
            {error}
          </Alert>
        )}
        {success && (
          <Alert variant="success" onClose={() => setSuccess(null)} dismissible>
            {success}
          </Alert>
        )}

        <Tabs
          activeKey={activeTab}
          onSelect={(k) => setActiveTab(k)}
          className={`mb-4 ${styles.tabs}`}
        >
          <Tab
            eventKey="create"
            title={
              <span className={styles.tabTitle}>
                <PlusCircleFill className={styles.tabIcon} />
                Create Property
              </span>
            }
          >
            <CreateProperty
              handleChange={handleChange}
              handleSubmit={createProperty}
              formData={formData}
              loading={loading}
              error={error}
            />
          </Tab>
          <Tab
            eventKey="view"
            title={
              <span className={styles.tabTitle}>
                <ListUl className={styles.tabIcon} />
                View Properties ({isActive.length})
              </span>
            }
          >
            <DisplayProperty
              properties={isActive}
              loading={loading}
              error={error}
              setActiveTab={setActiveTab}
              onDelete={deleteProperty}
            />
          </Tab>
          <Tab
            eventKey="deleted-property"
            title={
              <span className={styles.tabTitle}>
                <Trash className={styles.tabIcon} />
                Deleted Properties ({isDeleted.length})
              </span>
            }
          >
            <DeletedProperty
              deleteProperty={isDeleted}
              onRestore={deleteProperty}
              onPermanentDelete={hardDelete}
              loading={loading}
            />
          </Tab>
        </Tabs>
      </Container>
    </Layout>
  );
}

export default Properties;
