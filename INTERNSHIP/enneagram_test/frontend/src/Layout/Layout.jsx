import React, { useLayoutEffect } from "react";
import AdminRouter from "../Router/AdminRouter";
import EmployeeRouter from "../Router/EmployeeRouter";
function Layout() {
  let is_admin = false;
  return <>{is_admin ? <AdminRouter /> : <EmployeeRouter />}</>;
}

export default Layout;
