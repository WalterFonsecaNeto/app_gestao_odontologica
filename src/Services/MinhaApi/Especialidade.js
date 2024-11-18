import { HTTPClient } from "../Cliente";

const EspecialidadeApi = {

    
  async obterEspecialidadeAsync(especialidadeId, usuarioId, ativo) {
    try {
      const response = await HTTPClient.get(`/Especialidade/Obter/${especialidadeId}/Usuario/${usuarioId}?ativo=${ativo}`);
      return response.data;
    } catch (error) {
      console.error("Erro ao obter especialidade:", error);
    }
  },


  async listarEspecialidadesPorUsuarioAsync(usuarioId, ativo) {
    try {
      const response = await HTTPClient.get(`/Especialidade/Listar/Usuario/${usuarioId}?ativo=${ativo}`);
      return response.data;
    } catch (error) {
      console.error("Erro ao listar especialidades:", error);
    }
  },


  async criarEspecialidadeAsync(usuarioId, nome) {
    try {
      const especialidadeCriar = {
        UsuarioId: usuarioId,
        Nome: nome,
      };
      const response = await HTTPClient.post("/Especialidade/Criar", especialidadeCriar);
      return response.data;
    } catch (error) {
      console.error("Erro ao criar especialidade:", error);
    }
  },


  async atualizarEspecialidadeAsync(especialidadeId, usuarioId, nome) {
    try {
      const especialidadeAtualizar = {
        Nome: nome,
      };
      const response = await HTTPClient.put(`/Especialidade/Atualizar/${especialidadeId}/Usuario/${usuarioId}`, especialidadeAtualizar);
      return response.data;
    } catch (error) {
      console.error("Erro ao atualizar especialidade:", error);
    }
  },


  async deletarEspecialidadeAsync(especialidadeId, usuarioId) {
    try {
      const response = await HTTPClient.put(`/Especialidade/Deletar/${especialidadeId}/Usuario/${usuarioId}`);
      return response.data;
    } catch (error) {
      console.error("Erro ao deletar especialidade:", error);
    }
  },


  async restaurarEspecialidadeAsync(especialidadeId, usuarioId) {
    try {
      const response = await HTTPClient.put(`/Especialidade/Restaurar/${especialidadeId}/Usuario/${usuarioId}`);
      return response.data;
    } catch (error) {
      console.error("Erro ao restaurar especialidade:", error);
    }
  },
};

export default EspecialidadeApi;
