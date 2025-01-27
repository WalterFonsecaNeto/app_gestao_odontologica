
import styles from "./FiltroGlobal.module.css";

function FiltroGlobal({ titulo, placeholder, setFiltro }) {
  

  function AtualizarFiltro(event) {
    setFiltro(event.target.value);
  }

  return (
    <div className={styles.container_total}>
      <div className={styles.container_info}>
        <h2>Buscar</h2>
        <input
          type="search"
          placeholder={placeholder}
          onChange={AtualizarFiltro}
          className={styles.inputFiltro}
        />
       
      </div>
    </div>
  );
}

export default FiltroGlobal;
