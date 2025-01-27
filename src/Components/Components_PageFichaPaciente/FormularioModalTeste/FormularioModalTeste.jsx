import React, { useState } from "react";
import ModalGlobal from "../../ModalGlobal/ModalGlobal";
import styles from "./FormularioModalTeste.module.css"; // Importa o CSS do formulário

const FormularioModalTeste = () => {
  const [aberto, setAberto] = useState(false);

  return (
    <div>
      {/* Botão para abrir o modal */}
      <button className={styles.openButton} onClick={() => setAberto(true)}>
        Abrir Modal Pequeno
      </button>

      {/* Modal reutilizável */}
      <ModalGlobal
        aberto={aberto}
        setAberto={setAberto}
        titulo="Formulário Pequeno"
      >
        <div className={styles.formContainer}>
          <form>
            <div className={styles.inputGroup}>
              <label className={styles.label}>Nome</label>
              <input
                type="text"
                className={styles.input}
                placeholder="Digite seu nome"
              />
            </div>
            <button type="submit" className={styles.submitButton}>
              Enviar
            </button>
          </form>
        </div>
      </ModalGlobal>
    </div>
  );
};

export default FormularioModalTeste;
