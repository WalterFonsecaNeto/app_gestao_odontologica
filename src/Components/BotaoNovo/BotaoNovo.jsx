import React from "react";
import styles from "./BotaoNovo.module.css";

function BotaoNovo({ AbrirModal }) {
  return (
    <div className={styles.container_total}>
      <div className={styles.container_info}>
        <button onClick={AbrirModal} className={styles.botao_criar}>
          + Novo
        </button>
      </div>
    </div>
  );
}

export default BotaoNovo;
