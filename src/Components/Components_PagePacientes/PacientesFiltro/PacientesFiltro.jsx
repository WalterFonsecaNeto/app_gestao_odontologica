import style from "./PacientesFiltro.module.css";
import { Link } from "react-router-dom";

function PacientesFiltro({ setFiltro }) {
  function AtualizarFiltro(event) {
    setFiltro(event.target.value);
  }

  return (
    <div className={style.container_total}>
      <div className={style.container_info}>
        <h2>Buscar Paciente</h2>
        <input
          type="search"
          placeholder="Nome do paciente"
          onChange={AtualizarFiltro}
        />

        <Link to="/paciente/novo" className={style.botao_criar}>
          + Novo
        </Link>
      </div>
    </div>
  );
}

export default PacientesFiltro;
