import style from "./ProcedimentosTable.module.css";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { MdEdit, MdDelete } from "react-icons/md";
import ProcedimentoApi from "../../../Services/MinhaApi/Procedimento";

function ProcedimentosTable({ filtro }) {
  const navigate = useNavigate();
  const [procedimentos, setProcedimentos] = useState([]);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [procedimentoSelecionado, setProcedimentoSelecionado] = useState(null);

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
      await ProcedimentoApi.deletarProcedimentoAsync(procedimentoSelecionado.id, usuarioId);
      setProcedimentos(procedimentos.filter((p) => p.id !== procedimentoSelecionado.id));
    } catch (error) {
      console.error("Erro ao deletar procedimento:", error);
    } finally {
      handleFecharmodal();
    }
  };

  const handleFecharmodal = () => {
    setMostrarModal(false);
    setProcedimentoSelecionado(null);
  };

  async function BuscarProcedimentosApi() {
    const usuarioId = localStorage.getItem("usuarioId");
    try {
      const response = await ProcedimentoApi.listarProcedimentosPorUsuarioAsync(usuarioId, true);
      setProcedimentos(response);
    } catch (error) {
      console.error("Erro ao buscar procedimentos:", error);
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
      <tr key={procedimento.id}>
        <td style={{ textAlign: "start" }}>{procedimento.nome}</td>
        <td>{procedimento.valor.toFixed(2)}</td>
        <td>
          <button onClick={() => EditarProcedimento(procedimento.id)}>
            <MdEdit />
          </button>
        </td>
        <td>
          <button onClick={() => handleClickDeletar(procedimento)}>
            <MdDelete />
          </button>
        </td>
      </tr>
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
              <th>Editar</th>
              <th>Excluir</th>
            </tr>
          </thead>
          <tbody>{MostrarProcedimentos()}</tbody>
        </table>
      </div>

      {/* Modal de confirmação de exclusão */}
      {mostrarModal && (
        <div className={style.modal}>
          <div className={style.modalContent}>
            <p>Você tem certeza que deseja excluir este procedimento?</p>
            <button onClick={handleDeletar}>Confirmar</button>
            <button onClick={handleFecharmodal}>Cancelar</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProcedimentosTable;
