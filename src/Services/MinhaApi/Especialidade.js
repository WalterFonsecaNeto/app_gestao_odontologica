import { HTTPClient } from "../Cliente";

const EspecialidadeApi = {
  
  async obterEspecialidadeAsync(especialidadeId, usuarioId, ativo) {
    const response = await HTTPClient.get(
      `/Especialidade/Obter/${especialidadeId}/Usuario/${usuarioId}?ativo=${ativo}`
    );
    return response.data;
  },

  async listarEspecialidadesPorUsuarioAsync(usuarioId, ativo) {
    const response = await HTTPClient.get(
      `/Especialidade/Listar/Usuario/${usuarioId}?ativo=${ativo}`
    );
    return response.data;
  },

  async criarEspecialidadeAsync(usuarioId, nome) {
    const especialidadeCriar = {
      UsuarioId: usuarioId,
      Nome: nome,
    };
    const response = await HTTPClient.post(
      "/Especialidade/Criar",
      especialidadeCriar
    );
    return response.data;
  },

  async atualizarEspecialidadeAsync(especialidadeId, usuarioId, nome) {
    const especialidadeAtualizar = {
      Nome: nome,
    };
    const response = await HTTPClient.put(
      `/Especialidade/Atualizar/${especialidadeId}/Usuario/${usuarioId}`,
      especialidadeAtualizar
    );
    return response.data;
  },

  async deletarEspecialidadeAsync(especialidadeId, usuarioId) {
    const response = await HTTPClient.delete(
      `/Especialidade/Deletar/${especialidadeId}/Usuario/${usuarioId}`
    );
    return response.data;
  },

  async restaurarEspecialidadeAsync(especialidadeId, usuarioId) {
    const response = await HTTPClient.put(
      `/Especialidade/Restaurar/${especialidadeId}/Usuario/${usuarioId}`
    );
    return response.data;
  },
};

export default EspecialidadeApi;
