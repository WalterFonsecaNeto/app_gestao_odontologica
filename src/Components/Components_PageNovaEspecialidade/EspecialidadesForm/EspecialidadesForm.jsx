import style from "./EspecialidadesForm.module.css";
import { useState } from "react";
import { Navigate } from "react-router-dom";
import EspecialidadeApi from "../../../Services/MinhaApi/Especialidade";

function EspecialidadesForm() {
  const [especialidadeNome, setEspecialidadeNome] = useState("");

  const [redirect, setRedirect] = useState(false); // Estado para redirecionamento

  const AtualizarEspecialidade = (event) => {
    setEspecialidadeNome(event.target.value);
  };

  async function SalvarEspecialidade(event) {
    event.preventDefault();

    const usuarioId = localStorage.getItem("usuarioId");

    try {
      await EspecialidadeApi.criarEspecialidadeAsync(usuarioId, especialidadeNome);
      alert("Especialidade cadastrada com sucesso!");
     setRedirect(true); // Define o redirecionamento para verdadeiro
    } catch (error) {
      console.error(error);
      alert("Ocorreu um erro ao cadastrar a especialidade. Tente novamente.");
    }

    setEspecialidadeNome(""); 
  }

  if (redirect) {
    return <Navigate to="/especialidades" />; // Redireciona quando redirect for true
  }

  return (
    <div className={style.container_form}>
      <form onSubmit={SalvarEspecialidade}>
        <h2>Cadastro de Especialidade</h2>

        <label>Nome:</label>
        <input
          type="text"
          placeholder="Digite o nome da especialidade"
          name="nome"
          maxLength="100"
          value={especialidadeNome}
          onChange={AtualizarEspecialidade}
          required
        />

        <button type="submit">Salvar</button>
      </form>
    </div>
  );
}

export default EspecialidadesForm;
