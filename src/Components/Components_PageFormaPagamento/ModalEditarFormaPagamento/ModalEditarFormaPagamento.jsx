import { useState, useEffect } from "react";
import ModalGlobal from "../../ModalGlobal/ModalGlobal";
import FormaPagamentoApi from "../../../Services/MinhaApi/FormaPagemnto"; // Assumindo que existe essa API
import Alerta from "../../Alerta/Alerta";
import style from "./ModalEditarFormaPagamento.module.css";
import { MdEdit } from "react-icons/md";

function ModalEditarFormaPagamento({ formaPagamentoSelecionada }) {
  const [formaPagamento, setFormaPagamento] = useState({
    ...formaPagamentoSelecionada
  });
  const [aberto, setAberto] = useState(false);
  const [mostrarAlerta, setMostrarAlerta] = useState(false);
  const [mensagemAlerta, setMensagemAlerta] = useState("");
  const [tipoAlerta, setTipoAlerta] = useState("");
  const [desabilitarBotoes, setDesabilitarBotoes] = useState(false);
  const [desabilitarBotaoSalvar, setDesabilitarBotaoSalvar] = useState(true);

  function ExibirAlerta(mensagem, tipo) {
    setMensagemAlerta(mensagem);
    setTipoAlerta(tipo);
    setMostrarAlerta(true);

    setTimeout(() => {
      setMostrarAlerta(false);
      setAberto(false);
      setDesabilitarBotoes(false);
    }, 5000);
  }

  // Resetar o estado 'formaPagamento' quando o modal for fechado
  useEffect(() => {
    if (!aberto) {
      setFormaPagamento(formaPagamentoSelecionada);
    }
  }, [aberto, formaPagamentoSelecionada]);

  useEffect(() => {
    if (formaPagamento.nome !== formaPagamentoSelecionada.nome) {
      setDesabilitarBotaoSalvar(false); // Habilita o botão de salvar se houver alteração no nome
    } else {
      setDesabilitarBotaoSalvar(true); // Desabilita o botão de salvar se não houver alteração
    }
  }, [formaPagamento, formaPagamentoSelecionada]);

  const AtualizarFormaPagamento = async (event) => {
    event.preventDefault();
    setDesabilitarBotoes(true);

    const usuarioId = localStorage.getItem("usuarioId");

    try {
      await FormaPagamentoApi.atualizarFormaPagamentoAsync(
        formaPagamentoSelecionada.id,
        usuarioId,
        formaPagamento.nome
      );
      ExibirAlerta("Forma de pagamento atualizada com sucesso!", "success");
    } catch (error) {
      ExibirAlerta(
        error.response?.data || "Erro ao atualizar forma de pagamento.",
        "danger"
      );
    }
  };

  return (
    <div>
      <button className={style.botao_modal} onClick={() => setAberto(true)}>
        <MdEdit />
      </button>

      {aberto && (
        <div
          className={`${style.container_total_modal} ${
            desabilitarBotoes ? style.container_total_modal_desabilitado : ""
          }`}
        >
          <ModalGlobal
            aberto={aberto}
            setAberto={setAberto}
            titulo="Editar Forma de Pagamento"
          >
            <div
              className={`${style.container_formulario} ${
                desabilitarBotoes ? style.container_formulario_desabilitado : ""
              }`}
            >
              <form onSubmit={AtualizarFormaPagamento}>
                <label>Nome da Forma de Pagamento:</label>
                <input
                  type="text"
                  className={style.input}
                  name="nome"
                  value={formaPagamento.nome}
                  onChange={(e) =>
                    setFormaPagamento((prev) => ({
                      ...prev,
                      nome: e.target.value,
                    }))
                  }
                  required
                />

                <button
                  type="submit"
                  className={style.botao_salvar}
                  disabled={desabilitarBotaoSalvar}
                >
                  Salvar
                </button>
              </form>
            </div>
          </ModalGlobal>
        </div>
      )}

      <Alerta
        tipo={tipoAlerta}
        mensagem={mensagemAlerta}
        visivel={mostrarAlerta}
        aoFechar={() => setMostrarAlerta(false)}
      />
    </div>
  );
}

export default ModalEditarFormaPagamento;
