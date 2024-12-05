import { useState, useEffect } from "react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { toast } from "sonner";
import { Calendar as CalendarIcon } from "lucide-react";
import axios from "axios";  // Importando o Axios
import styles from "./Calendario.module.css";

const Calendario = () => {
  const [data, setData] = useState(new Date());
  const [agendamentos, setAgendamentos] = useState([]);

  // Definindo os horários disponíveis
  const horariosDisponiveis = Array.from({ length: 21 }, (_, index) => {
    const hora = Math.floor(index / 2) + 8;
    const minutos = (index % 2) * 30;
    return `${hora.toString().padStart(2, "0")}:${minutos.toString().padStart(2, "0")}`;
  });

  // Função para carregar os agendamentos do banco de dados via API usando Axios
  const mostrarAgendamentos = async () => {
    try {
      const resposta = await axios.get("http://localhost:5000/api/appointments");
      setAgendamentos(resposta.data); // Atualiza o estado com os agendamentos
    } catch (erro) {
      console.error("Erro ao carregar os agendamentos:", erro);
      toast.error("Erro ao carregar os agendamentos.");
    }
  };

  // Função para criar um novo agendamento
  const agendarConsulta = async (horario) => {
    const nomePaciente = prompt("Nome do paciente:");
    if (nomePaciente) {
      try {
        const resposta = await axios.post("http://localhost:5000/api/appointments", {
          time: horario,
          patientName: nomePaciente,
        });
        
        setAgendamentos([...agendamentos, resposta.data]); // Atualiza o estado com o novo agendamento
        toast.success("Consulta agendada com sucesso!");
      } catch (erro) {
        console.error("Erro ao agendar consulta:", erro);
        toast.error("Erro ao agendar consulta.");
      }
    }
  };

  // Buscar agendamentos ao carregar a página
  useEffect(() => {
    mostrarAgendamentos();
  }, []);

  // Função para verificar se há agendamento no horário
  const obterAgendamentoParaHorario = (horario) => {
    return agendamentos.find((agendamento) => agendamento.time === horario);
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.title}>
          <CalendarIcon />
          Agenda do Dia
        </h2>
      </div>
      <div>
        <h3 className={styles.dateTitle}>
          {format(data, "dd 'de' MMMM 'de' yyyy", { locale: ptBR })}
        </h3>
        <div className={styles.timeSlotContainer}>
          {horariosDisponiveis.map((horario) => {
            const agendamento = obterAgendamentoParaHorario(horario);
            return (
              <div key={horario} className={styles.timeSlot}>
                <span>{horario}</span>
                {agendamento ? (
                  <span>Paciente: {agendamento.patientName}</span>
                ) : (
                  <button 
                    className={styles.button}
                    onClick={() => agendarConsulta(horario)}
                  >
                    Agendar
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Calendario;
