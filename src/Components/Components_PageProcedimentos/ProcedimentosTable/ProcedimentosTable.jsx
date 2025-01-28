import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { MdEdit, MdDelete } from "react-icons/md";
import ProcedimentoApi from "../../../Services/MinhaApi/Procedimento";
import style from "./ProcedimentosTable.module.css";
import Alerta from "../../Alerta/Alerta";

function ProcedimentosTable({ filtro, setProcedimentos, procedimentos }) {
  const navigate = useNavigate();

  const [mostrarModal, setMostrarModal] = useState(false);
  const [procedimentoSelecionado, setProcedimentoSelecionado] = useState(null);
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

  function EditarProcedimento(id) {
    const idCodificado = btoa(id); // Codifica o ID em Base64
    navigate(`/procedimento/editar/${idCodificado}`);
  }

  const handleClickDeletar = (procedimento) => {
    setProcedimentoSelecionado(procedimento);
    setMostrarModal(true);
  };
  const handleDeletar = async () => {
    try {
      const usuarioId = localStorage.getItem("usuarioId");
      await ProcedimentoApi.deletarProcedimentoAsync(
        procedimentoSelecionado.id,
        usuarioId
      );
      setProcedimentos(
        procedimentos.filter((p) => p.id !== procedimentoSelecionado.id)
      );
    } catch (error) {
      console.error("Erro ao deletar procedimento:", error);
    } finally {
      setMostrarModal(false);
    }
  };
  const handleCancelar = () => {
    setMostrarModal(false);
    setProcedimentoSelecionado(null);
  };

  async function BuscarProcedimentosApi() {
    const usuarioId = localStorage.getItem("usuarioId");
    try {
      const response = await ProcedimentoApi.listarProcedimentosPorUsuarioAsync(
        usuarioId,
        true
      );
      setProcedimentos(response);
    } catch (error) {
      const mensagemErro =
        error.response?.data ||
        "Ocorreu um erro ao listar os procedimentos. Tente novamente.";
      ExibirAlerta(mensagemErro, "danger");
    }
  }

  useEffect(() => {
    BuscarProcedimentosApi();
  }, []);

  function MostrarProcedimentos() {
    const procedimentosFiltrados = procedimentos?.filter((procedimento) =>
      procedimento.nome.toLowerCase().startsWith(filtro.toLowerCase())
    );

    return procedimentosFiltrados?.map((procedimento) => (
      <>
        <tr key={procedimento.id}>
          <td style={{ textAlign: "start" }}>{procedimento.nome}</td>
          <td>R$ {Number(procedimento.valor || 0).toFixed(2)}</td>
          <td>
            <div className={style.botao_acao}>
              <button onClick={() => EditarProcedimento(procedimento.id)}>
                <MdEdit />
              </button>

              <button onClick={() => handleClickDeletar(procedimento)}>
                <MdDelete />
              </button>
            </div>
          </td>
        </tr>

        {/* Exibição do Alerta */}
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
      <h2>Lista de Procedimentos</h2>

      <div className={style.container_table}>
        <table>
          <thead>
            <tr>
              <th>Nome</th>
              <th>Valor</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>{MostrarProcedimentos()}</tbody>
        </table>
      </div>

    
    </div>
  );
}

export default ProcedimentosTable;
