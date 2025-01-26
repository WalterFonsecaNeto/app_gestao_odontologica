import style from "./PacienteAgendamento.module.css";
import { useParams } from "react-router-dom";
import AgendamentoApi from "../../../Services/MinhaApi/Agendamento";
import { useState, useEffect } from "react";
import { MdEdit, MdDelete } from "react-icons/md";

function PacienteAgendamentos() {
  const [pacienteAgendamentos, setPacienteAgendamentos] = useState([]);
  const { id } = useParams();
  const decodedId = atob(id); //? Decodifica o ID

  async function MostrarAgendamentosDoPaciente() {
    try {
      const usuarioId = localStorage.getItem("usuarioId"); // Aqui você deveria pegar o ID do usuário logado
      console.log(decodedId);
      const response = await AgendamentoApi.listarAgendamentoPorPacienteIdAsync(
        decodedId,
        usuarioId,
        true
      );
      console.log(response);
      setPacienteAgendamentos(response);
    } catch (error) {
      console.error("Erro ao buscar agendamentos do paciente:", error);
    }
  }

  useEffect(() => {
    MostrarAgendamentosDoPaciente();
  }, []);

  return (
    <div className={style.container_total}>
      <div className={style.titulo_container_total}>
        <h2>Agendamentos do Paciente</h2>
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
                    {new Date(agendamento.dataHora).toLocaleTimeString(
                      "pt-BR",
                      {
                        hour: "2-digit",
                        minute: "2-digit",
                      }
                    )}
                  </td>

                  <td>{agendamento.status}</td>
                  <td>
                    <div className={style.botao_acao}>
                      <button
                      // onClick={() => EditarProcedimento(procedimento.id)}
                      >
                        <MdEdit />
                      </button>

                      <button
                      // onClick={() => handleClickDeletar(procedimento)}
                      >
                        <MdDelete />
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
              <tr>
                
              </tr>
            </tfoot>
          </table>
        )}
      </div>
    </div>
  );
}

export default PacienteAgendamentos;
