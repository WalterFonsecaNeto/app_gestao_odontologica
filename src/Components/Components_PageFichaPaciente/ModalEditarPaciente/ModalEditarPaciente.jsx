import { useState, useEffect } from "react";
import InputMask from "react-input-mask";
import ModalGlobal from "../../ModalGlobal/ModalGlobal";
import PacienteApi from "../../../Services/MinhaApi/Paciente";
import Alerta from "../../Alerta/Alerta";
import style from "./ModalEditarPaciente.module.css";
import { MdEdit } from "react-icons/md";

function ModalEditarPaciente({ pacienteSelecionado , setPacienteSelecionado }) {
  const [paciente, setPaciente] = useState({
    nome: "",
    cpf: "",
    endereco: "",
    telefone: "",
    dataNascimento: "",
    genero: "",
    email: "",
    historicoMedico: "",
  });

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
    }, 5000); // Alerta desaparece após 5 segundos
  }

  // Função para carregar os dados do paciente no modal
  useEffect(() => {
    if (pacienteSelecionado) {
      setPaciente(pacienteSelecionado);
    }
  }, [pacienteSelecionado]);

  async function AtualizarPaciente(event) {
    event.preventDefault();

    const usuarioId = localStorage.getItem("usuarioId");
    setDesabilitarBotao(true);

    try {
      console.log(paciente.dataNascimento)
      await PacienteApi.atualizarPacienteAsync(
        paciente.id,
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
      setPacienteSelecionado(paciente)

      ExibirAlerta("Paciente atualizado com sucesso!", "success");

    
      
    } catch (error) {
      const mensagemErro =
        error.response?.data ||
        "Ocorreu um erro ao atualizar o paciente. Tente novamente.";
      ExibirAlerta(mensagemErro, "danger");
    }

    setTimeout(() => {
      setAberto(false);
    }, 5000);
  }

  // Função para atualizar o estado do paciente com os valores dos inputs
  function AtualizaPacientesComValores(event) {
    const { name, value } = event.target;
    setPaciente({ ...paciente, [name]: value });
  }

  return (

    <div>
      <button onClick={() => setAberto(true)}><MdEdit/></button>
      {aberto && (
        <div
          className={`${style.container_total_modal} ${
            desabilitarBotao ? style.container_total_modal_desabilitado : ""
          }`}
        >
          <ModalGlobal aberto={aberto} setAberto={setAberto} titulo="Editar Paciente">
            <div
              className={`${style.container_formulario} ${
                desabilitarBotao ? style.container_formulario_desabilitado : ""
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
                      value={paciente.dataNascimento}
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
                      {(inputProps) => (
                        <input {...inputProps} type="text" className={style.input} />
                      )}
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
                      {(inputProps) => (
                        <input {...inputProps} type="text" className={style.input} />
                      )}
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
                  maxLength="255"
                  value={paciente.email}
                  onChange={AtualizaPacientesComValores}
                />

                <label className={style.label}>Endereço:</label>
                <input
                  type="text"
                  className={style.input}
                  placeholder="Digite o endereço do paciente"
                  name="endereco"
                  maxLength="255"
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
                ></textarea>

                <button type="submit" className={style.botao_salvar}>
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
