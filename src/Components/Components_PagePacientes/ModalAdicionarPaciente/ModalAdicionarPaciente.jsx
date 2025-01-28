import { useState, useEffect } from "react";
import InputMask from "react-input-mask";
import ModalGlobal from "../../ModalGlobal/ModalGlobal"; // Importando o ModalGlobal
import BotaoNovo from "../../BotaoNovo/BotaoNovo"; // Importando o BotaoNovo
import PacienteApi from "../../../Services/MinhaApi/Paciente";
import Alerta from "../../Alerta/Alerta"; // Importando o componente de alerta
import styles from "./ModalAdicionarPaciente.module.css"; // Importando o arquivo CSS

function ModalAdicionarPaciente({setPacientes, pacientes}) {

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

  // Função para exibir o alerta
  function ExibirAlerta (mensagem, tipo){
    setMensagemAlerta(mensagem);
    setTipoAlerta(tipo);
    setMostrarAlerta(true);

    setTimeout(() => {
      setMostrarAlerta(false);
    }, 5000); // Alerta desaparece após 5 segundos
  };

  async function SalvarPaciente(event) {
    event.preventDefault();

    const usuarioId = localStorage.getItem("usuarioId");

    try {
      await PacienteApi.criarPacienteAsync(
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

      ExibirAlerta("Paciente cadastrado com sucesso!", "success");

      //atualizar o array de pacientes com esse paciente cadstrado para evitar muitas buscas no banco
      setPacientes([...pacientes, paciente]);

    } catch (error) {
      const mensagemErro =
        error.response?.data ||
        "Ocorreu um erro ao cadastrar o paciente. Tente novamente.";
      ExibirAlerta(mensagemErro, "danger");
    }

    setPaciente({
      nome: "",
      cpf: "",
      endereco: "",
      telefone: "",
      dataNascimento: "",
      genero: "",
      email: "",
      historicoMedico: "",
    });

    //fecha o modal apos 5 segundos para dar tempo de ver o alert
    setTimeout(() => {
      setAberto(false);
    }, 5000);
  }

  //Função para atualizar a variavel do paciente com os valore digitados no inputs
  const AtualizaPacientesComValores = (event) => {
    const { name, value } = event.target;
    setPaciente({ ...paciente, [name]: value });
  };

  // Verificar com useEffect se o modal está fechado para limpar os valores dos campos
  useEffect(() => {
    if (!aberto) {
      setPaciente({
        nome: "",
        cpf: "",
        endereco: "",
        telefone: "",
        dataNascimento: "",
        genero: "",
        email: "",
        historicoMedico: "",
      });
    }
  }, [aberto]);

  return (
    <div>
      {/* Botão Novo */}
      <BotaoNovo AbrirModal={() => setAberto(true)} />

      {aberto && (
        <ModalGlobal
          aberto={aberto}
          setAberto={setAberto}
          titulo="Cadastro de Paciente"
        >
          {/* Exibição do Alerta */}
          <Alerta
            tipo={tipoAlerta}
            mensagem={mensagemAlerta}
            visivel={mostrarAlerta}
            aoFechar={() => setMostrarAlerta(false)}
          />

          <div className={styles.container_formulario}>
            <form onSubmit={SalvarPaciente}>
              <div className={styles.container_linha}>
                <div className={styles.container_info_nome}>
                  <label className={styles.label}>Nome:</label>
                  <input
                    type="text"
                    className={styles.input}
                    placeholder="Nome do paciente"
                    name="nome"
                    maxLength="100"
                    value={paciente.nome}
                    onChange={AtualizaPacientesComValores}
                    required
                  />
                </div>

                <div className={styles.container_info_data}>
                  <label className={styles.label}>Data de Nascimento:</label>
                  <input
                    type="date"
                    className={styles.input}
                    name="dataNascimento"
                    value={paciente.dataNascimento}
                    onChange={AtualizaPacientesComValores}
                    required
                  />
                </div>
              </div>

              <div className={styles.container_linha}>
                <div className={styles.container_info}>
                  <label className={styles.label}>CPF:</label>
                  <InputMask
                    mask="999.999.999-99"
                    placeholder="CPF do paciente"
                    name="cpf"
                    value={paciente.cpf}
                    onChange={AtualizaPacientesComValores}
                    required
                  >
                    {(inputProps) => (
                      <input
                        {...inputProps}
                        type="text"
                        className={styles.input}
                      />
                    )}
                  </InputMask>
                </div>

                <div className={styles.container_info}>
                  <label className={styles.label}>Telefone:</label>
                  <InputMask
                    mask="(99) 99999-9999"
                    placeholder="Telefone do paciente"
                    name="telefone"
                    value={paciente.telefone}
                    onChange={AtualizaPacientesComValores}
                  >
                    {(inputProps) => (
                      <input
                        {...inputProps}
                        type="text"
                        className={styles.input}
                      />
                    )}
                  </InputMask>
                </div>

                <div className={styles.container_info_genero}>
                  <label className={styles.label}>Gênero:</label>
                  <select
                    name="genero"
                    className={styles.input}
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

              <label className={styles.label}>E-mail:</label>
              <input
                type="email"
                className={styles.input}
                placeholder="E-mail do paciente"
                name="email"
                maxLength="255"
                value={paciente.email}
                onChange={AtualizaPacientesComValores}
              />

              <label className={styles.label}>Endereço:</label>
              <input
                type="text"
                className={styles.input}
                placeholder="Digite o endereço do paciente"
                name="endereco"
                maxLength="255"
                value={paciente.endereco}
                onChange={AtualizaPacientesComValores}
                required
              />

              <label className={styles.label}>Histórico Médico:</label>
              <textarea
                className={styles.textarea}
                placeholder="Digite o histórico médico do paciente"
                name="historicoMedico"
                value={paciente.historicoMedico}
                onChange={AtualizaPacientesComValores}
              ></textarea>

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

export default ModalAdicionarPaciente;
