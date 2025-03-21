import React, { useEffect, useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import styles from "./LoginForm.module.css";
import { useNavigate } from "react-router-dom";
import UsuarioApi from "../../../Services/MinhaApi/Usuario";
import Alerta from "../../Alerta/Alerta";

function LoginForm({ onSwitch }) {
  useEffect(() => {
    localStorage.clear();
  }, []);

  const [usuarioLogin, setUsuarioLogin] = useState({
    emailLogin: "",
    senhaLogin: "",
  });

  const [mostrarAlerta, setMostrarAlerta] = useState(false);
  const [mensagemAlerta, setMensagemAlerta] = useState("");
  const [tipoAlerta, setTipoAlerta] = useState("");
  const [desabilitarBotao, setDesabilitarBotao] = useState(false);
  const [mostrarSenha, setMostrarSenha] = useState(false);

  const navigate = useNavigate();

  function AtualizarUsuarioLogin(event) {
    const { id, value } = event.target;
    setUsuarioLogin((prev) => ({ ...prev, [id]: value }));
  }

  const exibirAlerta = (mensagem, tipo) => {
    setMensagemAlerta(mensagem);
    setTipoAlerta(tipo);
    setMostrarAlerta(true);

    setTimeout(() => {
      setMostrarAlerta(false);
      setDesabilitarBotao(false);
    }, 5000);
  };

  async function VerificarUsuario(event) {
    event.preventDefault();
    setDesabilitarBotao(true);

    try {
      const response = await UsuarioApi.validarUsuarioAsync(
        usuarioLogin.emailLogin,
        usuarioLogin.senhaLogin
      );

      localStorage.setItem("usuarioId", response.id);

      exibirAlerta("Login realizado com sucesso!", "success");
      setTimeout(() => {
        navigate("/home");
      }, 3000);
    } catch (error) {
      exibirAlerta(`${error.response?.data || "Erro ao fazer login"}`, "danger");
    }

    setUsuarioLogin({
      emailLogin: "",
      senhaLogin: "",
    });
  }

  return (
    <div className="content second-content">
      <div className="first-column">
        <h2 className="title title-primary">Olá, seja bem-vindo!</h2>
        <p className="description description-primary">
          Insira seus dados pessoais e comece a jornada conosco.
        </p>
        <button id="signup" className="btn btn-primary" onClick={onSwitch}>
          Cadastre-se
        </button>
      </div>

      <div className="second-column">
        <h2 className="title title-second">Faça Login</h2>

        <Alerta
          tipo={tipoAlerta}
          mensagem={mensagemAlerta}
          visivel={mostrarAlerta}
          aoFechar={() => setMostrarAlerta(false)}
        />

        <form className="form" onSubmit={VerificarUsuario}>
          <label className="label-input">
            <input
              type="email"
              placeholder="Email"
              id="emailLogin"
              value={usuarioLogin.emailLogin}
              onChange={AtualizarUsuarioLogin}
              required
            />
          </label>

          <label className={`label-input ${styles.senhaWrapper}`}>
            <input
              type={mostrarSenha ? "text" : "password"}
              placeholder="Senha"
              id="senhaLogin"
              value={usuarioLogin.senhaLogin}
              onChange={AtualizarUsuarioLogin}
              required
            />
            <button
              type="button"
              className={styles.btnOlho}
              onClick={() => setMostrarSenha(!mostrarSenha)}
            >
              {mostrarSenha ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </label>

          <a className="password" href="#">
            Esqueceu sua senha?
          </a>
          <button type="submit" className="btn btn-second" disabled={desabilitarBotao}>
            {desabilitarBotao ? "Entrando..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default LoginForm;
