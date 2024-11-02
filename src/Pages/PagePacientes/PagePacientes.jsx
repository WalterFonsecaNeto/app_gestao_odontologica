import PacientesFiltro from "../../Components/Components_PagePaciente/PacientesFiltro/PacientesFiltro";
import PacientesForm from "../../Components/Components_PagePaciente/PacientesForm/PacientesForm";
import PacientesTable from "../../Components/Components_PagePaciente/PacientesTable/PacientesTable";
import style from "./PagePacientes.module.css";
import React, { useState } from "react";

function PagePacientes() {
  const [filtro, setFiltro] = useState("");

  return (

    <div className={style.container_total}>
      <div className={style.container_info}>
        <div className={style.container_esquerdo}>
          <PacientesFiltro setFiltro={setFiltro}/>
          <PacientesTable filtro={filtro} />
        </div>
        <div className={style.container_direito}>
          <PacientesForm />
        </div>
      </div>
    </div>
  );
}
export default PagePacientes;
