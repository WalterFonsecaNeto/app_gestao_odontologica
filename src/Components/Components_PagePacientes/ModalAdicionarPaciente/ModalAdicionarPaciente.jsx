import { useState } from "react";
import InputMask from "react-input-mask";
import ModalGlobal from "../../ModalGlobal/ModalGlobal"; // Importando o ModalGlobal
import BotaoNovo from "../../BotaoNovo/BotaoNovo"; // Importando o BotaoNovo
import PacienteApi from "../../../Services/MinhaApi/Paciente";
import styles from "./ModalAdicionarPaciente.module.css"; // Importando o arquivo CSS

function ModalAdicionarPaciente() {
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
      alert("Paciente cadastrado com sucesso!");
      window.location.reload(); // Força o recarregamento da página
    } catch (error) {
      console.error(error);
      alert("Ocorreu um erro ao cadastrar o paciente. Tente novamente.");
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
    setAberto(false); // Fecha o modal após salvar
  }

  const AtualizarPaciente = (event) => {
    const { name, value } = event.target;
    setPaciente({ ...paciente, [name]: value });
  };

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
                    onChange={AtualizarPaciente}
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
                    onChange={AtualizarPaciente}
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
                    onChange={AtualizarPaciente}
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
                    onChange={AtualizarPaciente}
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
                    onChange={AtualizarPaciente}
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
                onChange={AtualizarPaciente}
              />

              <label className={styles.label}>Endereço:</label>
              <input
                type="text"
                className={styles.input}
                placeholder="Digite o endereço do paciente"
                name="endereco"
                maxLength="255"
                value={paciente.endereco}
                onChange={AtualizarPaciente}
                required
              />

              <label className={styles.label}>Histórico Médico:</label>
              <textarea
                className={styles.textarea}
                placeholder="Digite o histórico médico do paciente"
                name="historicoMedico"
                value={paciente.historicoMedico}
                onChange={AtualizarPaciente}
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
