
import Layout from "./Layout/Layout";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { setToken } from "./redux/UserInfo/action.js";
import "react-toastify/dist/ReactToastify.css";
import "./index.css";
import { useDispatch } from "react-redux";
import SignInSide from "./Pages/SharedPages/SignIn/SignIn.tsx";
function App() {

  const dispatch = useDispatch();
  const token = localStorage.getItem("token");
  dispatch(setToken(token));
  const isAuthenticated = token !== null && token !== undefined;
  return (
    <Router>
      <Routes>
        <Route
          path="/signIn"
          element={isAuthenticated ? <Navigate to="/" /> : <SignInSide />}
        />
        <Route
          path="/*"
          element={isAuthenticated ? <Layout /> : <Navigate to="/signIn" />}
        />
      </Routes>
    </Router>
  );
}
export default App;
