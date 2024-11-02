import style from "./PacientesForm.module.css";
import { useState } from "react";
import InputMask from "react-input-mask";

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

  const AtualizarPaciente = (event) => {
    const { name, value } = event.target;
    setPaciente({ ...paciente, [name]: value });
  };

  function SalvarPaciente(event) {
    event.preventDefault();

    // Resetar o formulário após salvar
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

    //! Chamar método na API para salvar no banco de dados aqui.
    console.log(paciente);
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
