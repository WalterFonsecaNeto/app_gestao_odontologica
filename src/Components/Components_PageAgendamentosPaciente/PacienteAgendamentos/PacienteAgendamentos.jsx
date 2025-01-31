import style from "./PacienteAgendamento.module.css";
import { useParams } from "react-router-dom";
import AgendamentoApi from "../../../Services/MinhaApi/Agendamento";
import { useState, useEffect } from "react";
import { MdCheck } from "react-icons/md";
import ModalEditarAgendamentoDoPaciente from "../ModalEditarAgendamentoDoPaciente/ModalEditarAgendamentoDoPaciente";

function PacienteAgendamentos() {
  const [pacienteAgendamentos, setPacienteAgendamentos] = useState([]);
  const { id } = useParams();
  const decodedId = atob(id); // Decodifica o ID

  async function MostrarAgendamentosDoPaciente() {
    try {
      const usuarioId = localStorage.getItem("usuarioId"); 
      const response = await AgendamentoApi.listarAgendamentoPorPacienteIdAsync(
        decodedId,
        usuarioId,
        true
      );
      setPacienteAgendamentos(response);
    } catch (error) {
      console.error("Erro ao buscar agendamentos do paciente:", error);
    }
  }

  useEffect(() => {
    MostrarAgendamentosDoPaciente();
  }, []);

  const ConcluirAgendamento = async (agendamento) => {
    try {
      const usuarioId = localStorage.getItem("usuarioId");

      // Mantendo todas as informações do agendamento e alterando apenas o status
      await AgendamentoApi.atualizarAgendamentoAsync(
        agendamento.id,
        usuarioId,
        agendamento.pacienteId,
        agendamento.dataHora,
        "Concluído", // Novo status
        agendamento.descricao
      );

      // Atualiza o estado local sem recarregar a página
      setPacienteAgendamentos((prevAgendamentos) =>
        prevAgendamentos.map((item) =>
          item.id === agendamento.id ? { ...item, status: "Concluído" } : item
        )
      );
    } catch (error) {
      console.error("Erro ao concluir agendamento:", error);
    }
  };

  return (
    <div className={style.container_total}>
      <div className={style.titulo_container_total}>
        <h2 className={style.titulo}>Agendamentos do Paciente</h2>
      </div>

      <div className={style.container_table}>
        {pacienteAgendamentos?.length === 0 ? (
          <p>Nenhum agendamento encontrado para este paciente.</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Data</th>
                <th>Hora</th>
                <th>Status</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {pacienteAgendamentos?.map((agendamento) => (
                <tr key={agendamento.id}>
                  <td>
                    {new Date(agendamento.dataHora).toLocaleDateString("pt-BR")}
                  </td>
                  <td>
                    {new Date(agendamento.dataHora).toLocaleTimeString("pt-BR", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </td>
                  <td>{agendamento.status}</td>
                  <td>
                    <div className={style.botao_acao}>
                      <ModalEditarAgendamentoDoPaciente
                        agendamentoSelecionado={agendamento}
                        setAgendamentos={setPacienteAgendamentos}
                        agendamentos={pacienteAgendamentos}
                      />

                      <button onClick={() => ConcluirAgendamento(agendamento)}>
                        <MdCheck />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>

            <tfoot>
              <tr>
                <td colSpan="2">
                  Agendamentos pendentes:{" "}
                  {
                    pacienteAgendamentos?.filter(
                      (agendamento) => agendamento.status === "Pendente"
                    ).length
                  }
                </td>
                <td colSpan="2">
                  Agendamentos cancelados:{" "}
                  {
                    pacienteAgendamentos?.filter(
                      (agendamento) => agendamento.status === "Cancelado"
                    ).length
                  }
                </td>
              </tr>
            </tfoot>
          </table>
        )}
      </div>
    </div>
  );
}

export default PacienteAgendamentos;
