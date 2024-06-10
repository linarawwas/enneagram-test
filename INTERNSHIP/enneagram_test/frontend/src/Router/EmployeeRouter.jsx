import { Route, Routes } from "react-router-dom";
import EmployeeLandingPage from "../Pages/EmployeePages/EmployeeLandingPage/EmployeeLandingPage.tsx";
import SignInSide from "../Pages/SharedPages/SignIn/SignIn.tsx";
function EmployeeRouter() {
  return (
    <div className="userRouter">
      <Routes>
        <Route index element={<EmployeeLandingPage />} />
        <Route path="/SignIn" element={<SignInSide />} />
      </Routes>
    </div>
  );
}

export default EmployeeRouter;
