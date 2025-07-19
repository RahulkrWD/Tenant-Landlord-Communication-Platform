import React, { useState } from "react";
import styles from "./styles/Navbar.module.css";
import {
  FaChevronRight,
  FaUser,
  FaQuestionCircle,
  FaBars,
  FaTimes,
  FaBuilding,
} from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import getRole from "../../utils/checkRole";
const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const token = JSON.parse(sessionStorage.getItem("token"));
  const role = getRole(token);
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const logout = () => {
    sessionStorage.removeItem("token");
    navigate("/login");
  };
  return (
    <nav className={`${styles.navbar} navbar`}>
      <div className={`container ${styles.navContainer}`}>
        {/* Brand Logo/Name */}
        <div className={styles.brand}>
          <Link className="text-decoration-none" to="/">
            <span className={styles.brandPrefix}>
              <FaBuilding className={styles.brandIcon} />{" "}
              {/* or FaHome/FaKey */}
            </span>
            <span className={styles.brandName}>HavenKey</span>
          </Link>
        </div>

        {/* Desktop Navigation*/}
        <div className={styles.navLinks}>
          <Link
            to={
              role
                ? role == "landlord"
                  ? "/dashboard"
                  : "/browse-properties"
                : "/property-managers"
            }
            className={styles.navLink}
          >
            <span>
              {role
                ? role == "landlord"
                  ? "dashboard"
                  : "browse properties"
                : "property managers"}
            </span>
            <div className={styles.linkUnderline}></div>
          </Link>

          <Link
            to={
              role
                ? role == "landlord"
                  ? "/properties"
                  : "/my-properties"
                : "/faqs"
            }
            className={styles.navLink}
          >
            <FaQuestionCircle className={styles.navIcon} />
            <span>
              {role
                ? role == "landlord"
                  ? "properties"
                  : "my properties"
                : "faqs"}
            </span>
            <div className={styles.linkUnderline}></div>
          </Link>

          <Link to={role ? "/profile" : "/login"} className={styles.navLink}>
            <FaUser className={styles.navIcon} />
            <span>{role ? "profile/settings" : "sign In"}</span>
            <div className={styles.linkUnderline}></div>
          </Link>
          {role ? (
            <button
              onClick={logout}
              className={`${styles.navLink} ${styles.demoButton}`}
            >
              <span>Logout</span>
              <FaChevronRight className={styles.buttonIcon} />
              <div className={styles.buttonHoverEffect}></div>
            </button>
          ) : (
            <Link
              to="/schedule-demo"
              className={`${styles.navLink} ${styles.demoButton}`}
            >
              <span>SCHEDULE DEMO</span>
              <FaChevronRight className={styles.buttonIcon} />
              <div className={styles.buttonHoverEffect}></div>
            </Link>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className={styles.mobileMenuButton}
          onClick={toggleMobileMenu}
          aria-label="Toggle navigation"
        >
          {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
        </button>

        {/* Mobile Navigation*/}
        {isMobileMenuOpen && (
          <div className={styles.mobileMenu}>
            <Link
              to={
                role
                  ? role == "landlord"
                    ? "/dashboard"
                    : "/browse-properties"
                  : "/property-managers"
              }
              className={styles.mobileNavLink}
            >
              {role
                ? role == "landlord"
                  ? "dashboard"
                  : "browse properties"
                : "property managers"}
            </Link>

            <Link
              to={
                role
                  ? role == "landlord"
                    ? "/properties"
                    : "/my-properties"
                  : "/faqs"
              }
              className={styles.mobileNavLink}
            >
              <FaQuestionCircle className={styles.mobileNavIcon} />
              {role
                ? role == "landlord"
                  ? "properties"
                  : "my properties"
                : "faqs"}
            </Link>
            <Link
              to={role ? "/profile" : "/login"}
              className={styles.mobileNavLink}
            >
              <FaUser className={styles.mobileNavIcon} />{" "}
              {role ? "profile/settings" : "sign In"}
            </Link>
            {role ? (
              <button onClick={logout} className={styles.mobileDemoButton}>
                Logout <FaChevronRight />
              </button>
            ) : (
              <Link to="/schedule-demo" className={styles.mobileDemoButton}>
                SCHEDULE DEMO <FaChevronRight />
              </Link>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
