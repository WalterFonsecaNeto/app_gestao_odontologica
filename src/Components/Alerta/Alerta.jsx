import React from "react";
import styles from "./Alerta.module.css";

function Alerta({ tipo, mensagem, visivel, aoFechar }) {
  if (!visivel) return null;

  // Definindo as cores para cada tipo de alerta com transparência
  let corFundo;
  let corTexto;

  switch (tipo) {
    case "success":
      corFundo = "rgba(40, 167, 69, 0.8)";
      corTexto = "#ffffff";
      break;
    case "danger":
      corFundo = "rgba(255, 0, 25, 0.68)";
      corTexto = "#ffffff";
      break;
    case "warning":
      corFundo = "rgba(255, 193, 7, 0.8)";
      corTexto = "#000000";
      break;
    case "info":
      corFundo = "rgba(23, 162, 184, 0.8)";
      corTexto = "#ffffff";
      break;
    default:
      corFundo = "rgba(248, 249, 250, 0.8)";
      corTexto = "#000000";
      break;
  }

  return (
    <div
      className={styles.alerta}
      style={{ backgroundColor: corFundo, color: corTexto }}
    >
      <span>{mensagem}</span>
      <button className={styles.fechar} onClick={aoFechar}>
        ✖
      </button>
    </div>
  );
}

export default Alerta;
