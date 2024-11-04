import React from "react";
import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  const isAuth = localStorage.getItem("isAuth")
  console.log("Esta aqui",isAuth); 

  if (isAuth === "") {
    return <Navigate to="/" />; // Redireciona para a página inicial se não estiver autenticado
  }

  return children; // Renderiza os filhos se o usuário estiver autenticado
}

export default ProtectedRoute;
