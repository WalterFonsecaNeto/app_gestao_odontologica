import { useState } from "react";
import { MdDelete } from "react-icons/md";
import style from "./ModalExcluirFormaPagamento.module.css";
import ModalGlobal from "../../ModalGlobal/ModalGlobal";
import FormaPagamentoApi from "../../../Services/MinhaApi/FormaPagemnto";
import Alerta from "../../Alerta/Alerta";

function ModalExcluirFormaPagamento({
  formaPagamentoSelecionada,
  setFormasPagamento,
  formasPagamento,
}) {
  const [aberto, setAberto] = useState(false);
  const [mostrarAlerta, setMostrarAlerta] = useState(false);
  const [mensagemAlerta, setMensagemAlerta] = useState("");
  const [tipoAlerta, setTipoAlerta] = useState("");
  const [desabilitarBotao, setDesabilitarBotao] = useState(false);

  // Função para exibir o alerta
  function ExibirAlerta(mensagem, tipo) {
    setMensagemAlerta(mensagem);
    setTipoAlerta(tipo);
    setMostrarAlerta(true);

    setTimeout(() => {
      setMostrarAlerta(false);
    }, 500); 
  }

  async function ExcluirFormaPagamento() {
    setDesabilitarBotao(true); // Desabilita o botão após o clique
    try {
      const usuarioId = localStorage.getItem("usuarioId");

      await FormaPagamentoApi.deletarFormaPagamentoAsync(
        formaPagamentoSelecionada.id,
        usuarioId
      );

      ExibirAlerta("Forma de pagamento excluída com sucesso!", "success");
    } catch (error) {
      const mensagemErro =
        error.response?.data ||
        "Ocorreu um erro ao listar as formas de pagamento. Tente novamente.";
      ExibirAlerta(mensagemErro, "danger");
    }

    setTimeout(() => {
      setFormasPagamento(
        formasPagamento.filter((e) => e.id !== formaPagamentoSelecionada.id)
      );
      setAberto(false);
    }, 500);
  }

  return (
    <div>
      <button className={style.botao_deletar} onClick={() => setAberto(true)}>
        <MdDelete />
      </button>

      {aberto && (
        <>
          <div
            className={`${style.container_total_modal} ${
              desabilitarBotao ? style.container_total_modal_desabilitado : ""
            }`}
          >
            <ModalGlobal
              aberto={aberto}
              setAberto={setAberto}
              titulo="Excluir Forma de Pagamento"
            >
              <div className={style.container_total}>
                <div className={style.container_info}>
                  <p>
                    Você tem certeza que deseja excluir a forma de pagamento:
                  </p>
                  <h4>{formaPagamentoSelecionada.nome}</h4>
                </div>

                <div className={style.container_botoes}>
                  <button
                    onClick={ExcluirFormaPagamento}
                    className={style.botao_excluir}
                  >
                    Excluir
                  </button>

                  <button
                    className={style.botao_cancelar}
                    onClick={() => setAberto(false)}
                  >
                    Voltar
                  </button>
                </div>
              </div>
            </ModalGlobal>
          </div>

          {/* Exibição do Alerta */}
          <Alerta
            tipo={tipoAlerta}
            mensagem={mensagemAlerta}
            visivel={mostrarAlerta}
            aoFechar={() => setMostrarAlerta(false)}
          />
        </>
      )}
    </div>
  );
}

export default ModalExcluirFormaPagamento;
