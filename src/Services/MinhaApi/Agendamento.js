import { HTTPClient } from "../Cliente";

const AgendamentoApi = {
 
  async criarAgendamentoAsync(usuarioId, pacienteId, dataHora, status, descricao) {
    try {
      console.log(usuarioId, pacienteId, dataHora, status, descricao)
      
      const agendamentoCriar = {
        
        pacienteId : pacienteId,
        dataHora: dataHora,
        status: status,
        descricao: descricao,
        usuarioId: usuarioId,
      };
      console.log("Pq ta assim",agendamentoCriar);
      const response = await HTTPClient.post("/Agendamento/Criar", agendamentoCriar);
      return response.data;
    } catch (error) {
      console.error("Erro ao criar agendamento:", error);
    }
  },

  async atualizarAgendamentoAsync(agendamentoId, usuarioId, pacienteId, dataHora, status, descricao) {
    try {
      const agendamentoAtualizar = {
        pacienteId,
        dataHora,
        status,
        descricao,
      };
      const response = await HTTPClient.put(
        `/Agendamento/AtualizarPorAgendamentoId/${agendamentoId}/Usuario/${usuarioId}`,
        agendamentoAtualizar
      );
      return response.data;
    } catch (error) {
      console.error("Erro ao atualizar agendamento:", error);
    }
  },

  async deletarAgendamentoAsync(agendamentoId, usuarioId) {
    try {
      const response = await HTTPClient.delete(
        `/Agendamento/DeletarPorAgendamentoId/${agendamentoId}/Usuario/${usuarioId}`
      );
      return response.data;
    } catch (error) {
      console.error("Erro ao deletar agendamento:", error);
    }
  },

  async restaurarAgendamentoAsync(agendamentoId, usuarioId) {
    try {
      const response = await HTTPClient.put(
        `/Agendamento/RestaurarPorAgendamentoId/${agendamentoId}/Usuario/${usuarioId}`
      );
      return response.data;
    } catch (error) {
      console.error("Erro ao restaurar agendamento:", error);
    }
  },

  async obterAgendamentoPorAgendamentoIdAsync(agendamentoId, usuarioId, ativo) {
    try {
      const response = await HTTPClient.get(
        `/Agendamento/ObterPorAgendamentoId/${agendamentoId}/Usuario/${usuarioId}?ativo=${ativo}`
      );
      return response.data;
    } catch (error) {
      console.error("Erro ao obter agendamento:", error);
    }
  },

  async listarAgendamentoPorUsuarioIdAsync(usuarioId, ativo) {
    try {
      const response = await HTTPClient.get(
        `/Agendamento/ListarPorUsuarioId/${usuarioId}?ativo=${ativo}`
      );
      return response.data;
    } catch (error) {
      console.error("Erro ao listar agendamentos por usuário:", error);
    }
  },

  async listarAgendamentoPorPacienteIdAsync(pacienteId, usuarioId, ativo) {
    try {
      console.log("AQUIII1", pacienteId, usuarioId, ativo);
      const response = await HTTPClient.get(
        `/Agendamento/ListarPorPacienteId/${pacienteId}/Usuario/${usuarioId}?ativo=${ativo}`
      );
      console.log("AQUIII2", response);
      return response.data;
    } catch (error) {
      console.error("Erro ao listar agendamentos por paciente:", error);
    }
  },
};

export default AgendamentoApi;
