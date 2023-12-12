import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const RequireAuth = ({ allowedRoles }) => {
  const userData = useSelector((state) => state.userProfile);
  const { roles } = userData;
  const location = useLocation();
  return roles === allowedRoles ? (
    <Outlet />
  ) : roles ? (
    <Navigate to="/unauthorized" state={{ from: location }} replace />
  ) : (
    <Navigate to="/" state={{ from: location }} replace />
  );
};

export default RequireAuth;
