import { useState, useEffect } from "react";
import ModalGlobal from "../../ModalGlobal/ModalGlobal";
import BotaoNovo from "../../BotaoNovo/BotaoNovo";
import ProcedimentoApi from "../../../Services/MinhaApi/Procedimento";
import EspecialidadeApi from "../../../Services/MinhaApi/Especialidade";
import style from "./ModalAdicionarProcedimento.module.css";
import Alerta from "../../Alerta/Alerta";

function ModalAdicionarProcedimento({ procedimentos, setProcedimentos }) {
  const [procedimento, setProcedimento] = useState({
    id: "",
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
  const [desabilitarBotao, setDesabilitarBotao] = useState(false);

  // Função para exibir o alerta
  function ExibirAlerta(mensagem, tipo) {
    setMensagemAlerta(mensagem);
    setTipoAlerta(tipo);
    setMostrarAlerta(true);

    setTimeout(() => {
      setMostrarAlerta(false);
      setDesabilitarBotao(false);
      setAberto(false);
    }, 500); // Alerta desaparece após 5 segundos
  }

  async function SalvarProcedimento(event) {
    event.preventDefault();

    const usuarioId = localStorage.getItem("usuarioId");
    setDesabilitarBotao(true);

    try {
      const procedimentoId = await ProcedimentoApi.criarProcedimentoAsync(
        usuarioId,
        procedimento.nome,
        procedimento.descricao,
        procedimento.valor,
        procedimento.especialidadeId
      );
      procedimento.id = procedimentoId;

      ExibirAlerta("Procedimento cadastrado com sucesso!", "success");

      setProcedimentos([...procedimentos, procedimento]);

    } catch (error) {
      const mensagemErro =
        error.response?.data ||
        "Ocorreu um erro ao cadastrar o procedimento. Tente novamente.";
      ExibirAlerta(mensagemErro, "danger");
    }
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
        <>
          <div
            className={`${style.container_total_modal} ${
              desabilitarBotao ? style.container_total_modal_desabilitado : ""
            }`}
          >
            <ModalGlobal
              aberto={aberto}
              setAberto={setAberto}
              titulo="Cadastro de Procedimento"
            >
              <div className={style.container_formulario}>
                <form onSubmit={SalvarProcedimento}>
                  <label className={style.label}>Nome</label>
                  <input
                    type="text"
                    className={style.input}
                    placeholder="Digite o nome do procedimento"
                    name="nome"
                    maxLength="100"
                    value={procedimento.nome}
                    onChange={AtualizarProcedimentoComValores}
                  />

                  <label className={style.label}>Descrição</label>
                  <input
                    type="text"
                    className={style.input}
                    placeholder="Digite a descrição do procedimento"
                    name="descricao"
                    maxLength="255"
                    value={procedimento.descricao}
                    onChange={AtualizarProcedimentoComValores}
                  />

                  <label className={style.label}>Valor</label>
                  <input
                    type="number"
                    className={style.input}
                    placeholder="Digite o valor do procedimento"
                    name="valor"
                    value={procedimento.valor}
                    onChange={AtualizarProcedimentoComValores}
                    required
                  />

                  <label className={style.label}>Especialidade</label>
                  <select
                    name="especialidadeId"
                    className={style.input}
                    value={procedimento.especialidadeId}
                    onChange={AtualizarProcedimentoComValores}
                    required
                  >
                    {MostrarOpcoesEspecialidades()}
                  </select>

                  <button type="submit" className={style.botao_salvar}>
                    Salvar
                  </button>
                </form>
              </div>
            </ModalGlobal>
          </div>

          <Alerta
            tipo={tipoAlerta}
            mensagem={mensagemAlerta}
            visivel={mostrarAlerta}
            aoFechar={() => setMostrarAlerta(false)}
          />
        </>
      )}
    </div>
  );
}

export default ModalAdicionarProcedimento;
