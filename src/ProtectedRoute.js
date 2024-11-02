import React from "react";
import { Navigate } from "react-router-dom";
function ProtectedRoute({ children }) {
  const isAuth = localStorage.getItem("isAuth")
  if (isAuth) {
    return children;
  }
  return <Navigate to="/" />;
}
export default ProtectedRoute;
