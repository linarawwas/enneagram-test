import React, { useEffect } from "react";
import AdminRouter from "../Router/AdminRouter";
import Test from "../Pages/UserPages/Test/Test.tsx";
import { useDispatch, useSelector } from "react-redux";
import { fetchAuthenticatedMe } from "../features/auth/authApi"; // Adjust import to match your structure

function Layout() {
  const dispatch = useDispatch();
  const is_admin = useSelector((state) => state.auth.me.isAdmin);

  useEffect(() => {
    dispatch(fetchAuthenticatedMe());
  }, [dispatch]);

  return <>{is_admin ? <AdminRouter /> : <Test />}</>;
}

export default Layout;
