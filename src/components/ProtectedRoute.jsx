import { Navigate, Outlet } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const token = localStorage.getItem("token");
  const hasPin = localStorage.getItem("has_pin");

  if (!token) {
    return <Navigate to="/auth/login" replace />;
  }

  if (hasPin !== "true") {
    return <Navigate to="/enter-pin" replace />;
  }

  return children || <Outlet />;
}
