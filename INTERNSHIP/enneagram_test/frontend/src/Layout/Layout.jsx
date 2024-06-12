import React, { useEffect } from "react";
import Test from "../Pages/UserPages/Test/Test.tsx";
import { useDispatch, useSelector } from "react-redux";
import { fetchAuthenticatedMe } from "../features/auth/authApi"; // Adjust import to match your structure

function Layout() {
  const dispatch = useDispatch();
  const isAdmin = useSelector((state) => state.auth.me.isAdmin);

  useEffect(() => {
    dispatch(fetchAuthenticatedMe());
  }, [dispatch]);

  useEffect(() => {
    if (isAdmin) {
      window.location.href = "http://localhost:3001/";
    }
  }, [isAdmin]);

  return <>{isAdmin ? null : <Test />}</>;
}

export default Layout;
