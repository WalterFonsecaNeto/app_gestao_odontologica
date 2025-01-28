import { useState, useEffect } from "react";
import ModalGlobal from "../../ModalGlobal/ModalGlobal"; 
import BotaoNovo from "../../BotaoNovo/BotaoNovo"; 
import ProcedimentoApi from "../../../Services/MinhaApi/Procedimento";
import EspecialidadeApi from "../../../Services/MinhaApi/Especialidade";
import styles from "./ModalAdicionarProcedimento.module.css"; 
import Alerta from "../../Alerta/Alerta";

function ModalAdicionarProcedimento({ procedimentos, setProcedimentos }) {
  const [procedimento, setProcedimento] = useState({
    nome: "",
    descricao: "",
    valor: "",
    especialidadeId: "",
  });
  const [especialidades, setEspecialidades] = useState([]);
  const [aberto, setAberto] = useState(false);
  const [mostrarAlerta, setMostrarAlerta] = useState(false);
  const [mensagemAlerta, setMensagemAlerta] = useState("");
  const [tipoAlerta, setTipoAlerta] = useState("");

  // Função para exibir o alerta
  function ExibirAlerta(mensagem, tipo) {
    setMensagemAlerta(mensagem);
    setTipoAlerta(tipo);
    setMostrarAlerta(true);

    setTimeout(() => {
      setMostrarAlerta(false);
    }, 5000); // Alerta desaparece após 5 segundos
  }

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
      ExibirAlerta("Procedimento cadastrado com sucesso!", "success");

      setProcedimentos([...procedimentos, procedimento]);
    } catch (error) {
      const mensagemErro =
        error.response?.data ||
        "Ocorreu um erro ao cadastrar o procedimento. Tente novamente.";
      ExibirAlerta(mensagemErro, "danger");
    }

    setProcedimento({
      nome: "",
      descricao: "",
      valor: "",
      especialidadeId: "",
    });

    //fecha o modal apos 5 segundos para dar tempo de ver o alert
    setTimeout(() => {
      setAberto(false);
    }, 5000);
  }

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
      const mensagemErro =
        error.response?.data ||
        "Ocorreu um erro ao listar as especialidades. Tente novamente.";
      ExibirAlerta(mensagemErro, "danger");
    }
  }

  function AtualizarProcedimentoComValores(event) {
    const { name, value } = event.target;
    setProcedimento({ ...procedimento, [name]: value });
  }

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

  useEffect(() => {
    ListarEspecialidades();
  }, []);

  // Verificar com useEffect se o modal está fechado para limpar os valores dos campos
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
          <Alerta
            tipo={tipoAlerta}
            mensagem={mensagemAlerta}
            visivel={mostrarAlerta}
            aoFechar={() => setMostrarAlerta(false)}
          />

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
                onChange={AtualizarProcedimentoComValores}
              />

              <label className={styles.label}>Descrição</label>
              <input
                type="text"
                className={styles.input}
                placeholder="Digite a descrição do procedimento"
                name="descricao"
                maxLength="255"
                value={procedimento.descricao}
                onChange={AtualizarProcedimentoComValores}
              />

              <label className={styles.label}>Valor</label>
              <input
                type="number"
                className={styles.input}
                placeholder="Digite o valor do procedimento"
                name="valor"
                value={procedimento.valor}
                onChange={AtualizarProcedimentoComValores}
                required
              />

              <label className={styles.label}>Especialidade</label>
              <select
                name="especialidadeId"
                className={styles.input}
                value={procedimento.especialidadeId}
                onChange={AtualizarProcedimentoComValores}
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
