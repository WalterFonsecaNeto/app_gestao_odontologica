import Cabecalho from "../../Components/Cabecalho/Cabecalho";
import Rodape from "../../Components/Rodape/Rodape";
import style from "./PageProcedimento.module.css";
import { React, useState } from "react";
import ProcedimentosTable from "../../Components/Components_PageProcedimentos/ProcedimentosTable/ProcedimentosTable";
import FiltroGlobal from "../../Components/FiltroGlobal/FiltroGlobal";

import ModalAdicionarProcedimento from "../../Components/Components_PageProcedimentos/ModalAdicionarProcedimento/ModalAdicionarProcedimento";

function PageEspecialidade() {
  const [filtroProcedimento, setFiltroProcedimento] = useState("");

  return (
    <div className={style.container_total}>
      <Cabecalho />
      <div className={style.container_info}>
        <div className={style.container_filtro_modal}>
          <FiltroGlobal
            placeholder="Nome do procedimento"
            setFiltro={setFiltroProcedimento}
            ModalContent={ModalAdicionarProcedimento}
          />
          <ModalAdicionarProcedimento />
        </div>
        <ProcedimentosTable filtro={filtroProcedimento} />
      </div>
      <Rodape />
    </div>
  );
}
export default PageEspecialidade;
