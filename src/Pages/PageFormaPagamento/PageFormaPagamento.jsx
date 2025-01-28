import Cabecalho from "../../Components/Cabecalho/Cabecalho";
import Rodape from "../../Components/Rodape/Rodape";
import style from "./PageFormaPagamento.module.css";
import React, { useState } from "react";
import FormaPagamentoTable from "../../Components/Components_PageFormaPagamento/FormasPagamentoTable/FormasPagamentoTable";
import FiltroGlobal from "../../Components/FiltroGlobal/FiltroGlobal";
import ModalAdicionarFormaPagamento from "../../Components/Components_PageFormaPagamento/ModalAdicionarFormaPagamento/ModalAdicionarFormaPagamento";

function PageFormaPagamento() {
  const [filtroFormaPagamento, setFiltroFormaPagamento] = useState("");
  const [formasPagamento, setFormasPagamento] = useState([]);

  return (
    <div className={style.container_total}>
      <Cabecalho />
      <div className={style.container_info}>
        <div className={style.container_filtro_modal}>
          <FiltroGlobal
            placeholder="Nome da forma de pagamento"
            setFiltro={setFiltroFormaPagamento}
            ModalContent={ModalAdicionarFormaPagamento}
          />
          <ModalAdicionarFormaPagamento
            formasPagamento={formasPagamento}
            setFormasPagamento={setFormasPagamento}
          />
        </div>
        <FormaPagamentoTable
          filtro={filtroFormaPagamento}
          formasPagamento={formasPagamento}
          setFormasPagamento={setFormasPagamento}
        />
      </div>
      <Rodape />
    </div>
  );
}
export default PageFormaPagamento;
