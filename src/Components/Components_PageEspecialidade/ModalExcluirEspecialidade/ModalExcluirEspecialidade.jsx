import { useState } from "react";
import { MdDelete } from "react-icons/md";
import style from "./ModalExcluirEspecialidade.module.css";
import ModalGlobal from "../../ModalGlobal/ModalGlobal";
import EspecialidadeApi from "../../../Services/MinhaApi/Especialidade";
import Alerta from "../../Alerta/Alerta";

function ModalExcluirEspecialidade({
  especialidadeSelecionada,
  setEspecialidades,
  especialidades,
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
    }, 5000); // Alerta desaparece após 5 segundos
  }

  async function ExcluirEspecialidade() {
    setDesabilitarBotao(true); // Desabilita o botão após o clique
    try {
      const usuarioId = localStorage.getItem("usuarioId");

      const teste = await EspecialidadeApi.deletarEspecialidadeAsync(
        especialidadeSelecionada.id,
        usuarioId
      );
      

      ExibirAlerta("Especialidade excluída com sucesso!", "success");
    } catch (error) {
      const mensagemErro =
        error.response?.data ||
        "Ocorreu um erro ao excluir a especialidade. Tente novamente.";
      ExibirAlerta(mensagemErro, "danger");
    }

    setTimeout(() => {
      setEspecialidades(
        especialidades?.filter((e) => e.id !== especialidadeSelecionada.id)
      );
      setAberto(false);
      setDesabilitarBotao(false)
    }, 5000);
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
              titulo="Excluir Especialidade"
            >
              <div className={style.container_total}>
                <div className={style.container_info}>
                  <p>Você tem certeza que deseja excluir a especialidade:</p>
                  <h4>{especialidadeSelecionada.nome}</h4>
                </div>

                <div className={style.container_botoes}>
                  <button
                    onClick={ExcluirEspecialidade}
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
            mensagem={String(mensagemAlerta)}
            visivel={mostrarAlerta}
            aoFechar={() => setMostrarAlerta(false)}
          />
        </>
      )}
    </div>
  );
}

export default ModalExcluirEspecialidade;
