import { useEffect } from "react";
import { Route, BrowserRouter as Router, Routes, useLocation } from "react-router-dom";
import { SidebarProvider } from "./contexts/AuthContext";
import Homepage from "./pages/Homepage";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsCondition from "./pages/TermsCondition";
import Login from "./pages/user/auth/Login";
import Signup from "./pages/user/auth/Signup";
import Cancel from "./pages/user/subscription/Cancel";
import Success from "./pages/user/subscription/Success";
import RoleBasedRoutes from "./routes/RoleBasedRoutes";
import { addOrRemoveBodyClass } from "./utils/helper";

const BodyClassHandler = ({ children }) => {
  const location = useLocation();

  useEffect(() => {
    const publicRoutes = ["/", "/terms-conditions", "/privacy-policy"];
    if (publicRoutes.includes(location.pathname)) {
      addOrRemoveBodyClass(false);
    } else {
      addOrRemoveBodyClass(true);
    }
  }, [location]);

  return children;
};

function App() {
  return (
    <>
      <SidebarProvider>
        <Router>
          <BodyClassHandler>
            <Routes>
              <Route path="/" element={<Homepage />} />
              <Route path="/terms-conditions" element={<TermsCondition />} />
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/success" element={<Success />} />
              <Route path="/cancel" element={<Cancel />} />
              <Route path="/*" element={<RoleBasedRoutes />} />
            </Routes>
          </BodyClassHandler>
        </Router>
      </SidebarProvider>
    </>
  );
}

export default App;
