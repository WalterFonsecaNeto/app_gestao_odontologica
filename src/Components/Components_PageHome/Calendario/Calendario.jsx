import { useState, useEffect } from "react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight } from "lucide-react"; // Importando as setas
import styles from "./Calendario.module.css";
import AgendamentoApi from "../../../Services/MinhaApi/Agendamento";
import FormularioCriarAgendamento from "../ModalCriarAgendamento/ModalCriarAgendamento";
import PacienteApi from "../../../Services/MinhaApi/Paciente";
import ModalCriarAgendamento from "../ModalCriarAgendamento/ModalCriarAgendamento";
const Calendario = () => {
  const [data, setData] = useState(new Date());
  const [agendamentos, setAgendamentos] = useState([]);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [horarioSelecionado, setHorarioSelecionado] = useState("");

  // Definindo os horários disponíveis
  const HorariosDisponiveis = Array.from({ length: 21 }, (_, index) => {
    const hora = Math.floor(index / 2) + 8;
    const minutos = (index % 2) * 30;
    return `${hora.toString().padStart(2, "0")}:${minutos.toString().padStart(2, "0")}`;
  });

  // Função para carregar os agendamentos
  const ListarAgendamentosApi = async () => {
    try {
      const usuarioId = localStorage.getItem("usuarioId");
      const resposta = await AgendamentoApi.listarAgendamentoPorUsuarioIdAsync(usuarioId, true);

      // Para cada agendamento, busque o nome do paciente
      const agendamentosComNomePaciente = await Promise.all(
        resposta.map(async (agendamento) => {
          const paciente = await PacienteApi.obterPacienteAsync(agendamento.pacienteId, usuarioId, true);
          const pacienteNome = paciente.nome;
          return {
            ...agendamento,
            pacienteNome, // Adiciona o nome do paciente no agendamento
          };
        })
      );
      setAgendamentos(agendamentosComNomePaciente);
    } catch (erro) {
      console.error("Erro ao carregar os agendamentos:", erro);
    }
  };

  // Buscar agendamentos ao carregar a página
  useEffect(() => {
    ListarAgendamentosApi();
  }, [data]);  // A dependência agora é a data, para atualizar os agendamentos quando a data mudar

  // Verifica se há agendamento no horário e no dia
  const ObterAgendamentoParaHorario = (horario) => {
    return agendamentos.find((agendamento) => {
      const dataAgendamento = format(new Date(agendamento.dataHora), "yyyy-MM-dd");
      const horaAgendamento = format(new Date(agendamento.dataHora), "HH:mm");
      const dataAtual = format(data, "yyyy-MM-dd");
      return dataAgendamento === dataAtual && horaAgendamento === horario;
    });
  };

  // Abre o modal para criar um agendamento
  const AbrirModal = (horario) => {
    setHorarioSelecionado(horario);
    setMostrarModal(true);
  };


  // Função para mudar a data ao selecionar no input de data
  const selecionarData = (e) => {
    const novaData = new Date(e.target.value);
    setData(novaData);
  };

  // Funções para navegação com setas
  const avancarData = () => {
    setData(prevData => {
      const novaData = new Date(prevData);
      novaData.setDate(prevData.getDate() + 1);  // Avançar 1 dia
      return novaData;
    });
  };
  const retrocederData = () => {
    setData(prevData => {
      const novaData = new Date(prevData);
      novaData.setDate(prevData.getDate() - 1);  // Retroceder 1 dia
      return novaData;
    });
  };

  return (
    <div className={mostrarModal ? styles.modalOpen : styles.container}>
      <div className={styles.header}>
        <h2 className={styles.title}>
          <CalendarIcon />
          Agenda do Dia
        </h2>
      </div>

      {/* Container para o calendário com as setas */}
      <div className={styles.datePickerContainer}>
        <button onClick={retrocederData} className={styles.arrowButton}>
          <ChevronLeft size={24} />
        </button>

        <input
          type="date"
          value={format(data, "yyyy-MM-dd")}  // Formatação da data para o formato compatível com o input type="date"
          onChange={selecionarData}  // Atualiza a data ao selecionar no calendário
          className={styles.datePicker}
        />

        <button onClick={avancarData} className={styles.arrowButton}>
          <ChevronRight size={24} />
        </button>
      </div>

      <h3 className={styles.dateTitle}>
        {format(data, "dd 'de' MMMM 'de' yyyy", { locale: ptBR })}
      </h3>

      <div className={styles.timeSlotContainer}>
        {HorariosDisponiveis.map((horario) => {
          const agendamento = ObterAgendamentoParaHorario(horario);
          return (
            <div key={horario} className={styles.timeSlot}>
              <span>{horario}</span>
              {agendamento ? (
                <span>{agendamento.pacienteNome}  -  {agendamento.status}</span>
              ) : (
                <ModalCriarAgendamento horarioSelecionado={horario} data={data}/>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Calendario;
