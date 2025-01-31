import { useState, useEffect } from "react";
import ModalGlobal from "../../ModalGlobal/ModalGlobal"; // Importando o ModalGlobal
import FormaPagamentoApi from "../../../Services/MinhaApi/FormaPagemnto";
import BotaoNovo from "../../BotaoNovo/BotaoNovo"; // Importando o BotaoNovo
import style from "./ModalAdicionarFormaPagamento.module.css"; // Importando o arquivo CSS
import Alerta from "../../Alerta/Alerta";

function ModalAdicionarFormaPagamento({ formasPagamento, setFormasPagamento }) {
  const [formaPagamento, setFormaPagamento] = useState([
    {
      id: "",
      nome: "",
    },
  ]);
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
      setDesabilitarBotao(false);
      setAberto(false);
    }, 5000);
  }

  async function SalvarFormaPagamento(event) {
    event.preventDefault();

    const usuarioId = localStorage.getItem("usuarioId");
    setDesabilitarBotao(true);

    try {
      const formaPagamentoId = await FormaPagamentoApi.criarFormaPagamentoAsync(
        usuarioId,
        formaPagamento.nome
      );
      formaPagamento.id = formaPagamentoId;

      ExibirAlerta("Forma de pagamento cadastrada com sucesso!", "success");

      setFormasPagamento([...formasPagamento, formaPagamento]);
    } catch (error) {
      const mensagemErro =
        error.response?.data ||
        "Ocorreu um erro ao cadastrar a forma de pagamento. Tente novamente.";
      ExibirAlerta(mensagemErro, "danger");
    }
  }

  function AtualizarFormaPagamentoComValores(event) {
    const { name, value } = event.target;
    setFormaPagamento({ ...formaPagamento, [name]: value });
  }

  //Verificar com useEffect se o aberto é falso ou seja esta fechado para excluir valore dos imputs
  useEffect(() => {
    if (!aberto) {
      setFormaPagamento({ nome: "" });
    }
  }, [aberto]);

  return (
    <div>
      {/* Botão Novo, que agora é o BotaoNovo */}
      <BotaoNovo AbrirModal={() => setAberto(true)} />

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
              titulo="Cadastro de Forma de Pagamento"
            >
              <div className={style.container_formulario}>
                <form onSubmit={SalvarFormaPagamento}>
                  <label className={style.label}>Nome</label>
                  <input
                    type="text"
                    className={style.input}
                    placeholder="Digite o nome da forma de pagamento"
                    name="nome"
                    value={formaPagamento.nome}
                    onChange={AtualizarFormaPagamentoComValores}
                    required
                  />

                  <button type="submit" className={style.botao_salvar}>
                    Salvar
                  </button>
                </form>
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

export default ModalAdicionarFormaPagamento;
