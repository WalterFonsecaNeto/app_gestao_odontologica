import { useState, useEffect } from "react";
import Modal from "../Modal/Modal"; 
import styles from "./FiltroGlobal.module.css";

function FiltroGlobal({ titulo, placeholder, setFiltro, ModalContent, tituloModal }) {
  const [modalAberto, setModalAberto] = useState(false);

  //? Função para desabilitar a rolagem no body quando o modal abrir
  useEffect(() => {
    if (modalAberto) {
      document.body.style.overflow = "hidden"; 
    } else {
      document.body.style.overflow = "auto";
    }

    //? Limpeza quando o componente for desmontado ou o modal for fechado
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [modalAberto]);

  function AtualizarFiltro(event) {
    setFiltro(event.target.value);
  }

  function AbrirModal() {
    setModalAberto(true);
  }

  function FecharModal() {
    setModalAberto(false);
  }

  return (
    <div className={styles.container_total}>
      <div className={styles.container_info}>
        <h2>{titulo}</h2>
        <input
          type="search"
          placeholder={placeholder}
          onChange={AtualizarFiltro}
          className={styles.inputFiltro}
        />
        <button onClick={AbrirModal} className={styles.botao_criar}>+ Novo</button>
      </div>
      {modalAberto && (
        <Modal titulo={tituloModal} fecharModal={FecharModal}>
          <ModalContent fecharModal={FecharModal} />
        </Modal>
      )}
    </div>
  );
}

export default FiltroGlobal;
