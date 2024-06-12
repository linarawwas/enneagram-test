import { Route, Routes } from "react-router-dom";
import Test from "../Pages/EmployeePages/EmployeeLandingPage/Test.tsx";
import AuthenticateUser from "../Pages/SharedPages/AuthenticateUser/AuthenticateUser.tsx";
function EmployeeRouter() {
  return (
    <div className="userRouter">
      <Routes>
        <Route path="/test" element={<Test />} />
        <Route path="/authenticateUser" element={<AuthenticateUser />} />

      </Routes>
    </div>
  );
}

export default EmployeeRouter;
