import { HTTPClient } from "../Cliente";

const ProcedimentoApi = {

  // Obter Procedimento por ID
  async obterProcedimentoAsync(procedimentoId, usuarioId) {
    try {
      const response = await HTTPClient.get(`/Procedimento/Obter/${procedimentoId}/Usuario/${usuarioId}`);
      return response.data;
    } catch (error) {
      console.error("Erro ao obter procedimento:", error);
    }
  },

  // Listar Procedimentos por Usuário com filtro ativo
  async listarProcedimentosPorUsuarioAsync(usuarioId, ativo) {
    try {
      const response = await HTTPClient.get(`/Procedimento/Listar/Usuario/${usuarioId}?ativo=${ativo}`);
      return response.data;
    } catch (error) {
      console.error("Erro ao listar procedimentos:", error);
    }
  },

  // Criar Procedimento
  async criarProcedimentoAsync(usuarioId, nome, descricao, valor, especialidadeId) {
    try {
      const procedimentoCriar = {
        usuarioId,
        nome,
        descricao,
        valor,
        especialidadeId,
      };
      const response = await HTTPClient.post("/Procedimento/Criar", procedimentoCriar);
      return response.data;
    } catch (error) {
      console.error("Erro ao criar procedimento:", error);
    }
  },

  // Atualizar Procedimento
  async atualizarProcedimentoAsync(procedimentoId, nome, descricao, valor, especialidadeId) {
    try {
      const procedimentoAtualizar = {
        nome,
        descricao,
        valor,
        especialidadeId,
      };
      const response = await HTTPClient.put(`/Procedimento/Atualizar/${procedimentoId}`, procedimentoAtualizar);
      return response.data;
    } catch (error) {
      console.error("Erro ao atualizar procedimento:", error);
    }
  },

  // Deletar Procedimento
  async deletarProcedimentoAsync(procedimentoId, usuarioId) {
    try {
      const response = await HTTPClient.delete(`/Procedimento/Deletar/${procedimentoId}/Usuario/${usuarioId}`);
      return response.data;
    } catch (error) {
      console.error("Erro ao deletar procedimento:", error);
    }
  },

  // Restaurar Procedimento
  async restaurarProcedimentoAsync(procedimentoId, usuarioId) {
    try {
      const response = await HTTPClient.put(`/Procedimento/Restaurar/${procedimentoId}/Usuario/${usuarioId}`);
      return response.data;
    } catch (error) {
      console.error("Erro ao restaurar procedimento:", error);
    }
  },
};

export default ProcedimentoApi;
