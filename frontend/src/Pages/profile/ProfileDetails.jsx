import React from "react";
import styles from "./styles/Profile.module.css";
import { FaEnvelope, FaPhone, FaUserShield } from "react-icons/fa";

function ProfileDetails({ profileData }) {
  return (
    <div className={`card ${styles.profileCard} ${styles.animatedCard}`}>
      <div className="card-body">
        <div className={styles.profileGrid}>
          <div className={styles.profileItem}>
            <span className={styles.label}>Name:</span>
            <span className={styles.value}>{profileData.name}</span>
          </div>
          <div className={styles.profileItem}>
            <span className={styles.label}>Email:</span>
            <span className={styles.value}>
              <FaEnvelope className={styles.icon} /> {profileData.email}
            </span>
          </div>
          <div className={styles.profileItem}>
            <span className={styles.label}>Phone:</span>
            <span className={styles.value}>
              <FaPhone className={styles.icon} /> {profileData.phone}
            </span>
          </div>
          <div className={styles.profileItem}>
            <span className={styles.label}>Role:</span>
            <span className={styles.value}>
              <FaUserShield className={styles.icon} /> {profileData.role}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileDetails;
