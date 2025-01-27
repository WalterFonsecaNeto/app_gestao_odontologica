import { useState, useEffect } from "react";
import ModalGlobal from "../../ModalGlobal/ModalGlobal"; // Importando o ModalGlobal
import BotaoNovo from "../../BotaoNovo/BotaoNovo"; // Importando o BotaoNovo
import ProcedimentoApi from "../../../Services/MinhaApi/Procedimento";
import EspecialidadeApi from "../../../Services/MinhaApi/Especialidade";
import styles from "./ModalAdicionarProcedimento.module.css"; // Importando o arquivo CSS

function ModalAdicionarProcedimento() {
  const [procedimento, setProcedimento] = useState({
    nome: "",
    descricao: "",
    valor: "",
    especialidadeId: "",
  });
  const [especialidades, setEspecialidades] = useState([]);
  const [aberto, setAberto] = useState(false);

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
    setAberto(false); // Fechar o modal após salvar
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

  function MostrarOpcoesEspecialidades() {
    return (
      <>
        <option value="">Selecione uma especialidade</option>
        {especialidades?.map((especialidade) => (
          <option key={especialidade.id} value={especialidade.id}>
            {especialidade.nome}
          </option>
        ))}
      </>
    );
  }

  //Verificar com useEffect se o aberto é falso ou seja esta fechado para excluir valore dos imputs
  useEffect(() => {
    if (!aberto) {
      setProcedimento({
        nome: "",
        descricao: "",
        valor: "",
        especialidadeId: "",
      });
    }
  }, [aberto]);

  return (
    <div>
      {/* Botão Novo, que agora é o BotaoNovo */}
      <BotaoNovo AbrirModal={() => setAberto(true)} />

      {aberto && (
        <ModalGlobal
          aberto={aberto}
          setAberto={setAberto}
          titulo="Cadastro de Procedimento"
        >
          <div className={styles.container_formulario}>
            <form onSubmit={SalvarProcedimento}>
              <label className={styles.label}>Nome</label>
              <input
                type="text"
                className={styles.input}
                placeholder="Digite o nome do procedimento"
                name="nome"
                maxLength="100"
                value={procedimento.nome}
                onChange={AtualizarProcedimento}
                required
              />

              <label className={styles.label}>Descrição</label>
              <input
                type="text"
                className={styles.input}
                placeholder="Digite a descrição do procedimento"
                name="descricao"
                maxLength="255"
                value={procedimento.descricao}
                onChange={AtualizarProcedimento}
                required
              />

              <label className={styles.label}>Valor</label>
              <input
                type="number"
                className={styles.input}
                placeholder="Digite o valor do procedimento"
                name="valor"
                value={procedimento.valor}
                onChange={AtualizarProcedimento}
                required
              />

              <label className={styles.label}>Especialidade</label>
              <select
                name="especialidadeId"
                className={styles.input}
                value={procedimento.especialidadeId}
                onChange={AtualizarProcedimento}
                required
              >
                {MostrarOpcoesEspecialidades()}
              </select>

              <button type="submit" className={styles.botao_salvar}>
                Salvar
              </button>
            </form>
          </div>
        </ModalGlobal>
      )}
    </div>
  );
}

export default ModalAdicionarProcedimento;
