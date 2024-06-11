import React from "react";
import AdminRouter from "../Router/AdminRouter";
import Test from "../Pages/UserPages/Test/Test.tsx";
function Layout() {
  let is_admin = false;
  return <>{is_admin ? <AdminRouter /> : <Test />}</>;
}

export default Layout;
