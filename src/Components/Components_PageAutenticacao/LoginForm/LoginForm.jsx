// LoginForm.js
import React from "react";
import "../../../Pages/PageAutenticacao/PageAutenticacao.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function LoginForm({ onSwitch }) {
  const [usuarioLogin, setUsuarioLogin] = useState({
    emailLogin: "",
    senhaLogin: "",
  });
  const navigate = useNavigate(); // Inicializa o hook useNavigate

  //? função que atualiza os dados do usuário ao digitar no campo de login
  function AtualizarUsuarioLogin(event) {
    const id = event.target.id;
    const value = event.target.value;
    setUsuarioLogin({ ...usuarioLogin, [id]: value });
  }

  //! função que verifica se o usuário existe e senha está correta usar ( API do backend )
  function VerificarUsuario(event) {
    event.preventDefault();

    // Lógica de verificação do usuário (substitua com a lógica real)
    const loginBemSucedido = true; // Exemplo, substituir pela verificação correta

    if (loginBemSucedido) {
      localStorage.setItem("usuarioId", "1"); // Define como autenticado
      navigate("/pacientes"); // Redireciona para a página de pacientes
    } else {
      localStorage.setItem("usuarioId", "");
      alert("Usuário ou senha inválidos!"); // Exibe um alerta caso os dados estejam errados
    }

    // Reseta o formulário
    setUsuarioLogin({
      emailLogin: "",
      senhaLogin: "",
    });
  }

  return (
    <div className="content second-content">
      <div className="first-column">
        <h2 className="title title-primary">Olá, seja bem vindo!</h2>
        <p className="description description-primary">
          Insira seus dados pessoais e comece a jornada conosco
        </p>
        <button id="signup" className="btn btn-primary" onClick={onSwitch}>
          Cadastre-se
        </button>
      </div>

      <div className="second-column">
        <h2 className="title title-second">Faça Login</h2>

        <form className="form" onSubmit={VerificarUsuario}>
          <label className="label-input">
            <input
              type="email"
              placeholder="Email"
              id="emailLogin"
              value={usuarioLogin.emailLogin}
              onChange={AtualizarUsuarioLogin}
            />
          </label>
          <label className="label-input">
            <input
              type="password"
              placeholder="Senha"
              id="senhaLogin"
              value={usuarioLogin.senhaLogin}
              onChange={AtualizarUsuarioLogin}
            />
          </label>
          <a className="password" href="#">
            esqueceu sua senha?
          </a>
          <button type="submit" className="btn btn-second">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default LoginForm;
