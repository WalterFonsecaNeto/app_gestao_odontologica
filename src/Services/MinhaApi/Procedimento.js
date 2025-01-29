import { HTTPClient } from "../Cliente";

const ProcedimentoApi = {
  async obterProcedimentoAsync(procedimentoId, usuarioId) {
    const response = await HTTPClient.get(
      `/Procedimento/Obter/${procedimentoId}/Usuario/${usuarioId}`
    );
    return response.data;
  },

  async listarProcedimentosPorUsuarioAsync(usuarioId, ativo) {
    const response = await HTTPClient.get(
      `/Procedimento/Listar/Usuario/${usuarioId}?ativo=${ativo}`
    );
    return response.data;
  },

  async criarProcedimentoAsync(
    usuarioId,
    nome,
    descricao,
    valor,
    especialidadeId
  ) {
    const procedimentoCriar = {
      usuarioId,
      nome,
      descricao,
      valor,
      especialidadeId,
    };
    const response = await HTTPClient.post(
      "/Procedimento/Criar",
      procedimentoCriar
    );
    return response.data;
  },

  async atualizarProcedimentoAsync(
    procedimentoId,
    nome,
    descricao,
    valor,
    especialidadeId
  ) {
    const procedimentoAtualizar = {
      nome,
      descricao,
      valor,
      especialidadeId,
    };
    const response = await HTTPClient.put(
      `/Procedimento/Atualizar/${procedimentoId}`,
      procedimentoAtualizar
    );
    return response.data;
  },

  async deletarProcedimentoAsync(procedimentoId, usuarioId) {
    const response = await HTTPClient.delete(
      `/Procedimento/Deletar/${procedimentoId}/Usuario/${usuarioId}`
    );
    return response.data;
  },

  async restaurarProcedimentoAsync(procedimentoId, usuarioId) {
    const response = await HTTPClient.put(
      `/Procedimento/Restaurar/${procedimentoId}/Usuario/${usuarioId}`
    );
    return response.data;
  },
};

export default ProcedimentoApi;
