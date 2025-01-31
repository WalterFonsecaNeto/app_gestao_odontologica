import { useState, useEffect } from "react";
import InputMask from "react-input-mask";
import ModalGlobal from "../../ModalGlobal/ModalGlobal";
import PacienteApi from "../../../Services/MinhaApi/Paciente";
import Alerta from "../../Alerta/Alerta";
import style from "./ModalEditarPaciente.module.css";
import { MdEdit } from "react-icons/md";

function ModalEditarPaciente({ pacienteSelecionado, setPacienteSelecionado }) {
  const [paciente, setPaciente] = useState({ ...pacienteSelecionado });
  const [aberto, setAberto] = useState(false);
  const [mostrarAlerta, setMostrarAlerta] = useState(false);
  const [mensagemAlerta, setMensagemAlerta] = useState("");
  const [tipoAlerta, setTipoAlerta] = useState("");
  const [desabilitarBotoes, setDesabilitarBotoes] = useState(false);
  const [desabilitarBotaoSalvar, setDesabilitarBotaoSalvar] = useState(true);

  function ExibirAlerta(mensagem, tipo) {
    setMensagemAlerta(mensagem);
    setTipoAlerta(tipo);
    setMostrarAlerta(true);

    setTimeout(() => {
      setMostrarAlerta(false);
      setAberto(false);
      setDesabilitarBotoes(false);
    }, 5000);
  }

  useEffect(() => {
    if (!aberto) {
      setPaciente({ ...pacienteSelecionado });
    }
  }, [aberto, pacienteSelecionado]);

  useEffect(() => {
    setDesabilitarBotaoSalvar(
      JSON.stringify(paciente) === JSON.stringify(pacienteSelecionado)
    );
  }, [paciente, pacienteSelecionado]);

  const AtualizarPaciente = async (event) => {
    event.preventDefault();
    setDesabilitarBotoes(true);
    const usuarioId = localStorage.getItem("usuarioId");

    try {
      await PacienteApi.atualizarPacienteAsync(
        pacienteSelecionado.id,
        usuarioId,
        paciente.nome,
        paciente.dataNascimento,
        paciente.genero,
        paciente.cpf,
        paciente.endereco,
        paciente.telefone,
        paciente.email,
        paciente.historicoMedico
      );

      setPacienteSelecionado(paciente);
      ExibirAlerta("Paciente atualizado com sucesso!", "success");
    } catch (error) {
      const mensagemErro =
        error.response?.data ||
        "Ocorreu um erro ao atualizar o paciente. Tente novamente.";
      ExibirAlerta(mensagemErro, "danger");
    }
  };

  function AtualizaPacientesComValores(event) {
    const { name, value } = event.target;
    setPaciente({ ...paciente, [name]: value });
  }

  return (
    <div>
      <button className={style.botao_editar} onClick={() => setAberto(true)}>
        <MdEdit />
        Editar
      </button>

      {aberto && (
        <div
          className={`${style.container_total_modal} ${
            desabilitarBotoes ? style.container_total_modal_desabilitado : ""
          }`}
        >
          <ModalGlobal aberto={aberto} setAberto={setAberto} titulo="Editar Paciente">
            <div
              className={`${style.container_formulario} ${
                desabilitarBotoes ? style.container_formulario_desabilitado : ""
              }`}
            >
              <form onSubmit={AtualizarPaciente}>
                <div className={style.container_linha}>
                  <div className={style.container_info_nome}>
                    <label className={style.label}>Nome:</label>
                    <input
                      type="text"
                      className={style.input}
                      placeholder="Nome do paciente"
                      name="nome"
                      maxLength="100"
                      value={paciente.nome}
                      onChange={AtualizaPacientesComValores}
                      required
                    />
                  </div>

                  <div className={style.container_info_data}>
                    <label className={style.label}>Data de Nascimento:</label>
                    <input
                      type="date"
                      className={style.input}
                      name="dataNascimento"
                      value={paciente.dataNascimento?.split("T")[0] || ""}
                      onChange={AtualizaPacientesComValores}
                      required
                    />
                  </div>
                </div>

                <div className={style.container_linha}>
                  <div className={style.container_info}>
                    <label className={style.label}>CPF:</label>
                    <InputMask
                      mask="999.999.999-99"
                      placeholder="CPF do paciente"
                      name="cpf"
                      value={paciente.cpf}
                      onChange={AtualizaPacientesComValores}
                      required
                    >
                      {(inputProps) => <input {...inputProps} className={style.input} />}
                    </InputMask>
                  </div>

                  <div className={style.container_info}>
                    <label className={style.label}>Telefone:</label>
                    <InputMask
                      mask="(99) 99999-9999"
                      placeholder="Telefone do paciente"
                      name="telefone"
                      value={paciente.telefone}
                      onChange={AtualizaPacientesComValores}
                    >
                      {(inputProps) => <input {...inputProps} className={style.input} />}
                    </InputMask>
                  </div>

                  <div className={style.container_info_genero}>
                    <label className={style.label}>Gênero:</label>
                    <select
                      name="genero"
                      className={style.input}
                      value={paciente.genero}
                      onChange={AtualizaPacientesComValores}
                      required
                    >
                      <option value="">Selecione o gênero</option>
                      <option value="Masculino">Masculino</option>
                      <option value="Feminino">Feminino</option>
                      <option value="Outro">Outro</option>
                    </select>
                  </div>
                </div>

                <label className={style.label}>E-mail:</label>
                <input
                  type="email"
                  className={style.input}
                  placeholder="E-mail do paciente"
                  name="email"
                  value={paciente.email}
                  onChange={AtualizaPacientesComValores}
                />

                <label className={style.label}>Endereço:</label>
                <input
                  type="text"
                  className={style.input}
                  placeholder="Digite o endereço do paciente"
                  name="endereco"
                  value={paciente.endereco}
                  onChange={AtualizaPacientesComValores}
                  required
                />

                <label className={style.label}>Histórico Médico:</label>
                <textarea
                  className={style.textarea}
                  placeholder="Digite o histórico médico do paciente"
                  name="historicoMedico"
                  value={paciente.historicoMedico}
                  onChange={AtualizaPacientesComValores}
                  rows={5}
                ></textarea>

                <button
                  type="submit"
                  className={style.botao_salvar}
                  disabled={desabilitarBotaoSalvar}
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

export default ModalEditarPaciente;
