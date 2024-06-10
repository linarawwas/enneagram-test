import React, { useState, useEffect } from "react";
import "./LandingPage.css";
const AdminLandingPage: React.FC = () => {
  return (
    <div className="landing-page">
      <div className="hero-section">
        <h1>Welcome to TRX</h1>
        <p>A powerful inventory management system</p>
      </div>
      <div className="footer">
        <p>&copy; 2023 TRX by Lina Rawas. All Rights Reserved.</p>
      </div>
    </div>
  );
};

export default AdminLandingPage;
