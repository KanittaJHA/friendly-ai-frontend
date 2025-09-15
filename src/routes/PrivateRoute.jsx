import { Navigate, Outlet } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../context/userContext";

const PrivateRoute = ({ allowedRoles }) => {
  const { user, loading } = useContext(UserContext);

  if (loading) return <div>Loading...</div>;

  if (!user) return <Navigate to="/signin" replace />;

  if (!user.role || !allowedRoles.includes(user.role)) {
    const redirectPath =
      user.role === "admin" ? "/admin/dashboard" : "/user/qanda/light";
    return <Navigate to={redirectPath} replace />;
  }

  return <Outlet />;
};

export default PrivateRoute;
