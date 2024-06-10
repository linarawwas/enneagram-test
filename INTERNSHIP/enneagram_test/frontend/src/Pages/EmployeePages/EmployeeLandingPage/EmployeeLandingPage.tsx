import React from "react";
import "./EmployeeLandingPage.css";
import { useSelector } from "react-redux";
import "../../AdminPages/AdminLandingPage/LandingPage.css";
import { RootState } from "../../../redux/store";
const EmployeeLandingPage: React.FC = () => {
  const name = useSelector((state: RootState) => state.user.username);
  return (
    <div className="employee-landing-page">
      <h1 className="welcome-message-employee"> Welcome to TRX, {name}</h1>
      hi{" "}
    </div>
  );
};

export default EmployeeLandingPage;
