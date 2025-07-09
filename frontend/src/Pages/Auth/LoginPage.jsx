import React, { useEffect, useState } from "react";
import styles from "./styles/Login.module.css";
import {
  FaUserTie,
  FaUser,
  FaEnvelope,
  FaLock,
  FaChevronRight,
  FaArrowLeft,
  FaExclamationCircle,
  FaSpinner,
} from "react-icons/fa";
import landlordImage from "../../assets/login-images.webp";
import tenantImage from "../../assets/login-images.webp";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [userType, setUserType] = useState("landlord");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const token = sessionStorage.getItem("token");
  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [token]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // axios
  const url = import.meta.env.VITE_API_URL;
  const postData = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post(
        `${url}/auth/${userType}-login`,
        formData
      );
      if (response.status == 200) {
        navigate("/");
        sessionStorage.setItem("token", JSON.stringify(response.data.token));
      }
    } catch (error) {
      setError(
        error.response?.data?.message || "Signup failed. Please try again."
      );

      setTimeout(() => {
        setError(null);
      }, 2000);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    postData();
  };

  return (
    <div className={styles.loginContainer}>
      <div className={styles.loginCard}>
        {/* Left Side - Visual */}
        <div className={styles.visualSide}>
          <div className={styles.imageContainer}>
            <img
              src={userType === "landlord" ? landlordImage : tenantImage}
              alt={
                userType === "landlord" ? "Property manager" : "Happy tenant"
              }
              className={styles.heroImage}
            />
            <div className={styles.imageOverlay}></div>
          </div>

          <div className={styles.visualContent}>
            <h2>Welcome Back</h2>
            <p className={styles.welcomeMessage}>
              {userType === "landlord"
                ? "Manage your properties with ease"
                : "Access your rental dashboard"}
            </p>
            <div className={styles.userTypeToggle}>
              <button
                className={`${styles.toggleButton} ${
                  userType === "landlord" ? styles.active : ""
                }`}
                onClick={() => setUserType("landlord")}
              >
                <FaUserTie className={styles.toggleIcon} />
                Landlord Login
              </button>
              <button
                className={`${styles.toggleButton} ${
                  userType === "tenant" ? styles.active : ""
                }`}
                onClick={() => setUserType("tenant")}
              >
                <FaUser className={styles.toggleIcon} />
                Tenant Login
              </button>
            </div>
          </div>
        </div>

        {/* Right Side - Form */}
        <div className={styles.formSide}>
          <Link to="/" className={styles.backHome}>
            <FaArrowLeft className="me-2" />
            Back to Home
          </Link>
          <div className={styles.formWrapper}>
            <div className={styles.logo}>
              <span>HavenKey</span>
            </div>

            <h3 className={styles.formTitle}>
              {userType === "landlord" ? "Landlord Login" : "Tenant Login"}
            </h3>

            {error && (
              <div className={styles.errorMessage}>
                <FaExclamationCircle /> {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className={styles.loginForm}>
              <div className={styles.inputGroup}>
                <label htmlFor="email">Email Address</label>
                <div className={styles.inputWithIcon}>
                  <FaEnvelope className={styles.inputIcon} />
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="your@email.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className={styles.inputGroup}>
                <label htmlFor="password">Password</label>
                <div className={styles.inputWithIcon}>
                  <FaLock className={styles.inputIcon} />
                  <input
                    type="password"
                    id="password"
                    name="password"
                    placeholder="******"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                </div>

                <Link to="/forget-password" className={styles.forgotPassword}>
                  Forgot password?
                </Link>
              </div>

              <button
                type="submit"
                disabled={loading}
                className={styles.loginButton}
              >
                {loading ? (
                  <span className={styles.loadingIndicator}>
                    <FaSpinner className="fa-spin" /> Processing...
                  </span>
                ) : (
                  <>
                    Log In <FaChevronRight />
                  </>
                )}
              </button>
            </form>

            <div className={styles.signupPrompt}>
              Don't have an account? <Link to="/signup">Sign up</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
