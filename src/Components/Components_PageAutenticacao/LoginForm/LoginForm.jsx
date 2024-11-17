// LoginForm.js
import React, { useEffect } from "react";
import "../../../Pages/PageAutenticacao/PageAutenticacao.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import UsuarioApi from "../../../Services/MinhaApi/Usuario";

function LoginForm({ onSwitch }) {

  useEffect(() => {
    localStorage.clear();
  }, []);

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

  async function VerificarUsuario(event) {
    event.preventDefault();
    try {
      const response = await UsuarioApi.validarUsuarioAsync(
        usuarioLogin.emailLogin,
        usuarioLogin.senhaLogin
      );
      console.log(response.id);
      if (response !== null) {
        localStorage.setItem("usuarioId", response.id);
        navigate("/pacientes");
      } else {
        throw new Error("Usuário ou senha inválidos");
      }
    } catch (error) {
      alert("Usuário ou senha inválidos!");
    }

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
