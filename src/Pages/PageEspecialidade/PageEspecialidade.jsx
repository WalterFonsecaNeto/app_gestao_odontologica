import Cabecalho from "../../Components/Cabecalho/Cabecalho";
import Rodape from "../../Components/Rodape/Rodape";
import style from "./PageEspecialidade.module.css";
import React, { useState } from "react";
import EspecialidadesFiltro from "../../Components/Components_PageEspecialidade/EspecialidadesFiltro/EspecialidadesFiltro";
import EspecialidadesTable from "../../Components/Components_PageEspecialidade/EspecialidadesTable/EspecialidadesTable";

function PageEspecialidade() {
  const [filtro, setFiltro] = useState("");
  
  return (
    <div className={style.container_total}>
      <Cabecalho />
      <div className={style.container_info}>
        <EspecialidadesFiltro setFiltro={setFiltro} />
        <EspecialidadesTable filtro={filtro} />
      </div>
      <Rodape />
    </div>
  );
}
export default PageEspecialidade;
