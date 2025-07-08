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
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className={`${styles.navbar} navbar`}>
      <div className={`container ${styles.navContainer}`}>
        {/* Brand Logo/Name */}
        <div className={styles.brand}>
          <span className={styles.brandPrefix}>
            <FaBuilding className={styles.brandIcon} /> {/* or FaHome/FaKey */}
          </span>
          <span className={styles.brandName}>HavenKey</span>
        </div>

        {/* Desktop Navigation */}
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

        {/* Mobile Menu Button */}
        <button
          className={styles.mobileMenuButton}
          onClick={toggleMobileMenu}
          aria-label="Toggle navigation"
        >
          {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
        </button>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
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
      </div>
    </nav>
  );
};

export default Navbar;
