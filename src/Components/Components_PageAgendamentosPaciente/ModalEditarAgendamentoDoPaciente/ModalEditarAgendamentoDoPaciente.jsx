import { useState, useEffect } from "react";
import ModalGlobal from "../../ModalGlobal/ModalGlobal";
import AgendamentoApi from "../../../Services/MinhaApi/Agendamento";
import Alerta from "../../Alerta/Alerta";
import styles from "./ModalEditarAgendamentoDoPaciente.module.css";
import { MdEdit } from "react-icons/md";

function ModalEditarAgendamentoDoPaciente({ agendamentoSelecionado, setAgendamentos, agendamentos}) {
  const [agendamento, setAgendamento] = useState({
    ...agendamentoSelecionado,
    hora: agendamentoSelecionado.dataHora.slice(11, 16),
  });

  const [aberto, setAberto] = useState(false);
  const [mostrarAlerta, setMostrarAlerta] = useState(false);
  const [mensagemAlerta, setMensagemAlerta] = useState("");
  const [tipoAlerta, setTipoAlerta] = useState("");

  const [desabilitarBotoes, setDesabilitarBotoes] = useState(false); // Desabilita botões gerais ao salvar
  const [desabilitarBotaoSalvar, setDesabilitarBotaoSalvar] = useState(true); // Desabilita apenas o botão "Salvar" até que algo seja editado

  useEffect(() => {
    if (aberto) {
      setAgendamento({
        ...agendamentoSelecionado,
        hora: agendamentoSelecionado.dataHora.slice(11, 16),
      });
      setDesabilitarBotaoSalvar(true);
    }
  }, [aberto, agendamentoSelecionado]);

  function ExibirAlerta(mensagem, tipo) {
    setMensagemAlerta(mensagem);
    setTipoAlerta(tipo);
    setMostrarAlerta(true);

    setTimeout(() => {
      setMostrarAlerta(false);
      setAberto(false);
      setDesabilitarBotoes(false);
      setDesabilitarBotaoSalvar(true);
      window.location.reload();
    }, 500);
  }

  const AtualizaAgendamentoComValores = (event) => {
    const { name, value } = event.target;
    setAgendamento((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    const dataParte = agendamento.dataHora.split("T")[0];
    const dataHoraFormatada = `${dataParte}T${agendamento.hora}:00`;

    const houveAlteracao =
      agendamento.pacienteId !== agendamentoSelecionado.pacienteId ||
      dataHoraFormatada !== agendamentoSelecionado.dataHora ||
      agendamento.descricao !== agendamentoSelecionado.descricao ||
      agendamento.status !== agendamentoSelecionado.status;

    setDesabilitarBotaoSalvar(!houveAlteracao);
  }, [agendamento, agendamentoSelecionado]);

  const AtualizarAgendamento = async (event) => {
    event.preventDefault();
    setDesabilitarBotoes(true); // Desabilita todos os botões enquanto salva

    const dataParte = agendamento.dataHora.split("T")[0];
    const dataHoraFormatada = `${dataParte}T${agendamento.hora}:00.000Z`;

    const usuarioId = localStorage.getItem("usuarioId");

    try {
      await AgendamentoApi.atualizarAgendamentoAsync(
        agendamentoSelecionado.id,
        usuarioId,
        agendamento.pacienteId,
        dataHoraFormatada,
        agendamento.status,
        agendamento.descricao
      );
      ExibirAlerta("Agendamento atualizado com sucesso!", "success");
    } catch (error) {
      ExibirAlerta(
        error.response?.data || "Erro ao atualizar agendamento.",
        "danger"
      );
      setDesabilitarBotoes(false); // Reabilita os botões caso dê erro
    }
  };

  return (
    <div>
      <button
        className={styles.botao_modal}
        onClick={() => setAberto(true)}
        disabled={desabilitarBotoes}
      >
        <MdEdit />
      </button>

      {aberto && (
        <div
          className={`${styles.container_total_modal} ${
            desabilitarBotoes ? styles.container_total_modal_desabilitado : ""
          }`}
        >
          <ModalGlobal aberto={aberto} setAberto={setAberto} titulo="Editar Agendamento">
            <div
              className={`${styles.container_formulario} ${
                desabilitarBotoes ? styles.container_formulario_desabilitado : ""
              }`}
            >
              <form onSubmit={AtualizarAgendamento}>
                <div className={styles.container_linha}>
                  <div className={styles.container_info_data}>
                    <label className={styles.label}>Data:</label>
                    <input
                      type="date"
                      className={styles.input}
                      name="dataHora"
                      value={agendamento.dataHora?.split("T")[0] || ""}
                      onChange={AtualizaAgendamentoComValores}
                      required
                      disabled={desabilitarBotoes}
                    />
                  </div>
                </div>

                <div className={styles.container_linha}>
                  <div className={styles.container_info_hora}>
                    <label className={styles.label}>Hora:</label>
                    <input
                      type="time"
                      className={styles.input}
                      name="hora"
                      value={agendamento.hora}
                      onChange={AtualizaAgendamentoComValores}
                      required
                      disabled={desabilitarBotoes}
                    />
                  </div>

                  <div className={styles.container_info_procedimento}>
                    <label className={styles.label}>Descrição:</label>
                    <input
                      type="text"
                      className={styles.input}
                      name="descricao"
                      value={agendamento.descricao}
                      onChange={AtualizaAgendamentoComValores}
                      required
                      disabled={desabilitarBotoes}
                    />
                  </div>
                </div>

                <div className={styles.container_linha}>
                  <div className={styles.container_info_status}>
                    <label className={styles.label}>Status:</label>
                    <select
                      className={styles.input}
                      name="status"
                      value={agendamento.status}
                      onChange={AtualizaAgendamentoComValores}
                      required
                      disabled={desabilitarBotoes}
                    >
                      <option value="Pendente">Pendente</option>
                      <option value="Cancelado">Cancelado</option>
                      <option value="Confirmado">Confirmado</option>
                    </select>
                  </div>
                </div>

                <button
                  type="submit"
                  className={styles.botao_salvar}
                  disabled={desabilitarBotaoSalvar || desabilitarBotoes} // Desabilita quando não há mudanças ou durante o envio
                >
                  Salvar
                </button>
              </form>
            </div>
          </ModalGlobal>
        </div>
      )}
      <Alerta
        tipo={tipoAlerta}
        mensagem={mensagemAlerta}
        visivel={mostrarAlerta}
        aoFechar={() => setMostrarAlerta(false)}
      />
    </div>
  );
}

export default ModalEditarAgendamentoDoPaciente;
