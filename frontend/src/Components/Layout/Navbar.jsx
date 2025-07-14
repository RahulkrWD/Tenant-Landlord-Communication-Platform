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

        {/* Desktop Navigation pulic */}
        {token == null && (
          <div className={styles.navLinks}>
            <Link to="/property-managers" className={styles.navLink}>
              <span>PROPERTY MANAGERS</span>
              <div className={styles.linkUnderline}></div>
            </Link>
            <Link to="/residents" className={styles.navLink}>
              <span>RESIDENTS</span>
              <div className={styles.linkUnderline}></div>
            </Link>
            <Link to="/faqs" className={styles.navLink}>
              <FaQuestionCircle className={styles.navIcon} />
              <span>FAQS</span>
              <div className={styles.linkUnderline}></div>
            </Link>

            <Link to="/login" className={styles.navLink}>
              <FaUser className={styles.navIcon} />
              <span>SIGN IN</span>
              <div className={styles.linkUnderline}></div>
            </Link>
            <Link
              to="/schedule-demo"
              className={`${styles.navLink} ${styles.demoButton}`}
            >
              <span>SCHEDULE DEMO</span>
              <FaChevronRight className={styles.buttonIcon} />
              <div className={styles.buttonHoverEffect}></div>
            </Link>
          </div>
        )}

        {/* Desktop Navigation token and role == "landlord*/}
        {token && role == "landlord" && (
          <div className={styles.navLinks}>
            <Link to="/dashboard" className={styles.navLink}>
              <span>dashboard</span>
              <div className={styles.linkUnderline}></div>
            </Link>
            <Link to="/properties" className={styles.navLink}>
              <FaQuestionCircle className={styles.navIcon} />
              <span>properties</span>
              <div className={styles.linkUnderline}></div>
            </Link>

            <Link to="/profile" className={styles.navLink}>
              <FaUser className={styles.navIcon} />
              <span>profile/settings</span>
              <div className={styles.linkUnderline}></div>
            </Link>
            <button
              onClick={logout}
              className={`${styles.navLink} ${styles.demoButton}`}
            >
              <span>Logout</span>
              <FaChevronRight className={styles.buttonIcon} />
              <div className={styles.buttonHoverEffect}></div>
            </button>
          </div>
        )}

        {/* Desktop Navigation pulic token and role == "tenant" */}
        {token && role == "tenant" && (
          <div className={styles.navLinks}>
            <Link to="/property-managers" className={styles.navLink}>
              <span>PRO</span>
              <div className={styles.linkUnderline}></div>
            </Link>
            <Link to="/residents" className={styles.navLink}>
              <span>RESIDENTS</span>
              <div className={styles.linkUnderline}></div>
            </Link>
            <Link to="/faqs" className={styles.navLink}>
              <FaQuestionCircle className={styles.navIcon} />
              <span>FAQS</span>
              <div className={styles.linkUnderline}></div>
            </Link>

            <Link to="/login" className={styles.navLink}>
              <FaUser className={styles.navIcon} />
              <span>SIGN IN</span>
              <div className={styles.linkUnderline}></div>
            </Link>
            <Link
              to="/schedule-demo"
              className={`${styles.navLink} ${styles.demoButton}`}
            >
              <span>SCHEDULE DEMO</span>
              <FaChevronRight className={styles.buttonIcon} />
              <div className={styles.buttonHoverEffect}></div>
            </Link>
          </div>
        )}

        {/* Mobile Menu Button */}
        <button
          className={styles.mobileMenuButton}
          onClick={toggleMobileMenu}
          aria-label="Toggle navigation"
        >
          {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
        </button>

        {/* Mobile Navigation public*/}
        {isMobileMenuOpen && token == null && (
          <div className={styles.mobileMenu}>
            <Link to="/property-managers" className={styles.mobileNavLink}>
              PROPERTY MANAGERS
            </Link>
            <Link to="/residents" className={styles.mobileNavLink}>
              RESIDENTS
            </Link>
            <Link to="/faqs" className={styles.mobileNavLink}>
              <FaQuestionCircle className={styles.mobileNavIcon} /> FAQS
            </Link>
            <Link to="/login" className={styles.mobileNavLink}>
              <FaUser className={styles.mobileNavIcon} /> SIGN IN
            </Link>
            <Link to="/schedule-demo" className={styles.mobileDemoButton}>
              SCHEDULE DEMO <FaChevronRight />
            </Link>
          </div>
        )}

        {/* Mobile Navigation token role = landlord */}
        {isMobileMenuOpen && token && role == "landlord" && (
          <div className={styles.mobileMenu}>
            <Link to="/dashboard" className={styles.mobileNavLink}>
              <FaQuestionCircle className={styles.mobileNavIcon} />
              dashboard
            </Link>
            <Link to="/properties" className={styles.mobileNavLink}>
              <FaQuestionCircle className={styles.mobileNavIcon} /> Properties
            </Link>
            <Link to="/profile" className={styles.mobileNavLink}>
              <FaUser className={styles.mobileNavIcon} /> Profile/Settings
            </Link>
            <button onClick={logout} className={styles.mobileDemoButton}>
              Logout <FaChevronRight />
            </button>
          </div>
        )}

        {/* Mobile Navigation token role = tenant */}
        {isMobileMenuOpen && token && role == "tenant" && (
          <div className={styles.mobileMenu}>
            <Link to="/property-managers" className={styles.mobileNavLink}>
              PROPERss
            </Link>
            <Link to="/residents" className={styles.mobileNavLink}>
              RESIDENTS
            </Link>
            <Link to="/faqs" className={styles.mobileNavLink}>
              <FaQuestionCircle className={styles.mobileNavIcon} /> FAQS
            </Link>
            <Link to="/login" className={styles.mobileNavLink}>
              <FaUser className={styles.mobileNavIcon} /> SIGN IN
            </Link>
            <Link to="/schedule-demo" className={styles.mobileDemoButton}>
              SCHEDULE DEMO <FaChevronRight />
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
