import React, { useState, useEffect } from "react";
import "./LandingPage.css";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
const AdminLandingPage: React.FC = () => {
  const name = useSelector((state: RootState) => state.user.username);
  return (
    <div className="landing-page">
      <div className="hero-section">
        <h1>Welcome to TRX, {name}</h1>
        <p>A powerful inventory management system</p>
      </div>
      <div className="footer">
        <p>&copy; 2023 TRX by Lina Rawas. All Rights Reserved.</p>
      </div>
    </div>
  );
};

export default AdminLandingPage;
