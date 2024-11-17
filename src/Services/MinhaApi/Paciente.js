import { HTTPClient } from "../Cliente";

const PacienteApi = {

    async obterPacienteAsync(pacienteId, usuarioId, ativo) {
        try {
            const response = await HTTPClient.get(`/Paciente/Obter/${pacienteId}/Usuario/${usuarioId}?ativo=${ativo}`);
            return response.data;
        } catch (error) {
            console.error("Erro ao obter paciente:", error);
        }
    },

    async listarPacientesPorUsuarioAsync(usuarioId, ativo) {
        try {
            const response = await HTTPClient.get(`/Paciente/Listar/Usuario/${usuarioId}?ativo=${ativo}`);
            return response.data;
        } catch (error) {
            console.error("Erro ao listar pacientes:", error);
        }
    },

    async criarPacienteAsync(usuarioId, nome, dataNacimento, genero, cpf, endereco, telefone, email, historicoMedico){
        try {
            const pacienteCriar = {
              UsuarioId: usuarioId,
              Nome: nome,
              DataNascimento: dataNacimento,
              Genero: genero,
              Cpf: cpf,
              Endereco: endereco,
              Telefone: telefone,
              Email: email,
              HistoricoMedico: historicoMedico,
            };
            const response = await HTTPClient.post("/Paciente/Criar", pacienteCriar);
            return response.data;
          } catch (error) {
            console.error("Erro ao criar pacientes:", error);
          }

    },

    async atualizarPacienteAsync(pacienteId, usuarioId, nome, dataNacimento, genero, cpf, endereco, telefone, email, historicoMedico){
        try {
            const pacienteAtualizar = {
              Nome: nome,
              DataNascimento: dataNacimento,
              Genero: genero,
              Cpf: cpf,
              Endereco: endereco,
              Telefone: telefone,
              Email: email,
              HistoricoMedico: historicoMedico,
            };
            const response = await HTTPClient.put(`/Paciente/Atualizar/${pacienteId}/Usuario/${usuarioId}`, pacienteAtualizar);
            return response.data;
          } catch (error) {
            console.error("Erro ao atualizar paciente:", error);
          }
    },

    async deletarPacienteAsync(pacienteId, usuarioId){
        try {
            const response = await HTTPClient.put(`/Paciente/Deletar/${pacienteId}/Usuario/${usuarioId}`);
            return response.data;
          } catch (error) {
            console.error("Erro ao deletar paciente:", error);
          }
    },

    async restaurarPacienteAsync(pacienteId, usuarioId){
        try {
            const response = await HTTPClient.put(`/Paciente/Restaurar/${pacienteId}/Usuario/${usuarioId}`);
            return response.data;
          } catch (error) {
            console.error("Erro ao restaurar paciente:", error);
          }
    },


}

export default PacienteApi;
