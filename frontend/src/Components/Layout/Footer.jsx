import React from "react";
import styles from "./styles/Footer.module.css";
import {
  FaFacebook,
  FaTwitter,
  FaLinkedin,
  FaInstagram,
  FaPhone,
  FaEnvelope,
  FaChevronRight,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className={`${styles.footer} bg-dark text-white py-5`}>
      <div className="container">
        <div className={styles.footerGrid}>
          {/* Solution Column */}
          <div className={styles.footerColumn}>
            <h5 className={styles.footerHeading}>Solution</h5>
            <ul className="list-unstyled">
              <li>
                <a href="#" className={styles.footerLink}>
                  Property Managers
                </a>
              </li>
              <li>
                <a href="#" className={styles.footerLink}>
                  Residents
                </a>
              </li>
              <li>
                <a href="#" className={styles.footerLink}>
                  Security
                </a>
              </li>
            </ul>
          </div>

          {/* Company Column */}
          <div className={styles.footerColumn}>
            <h5 className={styles.footerHeading}>Company</h5>
            <ul className="list-unstyled">
              <li>
                <a href="#" className={styles.footerLink}>
                  About
                </a>
              </li>
              <li>
                <a href="#" className={styles.footerLink}>
                  Careers
                </a>
              </li>
              <li>
                <a href="#" className={styles.footerLink}>
                  Contact us
                </a>
              </li>
            </ul>
          </div>

          {/* Resources Column */}
          <div className={styles.footerColumn}>
            <h5 className={styles.footerHeading}>Resources</h5>
            <ul className="list-unstyled">
              <li>
                <a href="#" className={styles.footerLink}>
                  Blog
                </a>
              </li>
              <li>
                <a href="#" className={styles.footerLink}>
                  Help Center
                </a>
              </li>
            </ul>
          </div>

          {/* Get Started Column */}
          <div className={styles.footerColumn}>
            <h5 className={styles.footerHeading}>Get started</h5>
            <ul className="list-unstyled">
              <li>
                <a
                  href="#"
                  className={`${styles.footerLink} ${styles.demoLink}`}
                >
                  GET A DEMO <FaChevronRight className="ms-1" />
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className={styles.contactInfo}>
            <div className="mb-3">
              <a href="#" className={styles.contactLink}>
                <FaPhone className="me-2" /> (987) 657-1234
              </a>
            </div>
            <div>
              <a href="#" className={styles.contactLink}>
                <FaEnvelope className="me-2" /> help@havenkey.com
              </a>
            </div>
          </div>
        </div>

        {/* Social Icons */}
        <div className={styles.socialIcons}>
          <a href="#" aria-label="Facebook">
            <FaFacebook />
          </a>
          <a href="#" aria-label="Twitter">
            <FaTwitter />
          </a>
          <a href="#" aria-label="LinkedIn">
            <FaLinkedin />
          </a>
          <a href="#" aria-label="Instagram">
            <FaInstagram />
          </a>
        </div>

        {/* Bottom Footer */}
        <div className={styles.bottomFooter}>
          <div className={styles.bottomLinks}>
            <a href="#">Terms & Conditions</a>
            <a href="#">Privacy Policy</a>
          </div>
          <div className={styles.logo}>
            <h3>HavenKey</h3>
          </div>
          <div className={styles.copyright}>
            ©2021 HavenKey, Inc.
            <br />
            All Rights Reserved. HavenKey is a registered trademark.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
