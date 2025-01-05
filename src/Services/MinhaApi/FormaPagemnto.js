import { HTTPClient } from "../Cliente";

const FormaPagamentoApi = {

  async obterFormaPagamentoAsync(formaPagamentoId, usuarioId, ativo) {
    try {
      const response = await HTTPClient.get(`/FormaPagamento/Obter/${formaPagamentoId}/Usuario/${usuarioId}?ativo=${ativo}`);
      return response.data;
    } catch (error) {
      console.error("Erro ao obter forma de pagamento:", error);
    }
  },

  async listarFormasPagamentoPorUsuarioAsync(usuarioId, ativo) {
    try {
      const response = await HTTPClient.get(`/FormaPagamento/Listar/Usuario/${usuarioId}?ativo=${ativo}`);
      return response.data;
    } catch (error) {
      console.error("Erro ao listar formas de pagamento:", error);
    }
  },

  async criarFormaPagamentoAsync(usuarioId, nome) {
    try {
      const formaPagamentoCriar = {
        UsuarioId: usuarioId,
        Nome: nome,
      };
      const response = await HTTPClient.post("/FormaPagamento/Criar", formaPagamentoCriar);
      return response.data;
    } catch (error) {
      console.error("Erro ao criar forma de pagamento:", error);
    }
  },

  async atualizarFormaPagamentoAsync(formaPagamentoId, usuarioId, nome) {
    try {
      const formaPagamentoAtualizar = {
        Nome: nome,
      };
      const response = await HTTPClient.put(`/FormaPagamento/Atualizar/${formaPagamentoId}/Usuario/${usuarioId}`, formaPagamentoAtualizar);
      return response.data;
    } catch (error) {
      console.error("Erro ao atualizar forma de pagamento:", error);
    }
  },

  async deletarFormaPagamentoAsync(formaPagamentoId, usuarioId) {
    try {
      const response = await HTTPClient.delete(`/FormaPagamento/Deletar/${formaPagamentoId}/Usuario/${usuarioId}`);
      return response.data;
    } catch (error) {
      console.error("Erro ao deletar forma de pagamento:", error);
    }
  },

  async restaurarFormaPagamentoAsync(formaPagamentoId, usuarioId) {
    try {
      const response = await HTTPClient.put(`/FormaPagamento/Restaurar/${formaPagamentoId}/Usuario/${usuarioId}`);
      return response.data;
    } catch (error) {
      console.error("Erro ao restaurar forma de pagamento:", error);
    }
  },
};

export default FormaPagamentoApi;
