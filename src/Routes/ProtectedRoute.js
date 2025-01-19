import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  const usuarioId = localStorage.getItem("usuarioId");

  useEffect(() => {
    // Função para limpar o localStorage ao fechar a guia
    const limparLocalStorage = () => {
      localStorage.clear(); // Ou use localStorage.removeItem("nomeDoItem") para remover um item específico
    };

    // Adiciona o evento beforeunload
    window.addEventListener("beforeunload", limparLocalStorage);

    // Cleanup do evento quando o componente for desmontado
    return () => {
      window.removeEventListener("beforeunload", limparLocalStorage);
    };
  }, []);

  if (usuarioId === null || usuarioId === undefined) {
    return <Navigate to="/" />; // Redireciona para a página inicial se não estiver autenticado
  }

  return children; // Renderiza os filhos se o usuário estiver autenticado
}

export default ProtectedRoute;
