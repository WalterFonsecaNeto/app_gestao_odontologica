import { useState, useEffect } from "react";
import ModalGlobal from "../../ModalGlobal/ModalGlobal"; // Importando o ModalGlobal
import FormaPagamentoApi from "../../../Services/MinhaApi/FormaPagemnto";
import BotaoNovo from "../../BotaoNovo/BotaoNovo"; // Importando o BotaoNovo
import style from "./ModalAdicionarFormaPagamento.module.css"; // Importando o arquivo CSS

function ModalAdicionarFormaPagamento() {
  const [formaPagamentoNome, setFormaPagamentoNome] = useState("");
  const [aberto, setAberto] = useState(false);

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
      window.location.reload(); // Força o recarregamento da página
    } catch (error) {
      console.error(error);
      alert(
        "Ocorreu um erro ao cadastrar a forma de pagamento. Tente novamente."
      );
    }

    setFormaPagamentoNome("");
    setAberto(false); // Fechar o modal após salvar
  }

  //Verificar com useEffect se o aberto é falso ou seja esta fechado para excluir valore dos imputs
  useEffect(() => {
    if (!aberto) {
      setFormaPagamentoNome("");
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
          titulo="Cadastro de Forma de Pagamento"
        >
          <div className={style.container_formulario}>
            <form onSubmit={SalvarFormaPagamento}>
              <label className={style.label}>Nome</label>
              <input
                type="text"
                className={style.input}
                placeholder="Digite o nome da forma de pagamento"
                value={formaPagamentoNome}
                onChange={AtualizarFormaPagamento}
                required
              />

              <button type="submit" className={style.botao_salvar}>
                Salvar
              </button>
            </form>
          </div>
        </ModalGlobal>
      )}
    </div>
  );
}

export default ModalAdicionarFormaPagamento;
