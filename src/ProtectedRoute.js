import React from "react";
import { Navigate } from "react-router-dom";
function ProtectedRoute({ isAuth, children }) {
  if (isAuth) {
    return children;
  }
  return <Navigate to="/" replace />;
}
export default ProtectedRoute;
