import style from "./FormasPagamentoTable.module.css";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { MdEdit, MdDelete } from "react-icons/md";
import FormaPagamentoApi from "../../../Services/MinhaApi/FormaPagemnto";
import ModalGlobalExcluir from "../../ModalGlobalExcluir/ModalGlobalExcluir";

function FormasPagamentoTable({ filtro }) {
  const navigate = useNavigate();
  const [formasPagamento, setFormasPagamento] = useState([]);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [formaPagamentoSelecionada, setFormaPagamentoSelecionada] =
    useState(null);

  function EditarFormaPagamento(id) {
    const idCodificado = btoa(id); // Codifica o ID em Base64
    navigate(`/formapagamento/editar/${idCodificado}`);
  }

  const handleClickDeletar = (formaPagamento) => {
    setFormaPagamentoSelecionada(formaPagamento);
    setMostrarModal(true);
  };

  const handleDeletar = async () => {
    try {
      const usuarioId = localStorage.getItem("usuarioId");
      await FormaPagamentoApi.deletarFormaPagamentoAsync(
        formaPagamentoSelecionada.id,
        usuarioId
      );
      setFormasPagamento(
        formasPagamento.filter((e) => e.id !== formaPagamentoSelecionada.id)
      );
    } catch (error) {
      console.error("Erro ao deletar especialidade:", error);
    } finally {
      setMostrarModal(false);
    }
  };

  const handleCancelar = () => {
    setMostrarModal(false);
    setFormaPagamentoSelecionada(null);
  };

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
      console.error("Erro ao buscar formas de pagamento:", error);
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
      <tr key={formaPagamento.id}>
        <td>{formaPagamento.nome}</td>
        <td>
          <div className={style.botao_acao}>
            <button onClick={() => EditarFormaPagamento(formaPagamento.id)}>
              <MdEdit />
            </button>
            <button onClick={() => handleClickDeletar(formaPagamento)}>
              <MdDelete />
            </button>
          </div>
        </td>
      </tr>
    ));
  }

  return (
    <div className={style.container_total}>
      <h2>Lista de Formas de Pagamento</h2>

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

      <ModalGlobalExcluir
        titulo="Confirmação de Exclusão"
        mensagem={`Você tem certeza que deseja excluir a forma de pagamento: "${formaPagamentoSelecionada?.nome}"`}
        visivel={mostrarModal}
        onConfirmar={handleDeletar}
        onCancelar={handleCancelar}
      />
    </div>
  );
}

export default FormasPagamentoTable;
