import { HTTPClient } from "../Cliente";

const UsuarioApi = {
  async obterUsuarioAsync(usuarioId, ativo) {
    try {
      const response = await HTTPClient.get(
        `/Usuario/Obter/${usuarioId}?ativo=${ativo}`
      );
      console.log(response.data);
      return response.data;
    } catch (error) {
      console.error("Erro ao obter usuário:", error);
      throw error;
    }
  },

  async listarUsuariosAsync(ativos) {
    try {
      const response = await HTTPClient.get(`/Usuario/Listar?ativos=${ativos}`);
      return response.data;
    } catch (error) {
      console.error("Erro ao listar usuários:", error);
      throw error;
    }
  },

  async criarUsuarioAsync(nome, email, senha) {
    try {
      const usuarioCriar = {
        Nome: nome,
        Email: email,
        Senha: senha,
      };
      const response = await HTTPClient.post(`/Usuario/Criar`, usuarioCriar);
      return response.data;
    } catch (error) {
      console.error("Erro ao criar usuário:", error);
      throw error;
    }
  },

  async atualizarUsuarioAsync(usuarioId, nome, email) {
    try {
      const usuarioAtualizar = {
        Nome: nome,
        Email: email,
      };
      const response = await HTTPClient.put(
        `/Usuario/Atualizar/${usuarioId}`,
        usuarioAtualizar
      );
      return response.data;
    } catch (error) {
      console.error("Erro ao atualizar usuário:", error);
      throw error;
    }
  },

  async atualizarSenhaUsuarioAsync(usuarioId, senhaNova, senhaAntiga) {
    try {
      const usuarioAtualizarSenha = {
        senhaNova: senhaNova,
        senhaAntiga: senhaAntiga,
      };
      const response = await HTTPClient.put(
        `Usuario/AtualizarSenha/${usuarioId}`,
        usuarioAtualizarSenha
      );
      return response.data;
    } catch (error) {
      console.error("Erro ao atualizar usuário:", error);
      throw error;
    }
  },

  async deletarUsuarioAsync(usuarioId) {
    try {
      const response = await HTTPClient.delete(`/Usuario/Deletar/${usuarioId}`);
      return response.data;
    } catch (error) {
      console.error("Erro ao deletar usuário:", error);
      throw error;
    }
  },

  async restaurarUsuarioAsync(usuarioId) {
    try {
      const response = await HTTPClient.put(`/Usuario/Restaurar/${usuarioId}`);
      return response.data;
    } catch (error) {
      console.error("Erro ao restaurar usuário:", error);
      throw error;
    }
  },

  async validarUsuarioAsync(email, senha) {
    try {
      const usuarioValidar = {
        email: email,
        senha: senha,
      };
      const response = await HTTPClient.post(
        `/Usuario/Validar`,
        usuarioValidar
      );
      return response.data;
    } catch (error) {
      console.error("Erro ao restaurar usuário:", error);
      throw error;
    }
  },
};

export default UsuarioApi;
