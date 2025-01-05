import style from "./ModalAdicionarFormaPagamento.module.css"; // Importando o arquivo CSS
import { useState } from "react";
import FormaPagamentoApi from "../../../Services/MinhaApi/FormaPagemnto";

function ModalAdicionarFromaPagamento({ fecharModal }) { // Recebendo a função fecharModal como props
  const [formaPagamentoNome, setFormaPagamentoNome] = useState("");

  const AtualizarFormaPagamento = (event) => {
    setFormaPagamentoNome(event.target.value);
  };

  async function SalvarFormaPagamento(event) {
    event.preventDefault();

    const usuarioId = localStorage.getItem("usuarioId");

    try {
      await FormaPagamentoApi.criarFormaPagamentoAsync(
        usuarioId,
        formaPagamentoNome
      );
      alert("Forma de pagamento cadastrada com sucesso!");
      fecharModal(); // Fecha o modal após o cadastro
      window.location.reload(); // Força o recarregamento da página
    } catch (error) {
      console.error(error);
      alert("Ocorreu um erro ao cadastrar a forma de pagamento. Tente novamente.");
    }

    setFormaPagamentoNome("");
  }

  return (
    <div className={style.modalOverlay}> {/* Camada de fundo do modal */}
      <div className={style.modalContent}> {/* Conteúdo do modal */}
        <div className={style.modalTituloSair}> {/* Título e botão de fechar */}
          <button className={style.closeButton} onClick={fecharModal}> {/* Função de fechar modal */}
            ✖
          </button>
          <h2>Cadastro de Forma de Pagamento</h2>
        </div>
        <form onSubmit={SalvarFormaPagamento}>
          <label>Nome:</label>
          <input
            type="text"
            placeholder="Digite o nome da forma de pagamento"
            name="nome"
            maxLength="100"
            value={formaPagamentoNome}
            onChange={AtualizarFormaPagamento}
            required
          />
          <button type="submit">Salvar</button>
        </form>
      </div>
    </div>
  );
}

export default ModalAdicionarFromaPagamento;
