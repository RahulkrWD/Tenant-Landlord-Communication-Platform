import React, { useState } from "react";
import styles from "./styles/ProfileSettings.module.css";
import {
  FaMoon,
  FaSun,
  FaLock,
  FaSignOutAlt,
  FaTrashAlt,
} from "react-icons/fa";

function ProfileSettings() {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div className={`card ${styles.settingsCard} ${styles.animatedCard}`}>
      <div className="card-body d-flex flex-column">
        <h5 className={styles.sectionTitle}>Account Settings</h5>

        <div className={styles.settingsGrid}>
          {/* Dark Mode Toggle */}
          <div className={styles.settingItem}>
            <div className="d-flex justify-content-between align-items-center">
              <span className={styles.settingLabel}>
                {darkMode ? (
                  <FaSun className={styles.settingIcon} />
                ) : (
                  <FaMoon className={styles.settingIcon} />
                )}{" "}
                Dark Mode
              </span>
              <div className="form-check form-switch">
                <input
                  className={`form-check-input ${styles.toggleSwitch}`}
                  type="checkbox"
                  id="darkModeSwitch"
                  checked={darkMode}
                  onChange={() => setDarkMode(!darkMode)}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons Row */}
        <div className={`mt-auto ${styles.actionButtons}`}>
          <button className={`btn ${styles.actionButton}`}>
            <FaLock className={styles.buttonIcon} /> Change Password
          </button>
          <button className={`btn ${styles.logoutButton}`}>
            <FaSignOutAlt className={styles.buttonIcon} /> Logout
          </button>
          <button className={`btn ${styles.deleteButton}`}>
            <FaTrashAlt className={styles.buttonIcon} /> Delete Account
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProfileSettings;
