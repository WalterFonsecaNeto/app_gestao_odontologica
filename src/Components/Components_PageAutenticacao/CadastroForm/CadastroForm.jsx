// CadastroForm.js
import React from "react";
import "../../../Pages/PageAutenticacao/PageAutenticacao.css";
import { useEffect, useState } from "react";
import UsuarioApi from "../../../Services/MinhaApi/Usuario";

function CadastroForm({ onSwitch }) {
  useEffect(() => {
    localStorage.clear();
  }, []);

  const [usuarioCadastro, setUsuarioCadastro] = useState({
    nomeCadastro: "",
    emailCadastro: "",
    senhaCadastro: "",
  });

  function AtualizarUsuarioCadastro(event) {
    const id = event.target.id;
    const value = event.target.value;
    setUsuarioCadastro({ ...usuarioCadastro, [id]: value });
  }

  async function CadastrarUsuario(event) {
    event.preventDefault();

    try {
      const response = await UsuarioApi.criarUsuarioAsync(
        usuarioCadastro.nomeCadastro,
        usuarioCadastro.emailCadastro,
        usuarioCadastro.senhaCadastro
      );
      alert("Usuário cadastrado com sucesso!");
      
    } catch (error) {
      console.error(error);
      alert("Ocorreu um erro ao cadastrar o usuário. Tente novamente.");
    }

    setUsuarioCadastro({
      nomeCadastro: "",
      emailCadastro: "",
      senhaCadastro: "",
    });
  }

  return (
    <div className="content first-content">
      <div className="first-column">
        <h2 className="title title-primary">Bem vindo de volta!</h2>
        <p className="description description-primary">
          Para se manter conectado conosco por favor faça login com suas
          informações pessoais
        </p>
        <button id="signin" className="btn btn-primary" onClick={onSwitch}>
          Login
        </button>
      </div>

      <div className="second-column">
        <h2 className="title title-second">Criar Conta</h2>

        <form className="form" onSubmit={CadastrarUsuario}>
          <label className="label-input">
            <input
              type="text"
              placeholder="Nome"
              id="nomeCadastro"
              value={usuarioCadastro.nomeCadastro}
              onChange={AtualizarUsuarioCadastro}
            />
          </label>
          <label className="label-input">
            <input
              type="email"
              placeholder="Email"
              id="emailCadastro"
              value={usuarioCadastro.emailCadastro}
              onChange={AtualizarUsuarioCadastro}
            />
          </label>
          <label className="label-input">
            <input
              type="password"
              placeholder="Senha"
              id="senhaCadastro"
              value={usuarioCadastro.senhaCadastro}
              onChange={AtualizarUsuarioCadastro}
            />
          </label>
          <button type="submit" className="btn btn-second">
            Cadastrar
          </button>
        </form>
      </div>
    </div>
  );
}

export default CadastroForm;
