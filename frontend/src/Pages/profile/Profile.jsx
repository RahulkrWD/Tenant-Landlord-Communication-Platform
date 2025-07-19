import React, { useState, useEffect } from "react";
import Layout from "../../Components/Layout/Layout";
import styles from "./styles/Profile.module.css";
import { useNavigate } from "react-router-dom";
import { FaUser, FaEdit, FaCog } from "react-icons/fa";
import ProfileDetails from "./ProfileDetails";
import ProfileSettings from "./ProfileSettings";
import EditProfile from "./EditProfile";
import axios from "axios";
import { url } from "../../utils/baseurl";

function Profile() {
  const token = JSON.parse(sessionStorage.getItem("token"));
  const [activeTab, setActiveTab] = useState("profile");
  const [userProfile, setUserProfile] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserProfile((prev) => ({ ...prev, [name]: value }));
  };

  // update profile
  const updateProfile = async (data) => {
    try {
      await axios.patch(`${url}/auth/profile`, data, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
    } catch (error) {
      console.log(error.response?.data?.message);
    }
  };

  // handle edit profile
  const handleEditProfile = (e) => {
    e.preventDefault();
    updateProfile(userProfile);
    setActiveTab("profile");
  };

  //fetch profile data
  const fetchProfile = async () => {
    try {
      const response = await axios.get(`${url}/auth/profile`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });
      setUserProfile(response.data.data || {});
    } catch (error) {
      console.log(error.response?.data?.message);
    }
  };
  useEffect(() => {
    fetchProfile();
  }, []);
  return (
    <Layout>
      <div className={`container ${styles.profileContainer}`}>
        <h3 className={styles.profileTitle}>
          <FaUser className={styles.titleIcon} /> My Account
        </h3>

        {/* Tab Navigation */}
        <div className={styles.tabContainer}>
          <button
            className={`${styles.tabButton} ${
              activeTab === "profile" ? styles.activeTab : ""
            }`}
            onClick={() => setActiveTab("profile")}
          >
            <FaUser /> Profile
          </button>
          <button
            className={`${styles.tabButton} ${
              activeTab === "settings" ? styles.activeTab : ""
            }`}
            onClick={() => setActiveTab("settings")}
          >
            <FaCog /> Settings
          </button>
          <button
            className={`${styles.tabButton} ${
              activeTab === "edit" ? styles.activeTab : ""
            }`}
            onClick={() => setActiveTab("edit")}
          >
            <FaEdit /> Edit Profile
          </button>
        </div>

        {/* Tab Content */}
        <div className={styles.tabContent}>
          {/* Profile Tab */}
          {activeTab === "profile" && (
            <ProfileDetails profileData={userProfile} />
          )}

          {/* Settings Tab */}
          {activeTab === "settings" && <ProfileSettings />}

          {/* Edit Profile Tab */}
          {activeTab === "edit" && (
            <EditProfile
              handleInputChange={handleInputChange}
              handleEditProfile={handleEditProfile}
              formData={userProfile}
            />
          )}
        </div>
      </div>
    </Layout>
  );
}

export default Profile;
