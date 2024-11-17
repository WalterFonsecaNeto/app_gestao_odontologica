import style from "./PacientesForm.module.css";
import { useState } from "react";
import InputMask from "react-input-mask";
import PacienteApi from "../../../Services/MinhaApi/Paciente";
import { Navigate } from "react-router-dom";

function PacientesForm() {
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

  const [redirect, setRedirect] = useState(false); // Estado para redirecionamento

  const AtualizarPaciente = (event) => {
    const { name, value } = event.target;
    setPaciente({ ...paciente, [name]: value });
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
      alert("paciente cadastrado com sucesso!");
      setRedirect(true); // Define o redirecionamento para verdadeiro
    } catch (error) {
      console.error(error);
      alert("Ocorreu um erro ao cadastrar o usuário. Tente novamente.");
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
  }

  if (redirect) {
    return <Navigate to="/pacientes" />; // Redireciona quando redirect for true
  }

  return (
    <div className={style.container_form}>
      <form onSubmit={SalvarPaciente}>
        <h2>Cadastro de Paciente</h2>

        <label>Nome:</label>
        <input
          type="text"
          placeholder="Digite o nome do paciente"
          name="nome"
          maxLength="100"
          value={paciente.nome}
          onChange={AtualizarPaciente}
          required
        />

        <label>CPF:</label>
        <InputMask
          mask="999.999.999-99"
          placeholder="Digite o CPF do paciente"
          name="cpf"
          value={paciente.cpf}
          onChange={AtualizarPaciente}
          required
        >
          {(inputProps) => <input {...inputProps} type="text" />}
        </InputMask>

        <label>Endereço:</label>
        <input
          type="text"
          placeholder="Digite o endereço do paciente"
          name="endereco"
          maxLength="255"
          value={paciente.endereco}
          onChange={AtualizarPaciente}
          required
        />

        <label>Telefone:</label>
        <InputMask
          mask="(99) 99999-9999"
          placeholder="Digite o telefone do paciente"
          name="telefone"
          value={paciente.telefone}
          onChange={AtualizarPaciente}
        >
          {(inputProps) => <input {...inputProps} type="text" />}
        </InputMask>

        <label>Data de Nascimento:</label>
        <input
          type="date"
          name="dataNascimento"
          value={paciente.dataNascimento}
          onChange={AtualizarPaciente}
          required
        />

        <label>Gênero:</label>
        <select
          name="genero"
          value={paciente.genero}
          onChange={AtualizarPaciente}
          required
        >
          <option value="">Selecione o gênero</option>
          <option value="Masculino">Masculino</option>
          <option value="Feminino">Feminino</option>
          <option value="Outro">Outro</option>
        </select>

        <label>E-mail:</label>
        <input
          type="email"
          placeholder="Digite o e-mail do paciente"
          name="email"
          maxLength="255"
          value={paciente.email}
          onChange={AtualizarPaciente}
        />

        <label>Histórico Médico:</label>
        <textarea
          placeholder="Digite o histórico médico do paciente"
          name="historicoMedico"
          value={paciente.historicoMedico}
          onChange={AtualizarPaciente}
        ></textarea>

        <button type="submit">Salvar</button>
      </form>
    </div>
  );
}

export default PacientesForm;
