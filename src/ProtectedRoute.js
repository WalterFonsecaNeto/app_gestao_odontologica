import React from "react";
import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  const isAuth = localStorage.getItem("usuarioId")

  if (isAuth === null || isAuth === undefined) {
    return <Navigate to="/" />; // Redireciona para a página inicial se não estiver autenticado
  }

  return children; // Renderiza os filhos se o usuário estiver autenticado
}

export default ProtectedRoute;
