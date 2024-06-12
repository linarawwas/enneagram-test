import { Route, Routes } from "react-router-dom";
import AdminLandingPage from "../Pages/AdminPages/AdminLandingPage/AdminLandingPage.tsx";
import AuthenticateUser from "../Pages/SharedPages/AuthenticateUser/AuthenticateUser.tsx";
function AdminRouter() {
  return (
    <>
      <div className="userRouter">
        <Routes>
          <Route index element={<AdminLandingPage />} />
          <Route path="/authenticateUser/*" element={<AuthenticateUser />} />
        </Routes>
      </div>
    </>
  );
}

export default AdminRouter;
