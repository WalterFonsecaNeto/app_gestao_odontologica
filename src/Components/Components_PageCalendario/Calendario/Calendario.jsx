import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import AgendamentoApi from "../../../Services/MinhaApi/Agendamento";
import styles from './Calendario.module.css';

// Configura o moment para usar o idioma português
import 'moment/locale/pt-br';
moment.locale('pt-br');

const localizer = momentLocalizer(moment);

const messages = {
  today: 'Hoje',
  previous: '<',
  next: '>',
  month: 'Mês',
  week: 'Semana',
  day: 'Dia',
  agenda: 'Agenda',
  date: 'Data',
  time: 'Hora',
  event: 'Evento',
  noEventsInRange: 'Não há eventos no período selecionado.',
};

const Calendario = () => {
  const [events, setEvents] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [agendamentosDoDia, setAgendamentosDoDia] = useState([]);
  const [loading, setLoading] = useState(false);

  const buscarAgendamentos = async () => {
    setLoading(true);
    try {
      const usuarioId = localStorage.getItem('usuarioId');

      const response = await AgendamentoApi.listarAgendamentoPorUsuarioIdAsync(usuarioId, true);
      console.log("Agendamentos da API:", response);

      // Converte os agendamentos para o formato do calendário
      const eventosFormatados = response.map((agendamento) => ({
        title: agendamento.descricao, // Nome do paciente na exibição do evento
        start: new Date(agendamento.dataHora),
        end: new Date(agendamento.dataHora),
        pacienteNome: agendamento.pacienteNome, // Guarda o nome do paciente
        status: agendamento.status // Guarda o status
      }));

      setEvents(eventosFormatados);
    } catch (error) {
      console.error('Erro ao buscar agendamentos:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    buscarAgendamentos();
  }, []);

  const handleSelectSlot = (slotInfo) => {
    const dataSelecionada = moment(slotInfo.start).format('YYYY-MM-DD');
    setSelectedDate(slotInfo.start);

    // Filtra os agendamentos para o dia clicado
    const agendamentosFiltrados = events.filter(evento =>
      moment(evento.start).format('YYYY-MM-DD') === dataSelecionada
    );

    console.log("Agendamentos do dia:", agendamentosFiltrados);
    setAgendamentosDoDia(agendamentosFiltrados);
  };

  return (
    <div className={styles.calendario}>
      <header className={styles.header}>
        <h2>Calendário de Agendamentos</h2>
      </header>

      <div className={styles.calendarioWrapper}>
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          defaultView="month"
          selectable
          onSelectSlot={handleSelectSlot}
          onSelectEvent={(event) => alert(`Agendamento: ${event.title}\nPaciente: ${event.pacienteNome}\nStatus: ${event.status}`)}
          messages={messages}
          style={{ height: 600 }}
        />
      </div>

      <div className={styles.agendamentos}>
        <h3>Agendamentos para {selectedDate ? moment(selectedDate).format('DD/MM/YYYY') : 'Nenhum dia selecionado'}</h3>
        {loading ? (
          <p>Carregando...</p>
        ) : agendamentosDoDia.length > 0 ? (
          <ul>
            {agendamentosDoDia.map((agendamento, index) => (
              <li key={index}>
                <strong>Horário:</strong> {moment(agendamento.start).format('HH:mm')}<br />
                <strong>Paciente:</strong> {agendamento.pacienteNome || 'Não informado'}<br />
                <strong>Status:</strong> {agendamento.status || 'Não informado'}<br />
                <strong>Descrição:</strong> {agendamento.title}
              </li>
            ))}
          </ul>
        ) : (
          <p>Nenhum agendamento para este dia.</p>
        )}
      </div>
    </div>
  );
};

export default Calendario;
