import style from "./EspecialidadesTable.module.css";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { MdEdit, MdDelete } from "react-icons/md";
import EspecialidadeApi from "../../../Services/MinhaApi/Especialidade";

function EspecialidadesTable({ filtro }) {
  const navigate = useNavigate();
  const [especialidades, setEspecialidades] = useState([]);

  function EditarEspecialidade(id) {
    const idCodificado = btoa(id); //? Codifica o ID em Base64
    navigate(`/especialidade/editar/${idCodificado}`);
  }
  function ExcluirEspecialidade(id) {
    const idCodificado = btoa(id); //? Codifica o ID em Base64
    navigate(`/especialidade/excluir/${idCodificado}`);
  }

  async function BuscarEspecialidadesApi() {
    const usuarioId = localStorage.getItem("usuarioId");

    try {
      const response =
        await EspecialidadeApi.listarEspecialidadesPorUsuarioAsync(
          usuarioId,
          true
        );
      setEspecialidades(response);
    } catch (error) {
      console.error("Erro ao buscar especialidades:", error);
    }
  }

  useEffect(() => {
    BuscarEspecialidadesApi();
  }, []);

  function MostarEspecialidades() {
    //? Filtra a lista de pacientes com base no filtro, considerando apenas nomes que começam com o filtro
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
          <button onClick={() => ExcluirEspecialidade(especialidade.id)}>
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
    </div>
  );
}

export default EspecialidadesTable;
