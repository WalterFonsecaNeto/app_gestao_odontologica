import style from "./EspecialidadesTable.module.css";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { MdEdit, MdDelete } from "react-icons/md";
import EspecialidadeApi from "../../../Services/MinhaApi/Especialidade";

function EspecialidadesTable({ filtro }) {
  const navigate = useNavigate();
  const [especialidades, setEspecialidades] = useState([]);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [especialidadeSelecionada, setEspecialidadeSelecionada] = useState(null);

  function EditarEspecialidade(id) {
    const idCodificado = btoa(id); // Codifica o ID em Base64
    navigate(`/especialidade/editar/${idCodificado}`);
  }

  const handleClickDeletar = (especialidade) => {
    setEspecialidadeSelecionada(especialidade);
    setMostrarModal(true);
  };

  const handleDeletar = async () => {
    try {
      const usuarioId = localStorage.getItem("usuarioId");
      await EspecialidadeApi.deletarEspecialidadeAsync(especialidadeSelecionada.id, usuarioId);
      setEspecialidades(especialidades.filter((e) => e.id !== especialidadeSelecionada.id));
    } catch (error) {
      console.error("Erro ao deletar especialidade:", error);
    } finally {
      handleFecharmodal();
    }
  };

  const handleFecharmodal = () => {
    setMostrarModal(false);
    setEspecialidadeSelecionada(null);
  };

  async function BuscarEspecialidadesApi() {
    const usuarioId = localStorage.getItem("usuarioId");

    try {
      const response = await EspecialidadeApi.listarEspecialidadesPorUsuarioAsync(usuarioId, true);
      setEspecialidades(response);
    } catch (error) {
      console.error("Erro ao buscar especialidades:", error);
    }
  }

  useEffect(() => {
    BuscarEspecialidadesApi();
  }, []);

  function MostarEspecialidades() {
    const especialidadesFiltradas = especialidades?.filter((especialidade) =>
      especialidade.nome.toLowerCase().startsWith(filtro.toLowerCase())
    );

    return especialidadesFiltradas?.map((especialidade) => (
      <tr key={especialidade.id}>
        <td>{especialidade.nome}</td>
        <td>
          <button onClick={() => EditarEspecialidade(especialidade.id)}>
            <MdEdit />
          </button>
        </td>
        <td>
          <button onClick={() => handleClickDeletar(especialidade)}>
            <MdDelete />
          </button>
        </td>
      </tr>
    ));
  }

  return (
    <div className={style.container_total}>
      <h2>Lista de Especialidades</h2>

      <div className={style.container_table}>
        <table>
          <thead>
            <tr>
              <th>Nome</th>
              <th>Editar</th>
              <th>Excluir</th>
            </tr>
          </thead>
          <tbody>{MostarEspecialidades()}</tbody>
        </table>
      </div>

      {/* Modal de confirmação de exclusão */}
      {mostrarModal && (
        <div className={style.modal}>
          <div className={style.modalContent}>
            <p>Você tem certeza que deseja excluir esta especialidade?</p>
            <button onClick={handleDeletar}>Confirmar</button>
            <button onClick={handleFecharmodal} className="cancelButton">Cancelar</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default EspecialidadesTable;
