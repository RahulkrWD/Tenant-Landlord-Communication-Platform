import React, { useEffect, useState } from "react";
import { Tab, Tabs, Container } from "react-bootstrap";
import { PlusCircleFill, ListUl, Trash } from "react-bootstrap-icons";
import Layout from "../../Components/Layout/Layout";
import CreateProperty from "./CreateProperty";
import DisplayProperty from "./DisplayProperty";
import axios from "axios";
import { url } from "../../utils/baseurl";
import styles from "./styles/Properties.module.css";
import DeletedProperty from "./DeletedProperty";

function Properties() {
  const [activeTab, setActiveTab] = useState("create");
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const token = JSON.parse(sessionStorage.getItem("token"));

  const [formData, setFormData] = useState({
    propertyName: "",
    address: "",
    rentAmount: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const createProperty = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await axios.post(`${url}/property`, formData, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });

      getProperties();
      setActiveTab("view");
    } catch (error) {
      setError(error.response?.data?.message || "Failed to create property");
    } finally {
      setFormData({
        propertyName: "",
        address: "",
        rentAmount: "",
      });
      setLoading(false);
    }
  };

  const getProperties = async () => {
    try {
      const response = await axios.get(`${url}/property`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      setProperties(response.data.properties || []);
    } catch (error) {
      setError("Failed to fetch properties");
    }
  };

  const deleteProperty = async (id) => {
    setLoading(true);
    setError(null);
    try {
      await axios.patch(
        `${url}/property/${id}`,
        {}, // No request body since backend only need the IDs
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
      getProperties();
      setActiveTab("view");
    } catch (error) {
      setError(error.response?.data?.message);
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
      getProperties();
    } catch (error) {
      setError(error.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  const isActive = properties.filter((items) => items.isActive);
  const isDeleted = properties.filter((items) => !items.isActive);
  useEffect(() => {
    getProperties();
  }, []);

  return (
    <Layout>
      <Container className={`${styles.container} py-4`}>
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
            />
          </Tab>
          <Tab
            eventKey="view"
            title={
              <span className={styles.tabTitle}>
                <ListUl className={styles.tabIcon} />
                View Properties
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
                Deleted Properties
              </span>
            }
          >
            <DeletedProperty
              deleteProperty={isDeleted}
              onRestore={deleteProperty}
              onPermanentDelete={hardDelete}
            />
          </Tab>
        </Tabs>
      </Container>
    </Layout>
  );
}

export default Properties;
