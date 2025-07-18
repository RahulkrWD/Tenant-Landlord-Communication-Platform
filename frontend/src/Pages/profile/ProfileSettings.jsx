import React, { useState } from "react";
import styles from "./styles/Profile.module.css";
import { FaMoon, FaSun, FaBell, FaLock } from "react-icons/fa";

function ProfileSettings() {
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);
  return (
    <div className={`card ${styles.settingsCard} ${styles.animatedCard}`}>
      <div className="card-body">
        <div className={styles.settingsGrid}>
          <div className={`form-check form-switch ${styles.settingItem}`}>
            <input
              className="form-check-input"
              type="checkbox"
              id="darkModeSwitch"
              checked={darkMode}
              onChange={() => setDarkMode(!darkMode)}
            />
            <label className="form-check-label" htmlFor="darkModeSwitch">
              {darkMode ? (
                <FaSun className={styles.settingIcon} />
              ) : (
                <FaMoon className={styles.settingIcon} />
              )}{" "}
              Dark Mode
            </label>
          </div>

          <div className={`form-check form-switch ${styles.settingItem}`}>
            <input
              className="form-check-input"
              type="checkbox"
              id="notificationsSwitch"
              checked={notifications}
              onChange={() => setNotifications(!notifications)}
            />
            <label className="form-check-label" htmlFor="notificationsSwitch">
              <FaBell className={styles.settingIcon} /> Notifications
            </label>
          </div>

          <div className={styles.settingItem}>
            <button className={`btn ${styles.actionButton}`}>
              <FaLock /> Change Password
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileSettings;
