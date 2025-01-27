import Cabecalho from "../../Components/Cabecalho/Cabecalho";
import Rodape from "../../Components/Rodape/Rodape";
import style from "./PageEspecialidade.module.css";
import React, { useState } from "react";
import EspecialidadesTable from "../../Components/Components_PageEspecialidade/EspecialidadesTable/EspecialidadesTable";
import FiltroGlobal from "../../Components/FiltroGlobal/FiltroGlobal";
import ModalAdicionarEspecialidade from "../../Components/Components_PageEspecialidade/ModalAdicionarEspecialidade/ModalAdicionarEspecialidade";

function PageEspecialidade() {
  const [filtroEspecialidade, setFiltroEspecialidade] = useState("");

  return (
    <div className={style.container_total}>
      <Cabecalho />
      <div className={style.container_info}>
        <div className={style.container_filtro_modal}>
          <FiltroGlobal
            placeholder="Nome da especialidade"
            setFiltro={setFiltroEspecialidade}
            ModalContent={ModalAdicionarEspecialidade}
          />
          <ModalAdicionarEspecialidade />
        </div>
        <EspecialidadesTable filtro={filtroEspecialidade} />
      </div>
      <Rodape />
    </div>
  );
}
export default PageEspecialidade;
