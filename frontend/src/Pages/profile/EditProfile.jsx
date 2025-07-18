import React from "react";
import styles from "./styles/EditProfile.module.css";
import { FaUser, FaEnvelope, FaPhone, FaTimes, FaSave } from "react-icons/fa";

function EditProfile({ handleInputChange, formData, handleEditProfile }) {
  return (
    <div className={`card ${styles.editCard} ${styles.animatedCard}`}>
      <div className="card-body">
        <form onSubmit={handleEditProfile} className={styles.editForm}>
          <div className={`form-group ${styles.formGroup}`}>
            <label htmlFor="name">
              <FaUser className={styles.inputIcon} /> Full Name
            </label>
            <div className={styles.inputWrapper}>
              <input
                type="text"
                className="form-control"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Enter your full name"
              />
            </div>
          </div>

          <div className={`form-group ${styles.formGroup}`}>
            <label htmlFor="email">
              <FaEnvelope className={styles.inputIcon} /> Email Address
            </label>
            <div className={styles.inputWrapper}>
              <input
                type="email"
                className="form-control"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                disabled
                placeholder="Your email address"
              />
            </div>
          </div>

          <div className={`form-group ${styles.formGroup}`}>
            <label htmlFor="phone">
              <FaPhone className={styles.inputIcon} /> Phone Number
            </label>
            <div className={styles.inputWrapper}>
              <input
                type="tel"
                className="form-control"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="Enter your phone number"
              />
            </div>
          </div>

          <div className={styles.formActions}>
            <button type="submit" className={`btn ${styles.saveButton}`}>
              <FaSave className={styles.buttonIcon} /> Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditProfile;
