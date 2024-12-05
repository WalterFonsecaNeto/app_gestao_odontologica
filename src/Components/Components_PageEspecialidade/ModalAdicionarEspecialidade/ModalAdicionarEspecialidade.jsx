import style from "./ModalAdicionarEspecialidade.module.css"; // Importando o arquivo CSS
import { useState } from "react";
import EspecialidadeApi from "../../../Services/MinhaApi/Especialidade";

function ModalAdicionarEspecialidade({ fecharModal }) { // Recebendo a função fecharModal como props
  const [especialidadeNome, setEspecialidadeNome] = useState("");

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
      fecharModal(); // Fecha o modal após o cadastro
      window.location.reload(); // Força o recarregamento da página
    } catch (error) {
      console.error(error);
      alert("Ocorreu um erro ao cadastrar a especialidade. Tente novamente.");
    }

    setEspecialidadeNome("");
  }

  return (
    <div className={style.modalOverlay}> {/* Camada de fundo do modal */}
      <div className={style.modalContent}> {/* Conteúdo do modal */}
        <div className={style.modalTituloSair}> {/* Título e botão de fechar */}
          <button className={style.closeButton} onClick={fecharModal}> {/* Função de fechar modal */}
            ✖
          </button>
          <h2>Cadastro de Especialidade</h2>
        </div>
        <form onSubmit={SalvarEspecialidade}>
          <label>Nome:</label>
          <input
            type="text"
            placeholder="Digite o nome da especialidade"
            name="nome"
            maxLength="100"
            value={especialidadeNome}
            onChange={AtualizarEspecialidade}
            required
          />
          <button type="submit">Salvar</button>
        </form>
      </div>
    </div>
  );
}

export default ModalAdicionarEspecialidade;
