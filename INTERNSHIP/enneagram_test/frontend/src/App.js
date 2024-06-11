import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { useSelector } from "react-redux"; // Import useSelector from react-redux
import "react-toastify/dist/ReactToastify.css";
import "./index.css";
import SignInSide from "./Pages/SharedPages/SignIn/SignIn.tsx";
import Layout from "./Layout/Layout.jsx";
function App() {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  return (
    <Router>
      <Routes>
        <Route path="/signIn" element={<SignInSide />} />
        <Route
          path="/*"
          element={isAuthenticated ? <Layout /> : <Navigate to="/signIn" />}
        />
      </Routes>
    </Router>
  );
}

export default App;
