import { useState, useEffect } from "react";
import { format } from "date-fns";
import styles from "./ModalCriarAgendamento.module.css";
import AgendamentoApi from "../../../Services/MinhaApi/Agendamento";
import PacienteApi from "../../../Services/MinhaApi/Paciente";

function ModalCriarAgendamento({ fecharModal, horarioSelecionado, data }) {

  const [pacienteId, setPacienteId] = useState("");
  const [status, setStatus] = useState("");
  const [descricao, setDescricao] = useState("");
  const [pacientes, setPacientes] = useState([]);
  const [filtroPaciente, setFiltroPaciente] = useState(""); // Estado para filtro de nome
  const [pacienteSelecionado, setPacienteSelecionado] = useState(null); // Estado para paciente selecionado

  useEffect(() => {
    // Carregar pacientes ao abrir o modal
    BuscarPacientesApi();
  }, []);

  // Função para buscar pacientes
  async function BuscarPacientesApi() {
    const usuarioId = localStorage.getItem("usuarioId");

    try {
      const response = await PacienteApi.listarPacientesPorUsuarioAsync(
        usuarioId,
        true
      );
      setPacientes(response);
    } catch (error) {
      console.error("Erro ao buscar pacientes:", error);
    }
  }

  // Função para filtrar pacientes com base no nome
  function filtrarPacientes(event) {
    setFiltroPaciente(event.target.value);
  }

  // Função para salvar o agendamento
  async function SalvarAgendamento(event) {
    event.preventDefault();

    const usuarioId = localStorage.getItem("usuarioId");
    const dataHora = `${format(data, "yyyy-MM-dd")}T${horarioSelecionado}:00.000Z`;

    try {
      await AgendamentoApi.criarAgendamentoAsync(
        usuarioId,
        pacienteId,
        dataHora,
        status,
        descricao,
      );
      alert("Agendamento criado com sucesso!");
      fecharModal(); // Fecha o modal após o cadastro
      window.location.reload(); // Força o recarregamento da página
    } catch (error) {
      console.error(error);
      alert("Ocorreu um erro ao criar o agendamento. Tente novamente.");
    }
  }

  // Filtrar pacientes com base no nome
  const pacientesFiltrados = pacientes.filter(paciente =>
    paciente.nome.toLowerCase().startsWith(filtroPaciente.toLowerCase())
  );
  

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <div className={styles.modalTituloSair}>
          <button className={styles.closeButton} onClick={fecharModal}>
            ✖
          </button>
          <h2>Agendar Consulta</h2>
        </div>
        <form onSubmit={SalvarAgendamento}>
          <label>Paciente:</label>
          {pacienteSelecionado ? (
            <input 
              type="text"
              value={pacienteSelecionado.nome}
              disabled
              className={styles.inputPacienteSelecionado}
            />
          ) : (
            <>
              <input
                type="text"
                placeholder="Digite o nome do paciente"
                value={filtroPaciente}
                onChange={filtrarPacientes}
                required
              />

              {/* Lista de Pacientes com filtro */}
              <ul className={styles.listaPacientes}>
                {filtroPaciente && pacientesFiltrados.length > 0 ? (
                  pacientesFiltrados.map((paciente) => (
                    <li
                      key={paciente.id}
                      className={styles.pacienteItem}
                      onClick={() => {
                        setPacienteSelecionado(paciente);
                        setPacienteId(paciente.id);
                        setFiltroPaciente(""); // Limpar o filtro após selecionar
                      }}
                    >
                      {paciente.nome}
                    </li>
                  ))
                ) : (
                  <li className={styles.pacienteItem}>Nenhum paciente encontrado</li>
                )}
              </ul>
            </>
          )}

          <label>Descrição:</label>
          <textarea
            placeholder="Digite uma descrição para o agendamento"
            name="descricao"
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
            required
          ></textarea>
          <label>Status:</label>
          <select
            name="status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            required
          >
            <option value="">Selecione o status</option>
            <option value="Pendente">Pendente</option>
            <option value="Confirmado">Confirmado</option>
            <option value="Cancelado">Cancelado</option>
          </select>

          <button type="submit" disabled={!pacienteSelecionado}>
            Salvar
          </button>
        </form>
      </div>
    </div>
  );
}

export default ModalCriarAgendamento;
