import React from "react";
import styles from "./ModalGlobalAdicionar.module.css"; 

function Modal({ titulo, fecharModal, children }) {
  return (
    <div className={styles.modalBackdrop}>
      <div className={styles.modalContent}>
        <header className={styles.modalHeader}>
          <h2>{titulo}</h2>
          <button onClick={fecharModal} className={styles.closeButton}>
            X
          </button>
        </header>
        <div className={styles.modalBody}>{children}</div>
      </div>
    </div>
  );
}

export default Modal;
