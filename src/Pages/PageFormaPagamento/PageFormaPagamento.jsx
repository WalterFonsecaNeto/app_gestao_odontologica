import Cabecalho from "../../Components/Cabecalho/Cabecalho";
import Rodape from "../../Components/Rodape/Rodape";
import style from "./PageFormaPagamento.module.css";
import React, { useState } from "react";
import FormaPagamentoTable from "../../Components/Components_PageFormaPagamento/FormasPagamentoTable/FormasPagamentoTable";
import FiltroGlobal from "../../Components/FiltroGlobal/FiltroGlobal";
import ModalAdicionarFormaPagamento from "../../Components/Components_PageFormaPagamento/ModalAdicionarFormaPagamento/ModalAdicionarFormaPagamento";


function PageFormaPagamento() {
  const [filtroFormaPagamento, setFiltroFormaPagamento] = useState("");

  return (
    <div className={style.container_total}>
      <Cabecalho />
      <div className={style.container_info}>
        <FiltroGlobal
          titulo="Buscar Forma de Pagamento"
          placeholder="Nome da forma de pagamento"
          setFiltro={setFiltroFormaPagamento}
          ModalContent={ModalAdicionarFormaPagamento}
          
        />
        <FormaPagamentoTable filtro={filtroFormaPagamento} />
      </div>
      <Rodape />
    </div>
  );
}
export default PageFormaPagamento;
