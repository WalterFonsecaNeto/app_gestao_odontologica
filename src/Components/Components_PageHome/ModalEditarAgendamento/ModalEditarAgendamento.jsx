import { useState, useEffect } from "react";
import ModalGlobal from "../../ModalGlobal/ModalGlobal";
import AgendamentoApi from "../../../Services/MinhaApi/Agendamento";
import PacienteApi from "../../../Services/MinhaApi/Paciente";
import Alerta from "../../Alerta/Alerta";
import style from "./ModalEditarAgendamento.module.css";
import { MdEdit } from "react-icons/md";

function ModalEditarAgendamento({ agendamentoSelecionado }) {
  const [agendamento, setAgendamento] = useState({
    ...agendamentoSelecionado,
    hora: agendamentoSelecionado.dataHora.slice(11, 16),
  });
  const [pacientes, setPacientes] = useState([]);
  const [filtroPaciente, setFiltroPaciente] = useState("");
  const [pacienteSelecionado, setPacienteSelecionado] = useState(null);
  const [aberto, setAberto] = useState(false);
  const [mostrarAlerta, setMostrarAlerta] = useState(false);
  const [mensagemAlerta, setMensagemAlerta] = useState("");
  const [tipoAlerta, setTipoAlerta] = useState("");
  const [desabilitarBotoes, setDesabilitarBotoes] = useState(false);
  const [desabilitarBotaoSalvar, setDesabilitarBotaoSalvar] = useState(true);

  function ExibirAlerta(mensagem, tipo) {
    setMensagemAlerta(mensagem);
    setTipoAlerta(tipo);
    setMostrarAlerta(true);

    setTimeout(() => {
      setMostrarAlerta(false);
      setAberto(false);
      setDesabilitarBotoes(false);
      window.location.reload();
    }, 5000);
  }

  useEffect(() => {
    BuscarPacientesApi();
  }, []);

  // Recarregar pacientes da API
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

  // Função para verificar se houve alterações no agendamento
  useEffect(() => {
    const dataParte = agendamento.dataHora.split("T")[0];
    const dataHoraFormatada = `${dataParte}T${agendamento.hora}:00`;

    if (
      agendamento.pacienteId !== agendamentoSelecionado.pacienteId ||
      dataHoraFormatada !== agendamentoSelecionado.dataHora ||
      agendamento.descricao !== agendamentoSelecionado.descricao ||
      agendamento.status !== agendamentoSelecionado.status
    ) {
      setDesabilitarBotaoSalvar(false);
    } else {
      setDesabilitarBotaoSalvar(true);
    }
  }, [agendamento, agendamentoSelecionado]);

  // Resetar estados quando o modal for fechado
  useEffect(() => {
    if (!aberto) {
      setPacienteSelecionado(null);
      setFiltroPaciente(""); // Limpa o filtro
    } else {
      setFiltroPaciente(agendamento.pacienteNome); // Preenche o filtro com o nome do paciente do agendamento
    }
  }, [aberto, agendamento.pacienteNome]);

  function filtrarPacientes(event) {
    setFiltroPaciente(event.target.value);
  }

  function selecionarPaciente(paciente) {
    setPacienteSelecionado(paciente);
    setAgendamento((prev) => ({
      ...prev,
      pacienteId: paciente.id,
      pacienteNome: paciente.nome,
    }));
    setFiltroPaciente(""); // Limpa o filtro ao selecionar o paciente
  }

  const AtualizarAgendamento = async (event) => {
    event.preventDefault();
    setDesabilitarBotoes(true);

    const dataParte = agendamento.dataHora.split("T")[0];
    const dataHoraFormatada = `${dataParte}T${agendamento.hora}:00.000Z`;
    const usuarioId = localStorage.getItem("usuarioId");

    try {
      await AgendamentoApi.atualizarAgendamentoAsync(
        agendamentoSelecionado.id,
        usuarioId,
        agendamento.pacienteId,
        dataHoraFormatada,
        agendamento.status,
        agendamento.descricao
      );
      ExibirAlerta("Agendamento atualizado com sucesso!", "success");
    } catch (error) {
      ExibirAlerta(
        error.response?.data || "Erro ao atualizar agendamento.",
        "danger"
      );
    }
  };

  return (
    <div>
      <button className={style.botao_modal} onClick={() => setAberto(true)}>
        <MdEdit />
      </button>

      {aberto && (
        <div
          className={`${style.container_total_modal} ${
            desabilitarBotoes ? style.container_total_modal_desabilitado : ""
          }`}
        >
          <ModalGlobal
            aberto={aberto}
            setAberto={setAberto}
            titulo="Editar Agendamento"
          >
            <div
              className={`${style.container_formulario} ${
                desabilitarBotoes ? style.container_formulario_desabilitado : ""
              }`}
            >
              <form onSubmit={AtualizarAgendamento}>
                <label>Paciente:</label>
                <input
                  type="text"
                  placeholder="Digite o nome do paciente"
                  value={
                    pacienteSelecionado
                      ? pacienteSelecionado.nome
                      : filtroPaciente
                  }
                  onChange={filtrarPacientes}
                  required
                  readOnly={!!pacienteSelecionado} // Impede edição após selecionar paciente
                />
                {/* Lista de pacientes com filtro */}
                {!pacienteSelecionado && (
                  <ul className={style.listaPacientes}>
                    {filtroPaciente &&
                      pacientes
                        .filter((p) =>
                          p.nome
                            .toLowerCase()
                            .includes(filtroPaciente.toLowerCase())
                        )
                        .map((paciente) => (
                          <li
                            key={paciente.id}
                            className={style.pacienteItem}
                            onClick={() => selecionarPaciente(paciente)}
                          >
                            {paciente.nome}
                          </li>
                        ))}
                  </ul>
                )}

                {/* Botão para trocar paciente */}
                {pacienteSelecionado && (
                  <button
                    type="button"
                    onClick={() => {
                      setPacienteSelecionado(null);
                      setFiltroPaciente(""); // Limpa filtro e permite nova busca
                    }}
                    className={style.botao_troca_paciente}
                  >
                    Trocar Paciente
                  </button>
                )}

                <label>Data:</label>
                <input
                  type="date"
                  className={style.input}
                  name="dataHora"
                  value={agendamento.dataHora?.split("T")[0] || ""}
                  onChange={(e) =>
                    setAgendamento((prev) => ({
                      ...prev,
                      dataHora: e.target.value,
                    }))
                  }
                  required
                />

                <label>Hora:</label>
                <input
                  type="time"
                  className={style.input}
                  name="hora"
                  value={agendamento.hora}
                  onChange={(e) =>
                    setAgendamento((prev) => ({
                      ...prev,
                      hora: e.target.value,
                    }))
                  }
                  required
                />

                <label>Descrição:</label>
                <input
                  type="text"
                  className={style.input}
                  name="descricao"
                  value={agendamento.descricao}
                  onChange={(e) =>
                    setAgendamento((prev) => ({
                      ...prev,
                      descricao: e.target.value,
                    }))
                  }
                  required
                />

                <label>Status:</label>
                <select
                  className={style.input}
                  name="status"
                  value={agendamento.status}
                  onChange={(e) =>
                    setAgendamento((prev) => ({
                      ...prev,
                      status: e.target.value,
                    }))
                  }
                  required
                >
                  <option value="Pendente">Pendente</option>
                  <option value="Cancelado">Cancelado</option>
                  <option value="Confirmado">Confirmado</option>
                </select>

                <button
                  type="submit"
                  className={style.botao_salvar}
                  disabled={desabilitarBotaoSalvar}
                >
                  Salvar
                </button>
              </form>
            </div>
          </ModalGlobal>
        </div>
      )}

      <Alerta
        tipo={tipoAlerta}
        mensagem={mensagemAlerta}
        visivel={mostrarAlerta}
        aoFechar={() => setMostrarAlerta(false)}
      />
    </div>
  );
}

export default ModalEditarAgendamento;
