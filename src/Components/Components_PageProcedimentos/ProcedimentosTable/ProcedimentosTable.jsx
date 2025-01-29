import { useState, useEffect } from "react";
import { MdEdit, MdDelete } from "react-icons/md";
import ProcedimentoApi from "../../../Services/MinhaApi/Procedimento";
import style from "./ProcedimentosTable.module.css";
import Alerta from "../../Alerta/Alerta";
import ModalExcluirProcedimento from "../ModalExcluirProcedimento/ModalExcluirProcedimento";

function ProcedimentosTable({ filtro, setProcedimentos, procedimentos }) {
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

  async function BuscarProcedimentosApi() {
    const usuarioId = localStorage.getItem("usuarioId");
    try {
      const response = await ProcedimentoApi.listarProcedimentosPorUsuarioAsync(
        usuarioId,
        true
      );
      setProcedimentos(response);
    } catch (error) {
      const mensagemErro =
        error.response?.data ||
        "Ocorreu um erro ao listar os procedimentos. Tente novamente.";
      ExibirAlerta(mensagemErro, "danger");
    }
  }

  useEffect(() => {
    BuscarProcedimentosApi();
  }, []);

  function MostrarProcedimentos() {
    const procedimentosFiltrados = procedimentos?.filter((procedimento) =>
      procedimento.nome.toLowerCase().startsWith(filtro.toLowerCase())
    );

    return procedimentosFiltrados?.map((procedimento) => (
      <>
        <tr key={procedimento.id}>
          <td>{procedimento.nome}</td>
          <td>R$ {Number(procedimento.valor || 0).toFixed(2)}</td>
          <td>
            <div className={style.botao_acao}>
              <button>
                <MdEdit />
              </button>

              <ModalExcluirProcedimento
                procedimentoSelecionado={procedimento}
                procedimentos={procedimentos}
                setProcedimentos={setProcedimentos}
              />
            </div>
          </td>
        </tr>

        {/* Exibição do Alerta */}
        <Alerta
          tipo={tipoAlerta}
          mensagem={mensagemAlerta}
          visivel={mostrarAlerta}
          aoFechar={() => setMostrarAlerta(false)}
        />
      </>
    ));
  }

  return (
    <div className={style.container_total}>
      <h2 className={style.titulo}>Lista de Procedimentos</h2>

      <div className={style.container_table}>
        <table>
          <thead>
            <tr>
              <th>Nome</th>
              <th>Valor</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>{MostrarProcedimentos()}</tbody>
        </table>
      </div>
    </div>
  );
}

export default ProcedimentosTable;
