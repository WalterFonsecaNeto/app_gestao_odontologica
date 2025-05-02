import { useState } from "react";
import { MdDelete } from "react-icons/md";
import style from "./ModalExcluirProcedimento.module.css";
import ModalGlobal from "../../ModalGlobal/ModalGlobal";
import ProcedimentoApi from "../../../Services/MinhaApi/Procedimento";
import Alerta from "../../Alerta/Alerta";

function ModalExcluirProcedimento({
  procedimentoSelecionado,
  setProcedimentos,
  procedimentos,
}) {
  const [aberto, setAberto] = useState(false);
  const [mostrarAlerta, setMostrarAlerta] = useState(false);
  const [mensagemAlerta, setMensagemAlerta] = useState("");
  const [tipoAlerta, setTipoAlerta] = useState("");
  const [desabilitarBotao, setDesabilitarBotao] = useState(false);

  function ExibirAlerta(mensagem, tipo) {
    setMensagemAlerta(mensagem);
    setTipoAlerta(tipo);
    setMostrarAlerta(true);

    setTimeout(() => {
      setMostrarAlerta(false); // Fecha o alerta após 5 segundos
    }, 500);
  }

  async function ExcluirProcedimento() {
    setDesabilitarBotao(true); // Desabilita o botão após o clique
    try {
      const usuarioId = localStorage.getItem("usuarioId");
      await ProcedimentoApi.deletarProcedimentoAsync(
        procedimentoSelecionado.id,
        usuarioId
      );
      ExibirAlerta("Procedimento excluído com sucesso!", "success");
    } catch (error) {
      const mensagemErro =
        error.response?.data ||
        "Ocorreu um erro ao excluir o procedimento. Tente novamente.";
      ExibirAlerta(mensagemErro, "danger");
    }

    // Fecha o modal após 5 segundos para dar tempo de ver o alert
    setTimeout(() => {
      setProcedimentos(
        procedimentos.filter((p) => p.id !== procedimentoSelecionado.id)
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
              titulo="Excluir Procedimento"
            >
              <div className={style.container_total}>
                <div className={style.container_info}>
                  <p>Você tem certeza que deseja excluir o procedimento:</p>
                  <h4>{procedimentoSelecionado.nome}</h4>
                </div>

                <div className={style.container_botoes}>
                  <button
                    onClick={ExcluirProcedimento}
                    className={style.botao_excluir} // Adiciona classe desabilitada
                    disabled={desabilitarBotao} // Desabilita o botão
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

export default ModalExcluirProcedimento;
