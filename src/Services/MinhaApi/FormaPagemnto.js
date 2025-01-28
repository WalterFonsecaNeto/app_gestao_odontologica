import { HTTPClient } from "../Cliente";

const FormaPagamentoApi = {
  async obterFormaPagamentoAsync(formaPagamentoId, usuarioId, ativo) {
    const response = await HTTPClient.get(
      `/FormaPagamento/Obter/${formaPagamentoId}/Usuario/${usuarioId}?ativo=${ativo}`
    );
    return response.data;
  },

  async listarFormasPagamentoPorUsuarioAsync(usuarioId, ativo) {
    const response = await HTTPClient.get(
      `/FormaPagamento/Listar/Usuario/${usuarioId}?ativo=${ativo}`
    );
    return response.data;
  },

  async criarFormaPagamentoAsync(usuarioId, nome) {
    const formaPagamentoCriar = {
      UsuarioId: usuarioId,
      Nome: nome,
    };
    const response = await HTTPClient.post(
      "/FormaPagamento/Criar",
      formaPagamentoCriar
    );
    return response.data;
  },

  async atualizarFormaPagamentoAsync(formaPagamentoId, usuarioId, nome) {
    const formaPagamentoAtualizar = {
      Nome: nome,
    };
    const response = await HTTPClient.put(
      `/FormaPagamento/Atualizar/${formaPagamentoId}/Usuario/${usuarioId}`,
      formaPagamentoAtualizar
    );
    return response.data;
  },

  async deletarFormaPagamentoAsync(formaPagamentoId, usuarioId) {
    const response = await HTTPClient.delete(
      `/FormaPagamento/Deletar/${formaPagamentoId}/Usuario/${usuarioId}`
    );
    return response.data;
  },

  async restaurarFormaPagamentoAsync(formaPagamentoId, usuarioId) {
    const response = await HTTPClient.put(
      `/FormaPagamento/Restaurar/${formaPagamentoId}/Usuario/${usuarioId}`
    );
    return response.data;
  },
};

export default FormaPagamentoApi;
