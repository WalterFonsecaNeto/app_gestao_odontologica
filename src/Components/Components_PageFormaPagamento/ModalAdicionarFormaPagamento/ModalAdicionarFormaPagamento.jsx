import { useState, useEffect } from "react";
import ModalGlobal from "../../ModalGlobal/ModalGlobal"; // Importando o ModalGlobal
import FormaPagamentoApi from "../../../Services/MinhaApi/FormaPagemnto";
import BotaoNovo from "../../BotaoNovo/BotaoNovo"; // Importando o BotaoNovo
import style from "./ModalAdicionarFormaPagamento.module.css"; // Importando o arquivo CSS
import Alerta from "../../Alerta/Alerta";

function ModalAdicionarFormaPagamento({ formasPagamento, setFormasPagamento }) {
  const [formaPagamento, setFormaPagamento] = useState([
    {
      nome: ""
    },
  ]);
  const [aberto, setAberto] = useState(false);
  const [mostrarAlerta, setMostrarAlerta] = useState(false);
  const [mensagemAlerta, setMensagemAlerta] = useState("");
  const [tipoAlerta, setTipoAlerta] = useState("");

  // Função para exibir o alerta
  function ExibirAlerta(mensagem, tipo) {
    setMensagemAlerta(mensagem);
    setTipoAlerta(tipo);
    setMostrarAlerta(true);

    setTimeout(() => {
      setMostrarAlerta(false);
    }, 5000); // Alerta desaparece após 5 segundos
  }

  async function SalvarFormaPagamento(event) {
    event.preventDefault();

    const usuarioId = localStorage.getItem("usuarioId");

    try {
      await FormaPagamentoApi.criarFormaPagamentoAsync(
        usuarioId,
        formaPagamento.nome
      );
      ExibirAlerta("Forma de pagamento cadastrada com sucesso!", "success");

      setFormasPagamento([...formasPagamento, formaPagamento]);
    } catch (error) {
      const mensagemErro =
        error.response?.data ||
        "Ocorreu um erro ao cadastrar a forma de pagamento. Tente novamente.";
      ExibirAlerta(mensagemErro, "danger");
    }

    setFormaPagamento({
      nome: "",
    });

    //fecha o modal apos 5 segundos para dar tempo de ver o alert
    setTimeout(() => {
      setAberto(false);
    }, 5000);
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
        <ModalGlobal
          aberto={aberto}
          setAberto={setAberto}
          titulo="Cadastro de Forma de Pagamento"
        >
          {/* Exibição do Alerta */}
          <Alerta
            tipo={tipoAlerta}
            mensagem={mensagemAlerta}
            visivel={mostrarAlerta}
            aoFechar={() => setMostrarAlerta(false)}
          />
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
      )}
    </div>
  );
}

export default ModalAdicionarFormaPagamento;
