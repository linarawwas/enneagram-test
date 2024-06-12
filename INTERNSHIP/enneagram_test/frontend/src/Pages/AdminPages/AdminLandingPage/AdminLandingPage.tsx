import React, { useState, useEffect } from "react";
import ButtonAppBar from "../../../components/UserComponents/ButtonAppBar.tsx";
const AdminLandingPage: React.FC = () => {
  return (
    <>
      {" "}
      <ButtonAppBar />
      <div className="hero-section">
        <h1>Welcome to the Admin Dashboard</h1>
      </div>
      <div className="footer">
        <p>&copy; 2024 by Lina Rawas. All Rights Reserved.</p>
      </div>
    </>
  );
};

export default AdminLandingPage;
