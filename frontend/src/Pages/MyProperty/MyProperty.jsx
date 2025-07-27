import React, { useState, useEffect } from "react";
import Layout from "../../Components/Layout/Layout";
import InterestedTab from "./InterestedTab";
import CartTab from "./CartTab";
import BookedTab from "./BookedTab";
import {
  Cart3,
  HeartFill,
  CheckCircleFill,
  CartFill,
  Heart,
  CheckCircle,
} from "react-bootstrap-icons";
import { Tab, Tabs, Container } from "react-bootstrap";
import "./styles/MyProperty.css";
import { useSearchParams, useNavigate } from "react-router-dom";

function MyProperty() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [key, setKey] = useState("cart");
  const [hoveredTab, setHoveredTab] = useState(null);

  useEffect(() => {
    const tab = searchParams.get("tab");
    if (tab && ["cart", "interested", "booked"].includes(tab)) {
      setKey(tab);
    }
  }, [searchParams]);

  const handleTabSelect = (k) => {
    setKey(k);
    // Update the URL with the selected tab
    setSearchParams({ tab: k });
  };

  const getTabIcon = (tabKey) => {
    const icons = {
      cart: { outline: <Cart3 size={20} />, filled: <CartFill size={20} /> },
      interested: {
        outline: <Heart size={20} />,
        filled: <HeartFill size={20} />,
      },
      booked: {
        outline: <CheckCircle size={20} />,
        filled: <CheckCircleFill size={20} />,
      },
    };
    return key === tabKey || hoveredTab === tabKey
      ? icons[tabKey].filled
      : icons[tabKey].outline;
  };

  return (
    <Layout>
      <Container className="my-4">
        <h3 className="mb-4">My Properties</h3>

        {/* Responsive Tabs */}
        <Tabs
          id="properties-tab"
          activeKey={key}
          onSelect={handleTabSelect}
          className="mb-4 custom-tabs"
          onMouseLeave={() => setHoveredTab(null)}
        >
          <Tab
            eventKey="cart"
            title={
              <div
                className="d-flex align-items-center"
                onMouseEnter={() => setHoveredTab("cart")}
              >
                {getTabIcon("cart")}
                <span className="ms-2 d-none d-md-inline">Cart</span>
              </div>
            }
          >
            <CartTab />
          </Tab>
          <Tab
            eventKey="interested"
            title={
              <div
                className="d-flex align-items-center"
                onMouseEnter={() => setHoveredTab("interested")}
              >
                {getTabIcon("interested")}
                <span className="ms-2 d-none d-md-inline">Interested</span>
              </div>
            }
          >
            <InterestedTab />
          </Tab>
          <Tab
            eventKey="booked"
            title={
              <div
                className="d-flex align-items-center"
                onMouseEnter={() => setHoveredTab("booked")}
              >
                {getTabIcon("booked")}
                <span className="ms-2 d-none d-md-inline">Booked</span>
              </div>
            }
          >
            <BookedTab />
          </Tab>
        </Tabs>
      </Container>
    </Layout>
  );
}

export default MyProperty;
