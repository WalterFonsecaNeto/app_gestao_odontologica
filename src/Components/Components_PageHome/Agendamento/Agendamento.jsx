import { useState, useEffect } from "react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight } from "lucide-react";
import styles from "./Agendamento.module.css";
import AgendamentoApi from "../../../Services/MinhaApi/Agendamento";
import ModalCriarAgendamento from "../ModalCriarAgendamento/ModalCriarAgendamento";
import ModalEditarAgendamento from "../ModalEditarAgendamento/ModalEditarAgendamento";

const Agendamento = () => {
  const [data, setData] = useState(new Date());
  const [agendamentos, setAgendamentos] = useState([]);

  const HorariosDisponiveis = Array.from({ length: 21 }, (_, index) => {
    const hora = Math.floor(index / 2) + 8;
    const minutos = (index % 2) * 30;
    return `${hora.toString().padStart(2, "0")}:${minutos.toString().padStart(2, "0")}`;
  });

  const ListarAgendamentosApi = async () => {
    try {
      const usuarioId = localStorage.getItem("usuarioId");
      const resposta = await AgendamentoApi.listarAgendamentoPorUsuarioIdAsync(usuarioId, true);
      setAgendamentos(resposta);
    } catch (erro) {
      console.error("Erro ao carregar os agendamentos:", erro);
    }
  };

  useEffect(() => {
    ListarAgendamentosApi();
  }, [data]);

  const ObterAgendamentoParaHorario = (horario) => {
    return agendamentos.find((agendamento) => {
      const dataAgendamento = format(new Date(agendamento.dataHora), "yyyy-MM-dd");
      const horaAgendamento = format(new Date(agendamento.dataHora), "HH:mm");
      const dataAtual = format(data, "yyyy-MM-dd");
      return dataAgendamento === dataAtual && horaAgendamento === horario;
    });
  };

  const selecionarData = (e) => {
    const novaData = new Date(e.target.value);
    setData(novaData);
  };

  const avancarData = () => {
    setData((prevData) => {
      const novaData = new Date(prevData);
      novaData.setDate(prevData.getDate() + 1);
      return novaData;
    });
  };

  const retrocederData = () => {
    setData((prevData) => {
      const novaData = new Date(prevData);
      novaData.setDate(prevData.getDate() - 1);
      return novaData;
    });
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.title}>
          <CalendarIcon />
          Agenda do Dia
        </h2>
      </div>

      <div className={styles.datePickerContainer}>
        <button onClick={retrocederData} className={styles.arrowButton}>
          <ChevronLeft size={24} />
        </button>

        <input
          type="date"
          value={format(data, "yyyy-MM-dd")}
          onChange={selecionarData}
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
                <span className={styles.container_agendamento_marcado}>
                  {agendamento.pacienteNome} - {agendamento.status}{" "}
                  <ModalEditarAgendamento agendamentoSelecionado={agendamento} />
                </span>
              ) : (
                <ModalCriarAgendamento horarioSelecionado={horario} data={data} />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Agendamento;
