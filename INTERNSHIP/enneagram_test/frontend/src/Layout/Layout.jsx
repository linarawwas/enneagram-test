import React from "react";
import AdminRouter from "../Router/AdminRouter";
import Test from "../Pages/UserPages/Test/Test.tsx";
import { useDispatch, useSelector } from "react-redux";
import { fetchAuthenticatedMe } from "../features/auth/authApi.js";
function Layout() {
  const dispatch = useDispatch();
  dispatch(fetchAuthenticatedMe());
  let is_admin = useSelector((state) => state.auth.me.isAdmin);
  return <>{is_admin ? <AdminRouter /> : <Test />}</>;
}

export default Layout;
