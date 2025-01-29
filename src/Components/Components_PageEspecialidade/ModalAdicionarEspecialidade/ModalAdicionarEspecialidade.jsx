import { React, useState, useEffect } from "react";
import ModalGlobal from "../../ModalGlobal/ModalGlobal";
import EspecialidadeApi from "../../../Services/MinhaApi/Especialidade";
import styles from "./ModalAdicionarEspecialidade.module.css";
import BotaoNovo from "../../BotaoNovo/BotaoNovo";
import Alerta from "../../Alerta/Alerta";

function ModalAdicionarEspecialidade({ especialidades, setEspecialidades }) {
  const [especialidade, setEspecialidade] = useState({
    id: "",
    nome: ""
  });
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

  async function SalvarEspecialidade(event) {
    event.preventDefault();

    const usuarioId = localStorage.getItem("usuarioId");

    try {
      const especialidadeId = await EspecialidadeApi.criarEspecialidadeAsync(
        usuarioId,
        especialidade.nome
      );
      ExibirAlerta("Especialidade cadastrada com sucesso!", "success");

      //especialidade recebe especialidadeId em id
      especialidade.id = especialidadeId;

      //Atualizar o array de especialidades para evitar muitas buscas no banco
      setEspecialidades([...especialidades, especialidade]);
    } catch (error) {
      const mensagemErro =
        error.response?.data ||
        "Ocorreu um erro ao cadastrar a especialidade. Tente novamente.";
      ExibirAlerta(mensagemErro, "danger");
    }
    // Limpar os valores do formulário após salvar
    setEspecialidade({
      id: "",
      nome: "",
    });

    //fecha o modal apos 5 segundos para dar tempo de ver o alert
    setTimeout(() => {
      setAberto(false);
    }, 5000);
  }

  //Função para atualizar a variavel do paciente com os valore digitados no inputs
  const AtualizarEspecialidadeComValores = (event) => {
    const { name, value } = event.target;
    setEspecialidade({ ...especialidade, [name]: value });
  };

  // Verificar com useEffect se o modal está fechado para limpar os valores dos campos
  useEffect(() => {
    if (!aberto) {
      setEspecialidade({
        nome: "",
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
          titulo="Cadastro de Especialidade"
        >
          {/* Exibição do Alerta */}
          <Alerta
            tipo={tipoAlerta}
            mensagem={String(mensagemAlerta)}
            visivel={mostrarAlerta}
            aoFechar={() => setMostrarAlerta(false)}
          />

          <div className={styles.container_formulario}>
            <form onSubmit={SalvarEspecialidade}>
              <label className={styles.label}>Nome</label>
              <input
                type="text"
                className={styles.input}
                placeholder="Nome da especialidade"
                name="nome" 
                value={especialidade.nome}
                onChange={AtualizarEspecialidadeComValores}
              />

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

export default ModalAdicionarEspecialidade;
