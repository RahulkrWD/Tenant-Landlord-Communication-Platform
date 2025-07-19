import React, { useEffect, useState } from "react";
import styles from "./styles/Signup.module.css";
import {
  FaUserTie,
  FaUser,
  FaEnvelope,
  FaLock,
  FaPhone,
  FaBuilding,
  FaHome,
  FaChevronRight,
  FaCheck,
  FaArrowLeft,
  FaExclamationCircle,
  FaSpinner,
} from "react-icons/fa";
import LoginImage from "../../assets/login-images.webp";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { url } from "../../utils/baseurl";

const Signup = () => {
  // toggle landlord and tenant
  const [userType, setUserType] = useState("landlord");
  // steps
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const token = JSON.parse(sessionStorage.getItem("token"));
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, [token]);

  // fill the form
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // next step
  const nextStep = () => setCurrentStep(currentStep + 1);
  // prev step
  const prevStep = () => setCurrentStep(currentStep - 1);

  // axios
  const postData = async (data) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post(`${url}/auth/signup`, data);
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

  // submit form
  const handleSumit = (e) => {
    e.preventDefault();
    let data = {
      role: userType,
      ...formData,
    };
    postData(data);
  };

  return (
    <div className={styles.signupContainer}>
      <div className={styles.signupCard}>
        {/* Left Side - Visual */}
        <div className={styles.visualSide}>
          <div className={styles.imageContainer}>
            <img
              src={LoginImage}
              alt={
                userType === "landlord" ? "Property manager" : "Happy tenant"
              }
              className={styles.heroImage}
            />
            <div className={styles.imageOverlay}></div>
          </div>

          <div className={styles.visualContent}>
            <h2>Join HavenKey</h2>
            <div className={styles.benefitsList}>
              <div className={styles.benefitItem}>
                <FaCheck className={styles.checkIcon} />
                <span>
                  {userType === "landlord"
                    ? "Streamline property management"
                    : "Find your dream home"}
                </span>
              </div>
              <div className={styles.benefitItem}>
                <FaCheck className={styles.checkIcon} />
                <span>
                  {userType === "landlord"
                    ? "Automate rent collection"
                    : "Verified landlords only"}
                </span>
              </div>
              <div className={styles.benefitItem}>
                <FaCheck className={styles.checkIcon} />
                <span>
                  {userType === "landlord"
                    ? "Digital lease agreements"
                    : "24/7 support"}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Form */}
        <div className={styles.formSide}>
          <Link to="/" className={styles.backHome}>
            <FaArrowLeft className="me-2" />
            Back to Home
          </Link>
          {/* Progress Steps */}
          <div className={styles.progressSteps}>
            <div
              className={`${styles.step} ${
                currentStep >= 1 ? styles.active : ""
              }`}
            >
              <div className={styles.stepNumber}>1</div>
              <div className={styles.stepLabel}>Account Type</div>
            </div>
            <div
              className={`${styles.step} ${
                currentStep >= 2 ? styles.active : ""
              }`}
            >
              <div className={styles.stepNumber}>2</div>
              <div className={styles.stepLabel}>Details</div>
            </div>
          </div>

          {/* Step 1: User Type Selection */}
          {currentStep === 1 && (
            <div className={styles.stepContent}>
              <h3>Create Your Account</h3>
              <p className={styles.stepSubtitle}>
                Select your account type to get started
              </p>

              <div className={styles.userTypeCards}>
                <div
                  className={`${styles.userTypeCard} ${
                    userType === "landlord" ? styles.selected : ""
                  }`}
                  onClick={() => setUserType("landlord")}
                >
                  <div className={styles.cardIcon}>
                    <FaBuilding />
                  </div>
                  <h4>I'm a Landlord</h4>
                  <p>Manage properties, collect rent, and screen tenants</p>
                  <div className={styles.selectionIndicator}>
                    {userType === "landlord" && <FaCheck />}
                  </div>
                </div>

                <div
                  className={`${styles.userTypeCard} ${
                    userType === "tenant" ? styles.selected : ""
                  }`}
                  onClick={() => setUserType("tenant")}
                >
                  <div className={styles.cardIcon}>
                    <FaHome />
                  </div>
                  <h4>I'm a Tenant</h4>
                  <p>Find rentals, pay rent, and submit maintenance requests</p>
                  <div className={styles.selectionIndicator}>
                    {userType === "tenant" && <FaCheck />}
                  </div>
                </div>
              </div>

              <button className={styles.primaryButton} onClick={nextStep}>
                Continue <FaChevronRight />
              </button>
            </div>
          )}

          {/* Step 2: Registration Form */}
          {currentStep === 2 && (
            <div className={styles.stepContent}>
              <h3>Your Information</h3>
              <p className={styles.stepSubtitle}>
                Please provide your details to create your account
              </p>
              {error && (
                <div className={styles.errorMessage}>
                  <FaExclamationCircle /> {error}
                </div>
              )}

              <form onSubmit={handleSumit} className={styles.registrationForm}>
                <div className={styles.formRow}>
                  <div className={styles.inputGroup}>
                    <label>
                      {userType === "landlord" ? "Full Name" : "Your Name"}
                    </label>
                    <div className={styles.inputWithIcon}>
                      {userType === "landlord" ? <FaUserTie /> : <FaUser />}
                      <input
                        type="text"
                        name="name"
                        placeholder={
                          userType === "landlord"
                            ? "John Smith"
                            : "Alex Johnson"
                        }
                        value={formData.name}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>

                  <div className={styles.inputGroup}>
                    <label>Email Address</label>
                    <div className={styles.inputWithIcon}>
                      <FaEnvelope />
                      <input
                        type="email"
                        name="email"
                        placeholder="your@email.com"
                        value={formData.email}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className={styles.formRow}>
                  <div className={styles.inputGroup}>
                    <label>Phone Number</label>
                    <div className={styles.inputWithIcon}>
                      <FaPhone />
                      <input
                        type="tel"
                        name="phone"
                        placeholder="+1 (555) 123-4567"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>

                  <div className={styles.inputGroup}>
                    <label>Password</label>
                    <div className={styles.inputWithIcon}>
                      <FaLock />
                      <input
                        type="password"
                        name="password"
                        placeholder="********"
                        value={formData.password}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className={styles.formActions}>
                  <button
                    type="button"
                    className={styles.secondaryButton}
                    onClick={prevStep}
                    disabled={loading}
                  >
                    Back
                  </button>

                  <button
                    type="submit"
                    className={styles.primaryButton}
                    disabled={loading}
                  >
                    {loading ? (
                      <span className={styles.loadingIndicator}>
                        <FaSpinner className="fa-spin" /> Processing...
                      </span>
                    ) : (
                      <>
                        Create Account <FaChevronRight />
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          )}

          <div className={styles.loginPrompt}>
            Already have an account? <Link to="/login">Log in</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
