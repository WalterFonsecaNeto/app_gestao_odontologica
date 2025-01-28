import Cabecalho from "../../Components/Cabecalho/Cabecalho";
import Rodape from "../../Components/Rodape/Rodape";
import PacientesTable from "../../Components/Components_PagePacientes/PacientesTable/PacientesTable";
import style from "./PagePacientes.module.css";
import { React, useState } from "react";
import FiltroGlobal from "../../Components/FiltroGlobal/FiltroGlobal";

import ModalAdicionarPaciente from "../../Components/Components_PagePacientes/ModalAdicionarPaciente/ModalAdicionarPaciente";

function PagePacientes() {
  const [filtro, setFiltro] = useState("");
  const [pacientes, setPacientes] = useState([]);

  return (
    <div className={style.container_total}>
      <Cabecalho />
      <div className={style.container_info}>
        <div className={style.container_filtro_modal}>
          <FiltroGlobal
            placeholder="Nome do paciente"
            setFiltro={setFiltro}
            ModalContent={ModalAdicionarPaciente}
          />
          <ModalAdicionarPaciente pacientes={pacientes} setPacientes={setPacientes} />
        </div>
        <PacientesTable filtro={filtro} pacientes={pacientes} setPacientes={setPacientes}/>
      </div>
      <Rodape />
    </div>
  );
}
export default PagePacientes;
