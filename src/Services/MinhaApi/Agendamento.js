import { HTTPClient } from "../Cliente";

const AgendamentoApi = {

  async criarAgendamentoAsync(usuarioId, pacienteId, dataHora, status, descricao) {
   
      const agendamentoCriar = {

        pacienteId: pacienteId,
        dataHora: dataHora,
        status: status,
        descricao: descricao,
        usuarioId: usuarioId,
      };
      const response = await HTTPClient.post("/Agendamento/Criar", agendamentoCriar);
      return response.data;
    
  },

  async atualizarAgendamentoAsync(agendamentoId, usuarioId, pacienteId, dataHora, status, descricao) {


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

  },

  async deletarAgendamentoAsync(agendamentoId, usuarioId) {
    
      const response = await HTTPClient.delete(
        `/Agendamento/DeletarPorAgendamentoId/${agendamentoId}/Usuario/${usuarioId}`
      );
      return response.data;
    
  },

  async restaurarAgendamentoAsync(agendamentoId, usuarioId) {
    
      const response = await HTTPClient.put(
        `/Agendamento/RestaurarPorAgendamentoId/${agendamentoId}/Usuario/${usuarioId}`
      );
      return response.data;
   
  },

  async obterAgendamentoPorAgendamentoIdAsync(agendamentoId, usuarioId, ativo) {
    
      const response = await HTTPClient.get(
        `/Agendamento/ObterPorAgendamentoId/${agendamentoId}/Usuario/${usuarioId}?ativo=${ativo}`
      );
      return response.data;
   
  },

  async listarAgendamentoPorUsuarioIdAsync(usuarioId, ativo) {
   
      const response = await HTTPClient.get(
        `/Agendamento/ListarPorUsuarioId/${usuarioId}?ativo=${ativo}`
      );
      return response.data;
    
  },

  async listarAgendamentoPorPacienteIdAsync(pacienteId, usuarioId, ativo) {

     
      const response = await HTTPClient.get(
        `/Agendamento/ListarPorPacienteId/${pacienteId}/Usuario/${usuarioId}?ativo=${ativo}`
      );
      console.log("AQUIII2", response);
      return response.data;
   
  },
};

export default AgendamentoApi;
