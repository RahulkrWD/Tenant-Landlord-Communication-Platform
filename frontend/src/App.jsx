import React from "react";
import { Routes, Route } from "react-router-dom";
import LoginPage from "./Pages/Auth/LoginPage";
import HomePage from "./Pages/Home/HomePage"
import SignupPage from "./Pages/Auth/SignupPage";
import PageNotFound from "./Pages/PageNotFound";

const App = () => {
    return (
        <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/" element={<HomePage />} />
            <Route path="/Signup" element={<SignupPage />} />
            <Route path="*" element={<PageNotFound />} />
        </Routes>
    )
}

export default App;
