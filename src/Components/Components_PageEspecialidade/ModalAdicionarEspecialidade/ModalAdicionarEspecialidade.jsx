import { React, useState, useEffect } from "react";
import ModalGlobal from "../../ModalGlobal/ModalGlobal"; // Presumindo que você tenha um componente ModalGlobal
import EspecialidadeApi from "../../../Services/MinhaApi/Especialidade";
import styles from "./ModalAdicionarEspecialidade.module.css"; // Importando o arquivo CSS
import BotaoNovo from "../../BotaoNovo/BotaoNovo"; // Importando o componente BotaoNovo

function ModalAdicionarEspecialidade() {
  const [especialidadeNome, setEspecialidadeNome] = useState("");
  const [aberto, setAberto] = useState(false);

  const AtualizarEspecialidade = (event) => {
    setEspecialidadeNome(event.target.value);
  };

  async function SalvarEspecialidade(event) {
    event.preventDefault();

    const usuarioId = localStorage.getItem("usuarioId");

    try {
      await EspecialidadeApi.criarEspecialidadeAsync(
        usuarioId,
        especialidadeNome
      );
      alert("Especialidade cadastrada com sucesso!");
      window.location.reload(); // Força o recarregamento da página
    } catch (error) {
      console.error(error);
      alert("Ocorreu um erro ao cadastrar a especialidade. Tente novamente.");
    }

    setEspecialidadeNome("");
    setAberto(false); // Fechar o modal após salvar
  }

  //Verificar com useEffect se o aberto é falso ou seja esta fechado para excluir valore dos imputs
  useEffect(() => {
    if (!aberto) {
      setEspecialidadeNome("");
    }
  }, [aberto]); // O array vazio [] indica que o useEffect deve ser executado apenas uma vez, quando a aberto é mudada

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
          <div className={styles.container_formulario}>
            <form onSubmit={SalvarEspecialidade}>
              <label className={styles.label}>Nome</label>
              <input
                type="text"
                className={styles.input}
                placeholder="Nome da especialidade"
                value={especialidadeNome}
                onChange={AtualizarEspecialidade}
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
