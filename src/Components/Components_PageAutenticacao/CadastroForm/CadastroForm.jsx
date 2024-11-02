// CadastroForm.js
import React from "react";
import "../../../Pages/PageAutenticacao/PageAutenticacao.css";

function CadastroForm({ onSwitch },{setIsAuth}) {

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
        <form className="form">
          <label className="label-input">
            <input type="text" placeholder="Nome" />
          </label>
          <label className="label-input">
            <input type="email" placeholder="Email" />
          </label>
          <label className="label-input">
            <input type="password" placeholder="Senha" />
          </label>
          <button type="submit" className="btn btn-second"  >
            Cadastrar
          </button>
        </form>
      </div>
    </div>
  );
}

export default CadastroForm;
