import { Route, Routes } from "react-router-dom";
import Test from "../Pages/EmployeePages/EmployeeLandingPage/Test.tsx";
import SignInSide from "../Pages/SharedPages/SignIn/SignIn.tsx";
function EmployeeRouter() {
  return (
    <div className="userRouter">
      <Routes>
        <Route index element={<Test />} />
        <Route path="/SignIn" element={<SignInSide />} />
      </Routes>
    </div>
  );
}

export default EmployeeRouter;
