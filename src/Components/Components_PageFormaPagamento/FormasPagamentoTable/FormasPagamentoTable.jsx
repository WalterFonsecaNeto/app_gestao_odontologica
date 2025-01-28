import style from "./FormasPagamentoTable.module.css";
import { useState, useEffect } from "react";
import { MdEdit } from "react-icons/md";
import FormaPagamentoApi from "../../../Services/MinhaApi/FormaPagemnto";
import Alerta from "../../Alerta/Alerta";
import ModalExcluirFormaPagamento from "../ModalExcluirFormaPagamento/ModalExcluirFormaPagamento";

function FormasPagamentoTable({ filtro, formasPagamento, setFormasPagamento }) {


  const [mostrarModal, setMostrarModal] = useState(false);
  const [formaPagamentoSelecionada, setFormaPagamentoSelecionada] =
    useState(null);
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

 

  async function BuscarFormasPagamentoApi() {
    const usuarioId = localStorage.getItem("usuarioId");

    try {
      const response =
        await FormaPagamentoApi.listarFormasPagamentoPorUsuarioAsync(
          usuarioId,
          true
        );
      setFormasPagamento(response);
    } catch (error) {
      const mensagemErro =
        error.response?.data ||
        "Ocorreu um erro ao listar as formas de pagamento. Tente novamente.";
      ExibirAlerta(mensagemErro, "danger");
    }
  }

  useEffect(() => {
    BuscarFormasPagamentoApi();
  }, []);

  function MostrarFormasPagamentos() {
    const formaPagamentoFiltradas = formasPagamento?.filter((formaPagamento) =>
      formaPagamento.nome.toLowerCase().startsWith(filtro.toLowerCase())
    );

    return formaPagamentoFiltradas?.map((formaPagamento) => (
      <>
        <tr key={formaPagamento.id}>
          <td>{formaPagamento.nome}</td>
          <td>
            <div className={style.botao_acao}>
              <button >
                <MdEdit />
              </button>
              <ModalExcluirFormaPagamento
                formaPagamentoSelecionada={formaPagamento}
                formasPagamento={formasPagamento}
                setFormasPagamento={setFormasPagamento}
              />
            </div>
          </td>
        </tr>
        <Alerta
          tipo={tipoAlerta}
          mensagem={mensagemAlerta}
          visivel={mostrarAlerta}
          aoFechar={() => setMostrarAlerta(false)}
        />
      </>
    ));
  }

  return (
    <div className={style.container_total}>
      <h2 className={style.titulo}>Lista de Formas de Pagamento</h2>

      <div className={style.container_table}>
        <table>
          <thead>
            <tr>
              <th>Nome</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>{MostrarFormasPagamentos()}</tbody>
        </table>
      </div>

     
    </div>
  );
}

export default FormasPagamentoTable;
