import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "react-toastify/dist/ReactToastify.css";
import "./index.css";
import Layout from "./Layout/Layout.jsx";
import AuthenticateUser from "./Pages/SharedPages/AuthenticateUser/AuthenticateUser.tsx";
import { checkAuthToken } from "./features/auth/authSlice";
import { useEffect } from "react";
import { fetchAuthenticatedMe } from "./features/auth/authApi.js";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkAuthToken());
    dispatch(fetchAuthenticatedMe());
  }, [dispatch]);

  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  return (
    <Router>
      <Routes>
        <Route
          path="/*" 
          element={
            isAuthenticated ? <Layout /> : <Navigate to="/authenticateUser" />
          }
        />
        <Route
          path="/authenticateUser"
          element={!isAuthenticated ? <AuthenticateUser /> : <Layout />}
        />
      </Routes>
    </Router>
  );
}

export default App;
