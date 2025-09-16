import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UserProvider from "./context/userContext";
import PrivateRoute from "./routes/PrivateRoute";
import SignUp from "./pages/Auth/SignUp";
import SignIn from "./pages/Auth/SignIn";
import Dashboard from "./pages/Admin/Dashboard";
import QandALightMode from "./pages/QandA/QandALightMode";
import LandingPage from "./pages/Home/LandingPage";

const App = () => {
  return (
    <div>
      <UserProvider>
        {" "}
        <Router>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />

            <Route element={<PrivateRoute allowedRoles={["admin"]} />}>
              <Route path="/admin/dashboard" element={<Dashboard />} />
            </Route>

            <Route element={<PrivateRoute allowedRoles={["user"]} />}>
              <Route path="/user/qanda/light" element={<QandALightMode />} />
            </Route>
          </Routes>
        </Router>
      </UserProvider>
    </div>
  );
};

export default App;
