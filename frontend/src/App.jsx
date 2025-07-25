import React, { useEffect } from "react";
import { Routes, Route, useNavigate, Outlet } from "react-router-dom";
import LoginPage from "./Pages/Auth/LoginPage";
import HomePage from "./Pages/Home/HomePage";
import SignupPage from "./Pages/Auth/SignupPage";
import PageNotFound from "./Pages/PageNotFound";
import ScheduleDemoPage from "./Pages/ScheduleDemoPage";
import FaqsPage from "./Pages/FaqsPage";
import PropertyManagerspage from "./Pages/PropertyManagerspage";
import Profile from "./Pages/profile/Profile";
import Properties from "./Pages/properties/Properties";
import Dashboard from "./Pages/dashboard/Dashboard";
import LandlordPropertyDetails from "./Pages/landlordProperty/LandlordPropertyDetails";
import MyProperty from "./Pages/MyProperty/MyProperty";
import BroserProperties from "./Pages/browseProperties/BroserProperties";
import TenantPropertyDetails from "./Pages/tenantProperty/TenantPropertyDetails";

const PrivateRoute = () => {
  const token = JSON.parse(sessionStorage.getItem("token"));
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token, navigate]);
  return token ? <Outlet /> : null;
};

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/schedule-demo" element={<ScheduleDemoPage />} />
      <Route path="/faqs" element={<FaqsPage />} />
      <Route path="/property-managers" element={<PropertyManagerspage />} />

      {/* Protected routes */}
      <Route element={<PrivateRoute />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/properties" element={<Properties />} />
        <Route path="/properties/:id" element={<LandlordPropertyDetails />} />
        <Route
          path="/browse-properties/:id"
          element={<TenantPropertyDetails />}
        />
        <Route path="/my-properties" element={<MyProperty />} />
        <Route path="/browse-properties" element={<BroserProperties />} />
      </Route>

      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};

export default App;
