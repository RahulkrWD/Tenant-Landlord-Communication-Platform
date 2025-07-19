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
import Image from "../../assets/login-images.webp";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { url } from "../../utils/baseurl";

const Login = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const token = JSON.parse(sessionStorage.getItem("token"));
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
  const postData = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post(`${url}/auth/login`, formData);
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
              src={Image}
              alt="Property manager"
              className={styles.heroImage}
            />
            <div className={styles.imageOverlay}></div>
          </div>

          <div className={styles.visualContent}>
            <h2>Welcome Back</h2>
            <p className={styles.welcomeMessage}>
              Manage your properties with ease <br />
              Access your rental dashboard
            </p>
            <div className={styles.userTypeToggle}>
              <button className={styles.toggleButton}>
                <FaUserTie className={styles.toggleIcon} />
                Landlord Login
              </button>
              <button className={styles.toggleButton}>
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
