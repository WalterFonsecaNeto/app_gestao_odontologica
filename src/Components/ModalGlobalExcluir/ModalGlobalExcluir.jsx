import React from "react";
import styles from "./ModalGlobalExcluir.module.css";

function ModalGlobal({ titulo, mensagem, onConfirmar, onCancelar, visivel }) {
  if (!visivel) return null;

  return (
    <div className={styles.modal}>
      <div className={styles.modalContent}>
        <h3>{titulo}</h3>
        <p>{mensagem}</p>
        <div className={styles.modalActions}>
          <button onClick={onConfirmar} className={styles.confirmButton}>Confirmar</button>
          <button onClick={onCancelar} className={styles.cancelButton}>Cancelar</button>
        </div>
      </div>
    </div>
  );
}

export default ModalGlobal;
