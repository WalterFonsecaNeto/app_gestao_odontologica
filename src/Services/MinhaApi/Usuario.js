import { HTTPClient } from "../Cliente";

const UsuarioApi = {
  async obterUsuarioAsync(usuarioId, ativo) {
    const response = await HTTPClient.get(
      `/Usuario/Obter/${usuarioId}?ativo=${ativo}`
    );
    console.log(response.data);
    return response.data;
  },

  async listarUsuariosAsync(ativos) {
    const response = await HTTPClient.get(`/Usuario/Listar?ativos=${ativos}`);
    return response.data;
  },

  async criarUsuarioAsync(nome, email, senha) {
    const usuarioCriar = {
      Nome: nome,
      Email: email,
      Senha: senha,
    };
    const response = await HTTPClient.post(`/Usuario/Criar`, usuarioCriar);
    return response.data;
  },

  async atualizarUsuarioAsync(usuarioId, nome, email) {
    const usuarioAtualizar = {
      Nome: nome,
      Email: email,
    };
    const response = await HTTPClient.put(
      `/Usuario/Atualizar/${usuarioId}`,
      usuarioAtualizar
    );
    return response.data;
  },

  async atualizarSenhaUsuarioAsync(usuarioId, senhaNova, senhaAntiga) {
    const usuarioAtualizarSenha = {
      senhaNova: senhaNova,
      senhaAntiga: senhaAntiga,
    };
    const response = await HTTPClient.put(
      `Usuario/AtualizarSenha/${usuarioId}`,
      usuarioAtualizarSenha
    );
    return response.data;
  },

  async deletarUsuarioAsync(usuarioId) {
    const response = await HTTPClient.delete(`/Usuario/Deletar/${usuarioId}`);
    return response.data;
  },

  async restaurarUsuarioAsync(usuarioId) {
    const response = await HTTPClient.put(`/Usuario/Restaurar/${usuarioId}`);
    return response.data;
  },

  async validarUsuarioAsync(email, senha) {
    const usuarioValidar = {
      email: email,
      senha: senha,
    };
    const response = await HTTPClient.post(`/Usuario/Validar`, usuarioValidar);
    return response.data;
  },
};

export default UsuarioApi;
