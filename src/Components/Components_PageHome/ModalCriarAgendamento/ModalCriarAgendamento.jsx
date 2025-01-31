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
  const [filtroPaciente, setFiltroPaciente] = useState(""); // Estado para filtro de nome
  const [pacienteSelecionado, setPacienteSelecionado] = useState(null); // Estado para paciente selecionado

  const [aberto, setAberto] = useState(false);
  const [mostrarAlerta, setMostrarAlerta] = useState(false);
  const [mensagemAlerta, setMensagemAlerta] = useState("");
  const [tipoAlerta, setTipoAlerta] = useState("");

  const [desabilitarBotao, setDesabilitarBotao] = useState(false);

  // Função para exibir o alerta
  function ExibirAlerta(mensagem, tipo) {
    setMensagemAlerta(mensagem);
    setTipoAlerta(tipo);
    setMostrarAlerta(true);

    setTimeout(() => {
      setMostrarAlerta(false);
      setDesabilitarBotao(false);
      setAberto(false);
      window.location.reload();
    }, 5000);
  }

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
    setDesabilitarBotao(true);

    const usuarioId = localStorage.getItem("usuarioId");
    const dataHora = `${format(
      data,
      "yyyy-MM-dd"
    )}T${horarioSelecionado}:00.000Z`;

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

  // Filtrar pacientes com base no nome
  const pacientesFiltrados = pacientes.filter((paciente) =>
    paciente.nome.toLowerCase().startsWith(filtroPaciente.toLowerCase())
  );

  //Verificar se o aberto é falso ou seja esta fechado para excluir valore dos imputs
  useEffect(() => {
    if (!aberto) {
      setPacienteId("");
      setDescricao("");
      setPacienteSelecionado(null);
    }
    
  }, [aberto]);

  // Função para abrir o modal
  function AbrirModal() {
    setAberto(true);
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
                    <input
                      type="text"
                      value={pacienteSelecionado.nome}
                      disabled
                      className={style.inputPacienteSelecionado}
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
                      <ul className={style.listaPacientes}>
                        {filtroPaciente && pacientesFiltrados.length > 0 ? (
                          pacientesFiltrados.map((paciente) => (
                            <li
                              key={paciente.id}
                              className={style.pacienteItem}
                              onClick={() => {
                                setPacienteSelecionado(paciente);
                                setPacienteId(paciente.id);
                                setFiltroPaciente(paciente.nome)
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
          {/* Exibição do Alerta */}
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
