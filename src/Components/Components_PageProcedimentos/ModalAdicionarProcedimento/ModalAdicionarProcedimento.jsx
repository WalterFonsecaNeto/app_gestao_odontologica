import { useState, useEffect } from "react";
import styles from "./ModalAdicionarProcedimento.module.css";
import ProcedimentoApi from "../../../Services/MinhaApi/Procedimento";
import EspecialidadeApi from "../../../Services/MinhaApi/Especialidade";

function ModalAdicionarProcedimento({ fecharModal }) {
  //Objeto Paciente
  const [procedimento, setProcedimento] = useState({
    nome: "",
    descricao: "",
    valor: "",
    especialidadeId: "",
  });
  const [especialidades, setEspecialidades] = useState([]);

  async function SalvarProcedimento(event) {
    event.preventDefault();

    const usuarioId = localStorage.getItem("usuarioId");

    try {
      await ProcedimentoApi.criarProcedimentoAsync(
        usuarioId,
        procedimento.nome,
        procedimento.descricao,
        procedimento.valor,
        procedimento.especialidadeId
      );
      alert("Procedimento cadastrado com sucesso!");
      fecharModal(); // Fecha o modal após o cadastro
      window.location.reload(); // Força o recarregamento da página
    } catch (error) {
      console.error(error);
      alert("Ocorreu um erro ao cadastrar o procedimento. Tente novamente.");
    }

    setProcedimento({
      nome: "",
      descricao: "",
      valor: "",
      especialidadeId: "",
    });
  }

  const AtualizarProcedimento = (event) => {
    const { name, value } = event.target;
    setProcedimento({ ...procedimento, [name]: value });
  };

  async function ListarEspecialidades() {
    try {
      const usuarioId = localStorage.getItem("usuarioId");
      const response =
        await EspecialidadeApi.listarEspecialidadesPorUsuarioAsync(
          usuarioId,
          true
        );
      setEspecialidades(response);
    } catch (error) {
      console.error(error);
      alert("Ocorreu um erro ao listar as especialidades. Tente novamente.");
    }
  }

  useEffect(() => {
    ListarEspecialidades();
  }, []);

  function mostrarOpcoesEspecialidades() {
    return (
      <>
        <option value="">Selecione uma especialidade</option>
        {especialidades.map((especialidade) => (
          <option key={especialidade.id} value={especialidade.id}>
            {especialidade.nome}
          </option>
        ))};
      </>
    );
  }

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <div className={styles.modalTituloSair}>
          <button className={styles.closeButton} onClick={fecharModal}>
            ✖
          </button>
          <h2>Cadastro de Procedimento</h2>
        </div>
        <form onSubmit={SalvarProcedimento}>
          <label>Nome:</label>
          <input
            type="text"
            placeholder="Digite o nome do procedimento"
            name="nome"
            maxLength="100"
            value={procedimento.nome}
            onChange={AtualizarProcedimento}
            required
          />

          <label>Descrição:</label>
          <input
            type="text"
            placeholder="Digite a descrição do procedimento"
            name="descricao"
            maxLength="255"
            value={procedimento.descricao}
            onChange={AtualizarProcedimento}
            required
          />

          <label>Valor:</label>
          <input
            type="number"
            placeholder="Digite o valor do procedimento"
            name="valor"
            value={procedimento.valor}
            onChange={AtualizarProcedimento}
            required
          />

          <label>Especialidade:</label>
          <select
            name="especialidadeId"
            placeholder="Especialidade"
            value={procedimento.especialidadeId}
            onChange={AtualizarProcedimento}
            required
          >
            {mostrarOpcoesEspecialidades()}
          </select>

          <button type="submit">Salvar</button>
        </form>
      </div>
    </div>
  );
}

export default ModalAdicionarProcedimento;
