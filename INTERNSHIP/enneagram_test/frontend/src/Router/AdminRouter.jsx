import { Route, Routes } from "react-router-dom";
import AdminLandingPage from "../Pages/AdminPages/AdminLandingPage/AdminLandingPage.tsx";
import SignInSide from "../Pages/SharedPages/SignIn/SignIn.tsx";
function AdminRouter() {
  return (
    <>
      <div className="userRouter">
        <Routes>
          <Route index element={<AdminLandingPage />} />
          <Route path="/SignIn" element={<SignInSide />} />
        </Routes>
      </div>
    </>
  );
}

export default AdminRouter;
