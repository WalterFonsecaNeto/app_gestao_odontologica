import Cabecalho from "../../Components/Cabecalho/Cabecalho";
import Rodape from "../../Components/Rodape/Rodape";
import PacientesFiltro from "../../Components/Components_PagePacientes/PacientesFiltro/PacientesFiltro";
import PacientesTable from "../../Components/Components_PagePacientes/PacientesTable/PacientesTable";
import style from "./PagePacientes.module.css";
import React, { useState } from "react";

function PagePacientes() {
  const [filtro, setFiltro] = useState("");

  const usuarioId = localStorage.getItem("usuarioId");
  console.log(usuarioId);
  return (
    <div className={style.container_total}>
      <Cabecalho />
      <div className={style.container_info}>
        <PacientesFiltro setFiltro={setFiltro} />
        <PacientesTable filtro={filtro} />
      </div>
      <Rodape />
    </div>
  );
}
export default PagePacientes;
