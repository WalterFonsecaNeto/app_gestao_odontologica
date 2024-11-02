// LoginForm.js
import React from "react";
import "../../../Pages/PageAutenticacao/PageAutenticacao.css";

function LoginForm({ onSwitch },{setIsAuth}) {
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
        <form className="form">
          <label className="label-input">
            <input type="email" placeholder="Email" />
          </label>
          <label className="label-input">
            <input type="password" placeholder="Senha" />
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
