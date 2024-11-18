import style from "./EspecialidadesFiltro.module.css";
import { Link } from "react-router-dom";

function EspecialidadesFiltro ({ setFiltro }) {
  function AtualizarFiltro(event) {
    setFiltro(event.target.value);
  }

  return (
    <div className={style.container_total}>
      <div className={style.container_info}>
        <h2>Buscar Especialidade</h2>
        <input
          type="search"
          placeholder="Nome da Especialidade"
          onChange={AtualizarFiltro}
        />

        <Link to="/especialidade/novo" className={style.botao_criar}>
          + Novo
        </Link>
      </div>
    </div>
  );
}

export default EspecialidadesFiltro;
