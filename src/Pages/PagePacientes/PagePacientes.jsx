import Cabecalho from "../../Components/Cabecalho/Cabecalho";
import Rodape from "../../Components/Rodape/Rodape";
import PacientesTable from "../../Components/Components_PagePacientes/PacientesTable/PacientesTable";
import style from "./PagePacientes.module.css";
import { React,  useState } from "react";
import FiltroGlobal from "../../Components/FiltroGlobal/FiltroGlobal";

import ModalAdicionarPaciente from "../../Components/Components_PagePacientes/ModalAdicionarPaciente/ModalAdicionarPaciente";

function PagePacientes() {
  const [filtro, setFiltro] = useState("");

  return (
    <div className={style.container_total}>
      <Cabecalho />
      <div className={style.container_info}>
        <FiltroGlobal
          titulo="Buscar Paciente"
          placeholder="Nome do paciente"
          setFiltro={setFiltro}
          ModalContent={ModalAdicionarPaciente}
        />
        <PacientesTable filtro={filtro} />
      </div>
      <Rodape />
    </div>
  );
}
export default PagePacientes;
