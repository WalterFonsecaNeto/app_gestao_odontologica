import { useState, useEffect } from "react";
import { format } from "date-fns";
import style from "./ModalCriarAgendamento.module.css";
import AgendamentoApi from "../../../Services/MinhaApi/Agendamento";
import PacienteApi from "../../../Services/MinhaApi/Paciente";
import ModalGlobal from "../../ModalGlobal/ModalGlobal";
import Alerta from "../../Alerta/Alerta";

function ModalCriarAgendamento({ horarioSelecionado, data }) {
  const [pacienteId, setPacienteId] = useState("");
  const [descricao, setDescricao] = useState("");
  const [pacientes, setPacientes] = useState([]);
  const [filtroPaciente, setFiltroPaciente] = useState("");
  const [pacienteSelecionado, setPacienteSelecionado] = useState(null);

  const [aberto, setAberto] = useState(false);
  const [mostrarAlerta, setMostrarAlerta] = useState(false);
  const [mensagemAlerta, setMensagemAlerta] = useState("");
  const [tipoAlerta, setTipoAlerta] = useState("");

  const [desabilitarBotao, setDesabilitarBotao] = useState(false);

  function ExibirAlerta(mensagem, tipo) {
    setMensagemAlerta(mensagem);
    setTipoAlerta(tipo);
    setMostrarAlerta(true);

    setTimeout(() => {
      setMostrarAlerta(false);
      setDesabilitarBotao(false);
      setAberto(false);
      window.location.reload();
    }, 500);
  }

  useEffect(() => {
    BuscarPacientesApi();
  }, []);

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

  function filtrarPacientes(event) {
    setFiltroPaciente(event.target.value);
  }

  async function SalvarAgendamento(event) {
    event.preventDefault();
    setDesabilitarBotao(true);

    const usuarioId = localStorage.getItem("usuarioId");
    const dataHora = `${format(data, "yyyy-MM-dd")}T${horarioSelecionado}:00.000Z`;

    try {
      await AgendamentoApi.criarAgendamentoAsync(
        usuarioId,
        pacienteId,
        dataHora,
        "Pendente",
        descricao
      );
      ExibirAlerta("Agendamento cadastrado com sucesso!", "success");
    } catch (error) {
      console.error(error);
      const mensagemErro =
        error.response?.data ||
        "Ocorreu um erro ao cadastrar o agendamento. Tente novamente.";
      ExibirAlerta(mensagemErro, "danger");
    }
  }

  const pacientesFiltrados = pacientes.filter((paciente) =>
    paciente.nome.toLowerCase().startsWith(filtroPaciente.toLowerCase())
  );

  useEffect(() => {
    if (!aberto) {
      setPacienteId("");
      setDescricao("");
      setPacienteSelecionado(null);
    }
  }, [aberto]);

  function AbrirModal() {
    setAberto(true);
  }

  function TrocarPaciente() {
    setPacienteSelecionado(null);
    setPacienteId("");
    setFiltroPaciente("");
  }

  return (
    <div>
      <button onClick={AbrirModal} className={style.botao_modal}>
        Agendar
      </button>
      {aberto && (
        <>
          <div
            className={`${style.container_total_modal} ${
              desabilitarBotao ? style.container_total_modal_desabilitado : ""
            }`}
          >
            <ModalGlobal
              aberto={aberto}
              setAberto={setAberto}
              titulo="Agendar Paciente"
            >
              <div className={style.container_formulario}>
                <form onSubmit={SalvarAgendamento}>
                  <label>Paciente:</label>
                  {pacienteSelecionado ? (
                    <div className={style.pacienteSelecionadoContainer}>
                      <input
                        type="text"
                        value={pacienteSelecionado.nome}
                        disabled
                        className={style.inputPacienteSelecionado}
                      />
                      <button
                        type="button"
                        onClick={TrocarPaciente}
                        className={style.botao_troca_paciente}
                      >
                        Trocar Paciente
                      </button>
                    </div>
                  ) : (
                    <>
                      <input
                        type="text"
                        placeholder="Digite o nome do paciente"
                        value={filtroPaciente}
                        onChange={filtrarPacientes}
                        required
                      />
                      <ul className={style.listaPacientes}>
                        {filtroPaciente && pacientesFiltrados.length > 0 ? (
                          pacientesFiltrados.map((paciente) => (
                            <li
                              key={paciente.id}
                              className={style.pacienteItem}
                              onClick={() => {
                                setPacienteSelecionado(paciente);
                                setPacienteId(paciente.id);
                                setFiltroPaciente(paciente.nome);
                              }}
                            >
                              {paciente.nome}
                            </li>
                          ))
                        ) : (
                          <li className={style.pacienteItem}>
                            Nenhum paciente encontrado
                          </li>
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

                  <button
                    className={style.botao_salvar}
                    type="submit"
                    disabled={!pacienteSelecionado}
                  >
                    Salvar
                  </button>
                </form>
              </div>
            </ModalGlobal>
          </div>
          <Alerta
            tipo={tipoAlerta}
            mensagem={mensagemAlerta}
            visivel={mostrarAlerta}
            aoFechar={() => setMostrarAlerta(false)}
          />
        </>
      )}
    </div>
  );
}

export default ModalCriarAgendamento;
