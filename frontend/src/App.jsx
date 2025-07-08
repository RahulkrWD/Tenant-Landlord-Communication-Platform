import React from "react";
import { Routes, Route } from "react-router-dom";
import LoginPage from "./Pages/Auth/LoginPage";
import HomePage from "./Pages/Home/HomePage"
import SignupPage from "./Pages/Auth/SignupPage";
import PageNotFound from "./Pages/PageNotFound";
import ScheduleDemoPage from "./Pages/ScheduleDemoPage";
import FaqsPage from "./Pages/FaqsPage";
import ResidentsPage from "./Pages/ResidentsPage";
import PropertyManagerspage from "./Pages/PropertyManagerspage";

const App = () => {
    return (
        <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/" element={<HomePage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/schedule-demo" element={<ScheduleDemoPage />} />
            <Route path="/faqs" element={<FaqsPage />} />
            <Route path="/residents" element={<ResidentsPage />} />
            <Route path="/property-managers" element={<PropertyManagerspage />} />
            <Route path="*" element={<PageNotFound />} />
        </Routes>
    )
}

export default App;
