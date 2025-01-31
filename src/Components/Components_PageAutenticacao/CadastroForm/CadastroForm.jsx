import React, { useEffect, useState } from "react";
import "../../../Pages/PageAutenticacao/PageAutenticacao.css";
import UsuarioApi from "../../../Services/MinhaApi/Usuario";
import Alerta from "../../Alerta/Alerta"; // Importando o componente de alerta

function CadastroForm({ onSwitch }) {
  useEffect(() => {
    localStorage.clear();
  }, []);

  const [usuarioCadastro, setUsuarioCadastro] = useState({
    nomeCadastro: "",
    emailCadastro: "",
    senhaCadastro: "",
  });

  const [mostrarAlerta, setMostrarAlerta] = useState(false);
  const [mensagemAlerta, setMensagemAlerta] = useState("");
  const [tipoAlerta, setTipoAlerta] = useState(""); // "success" ou "danger"
  const [desabilitarBotao, setDesabilitarBotao] = useState(false);

  function AtualizarUsuarioCadastro(event) {
    const { id, value } = event.target;
    setUsuarioCadastro((prev) => ({ ...prev, [id]: value }));
  }

  // Função para exibir alertas
  const exibirAlerta = (mensagem, tipo) => {
    setMensagemAlerta(mensagem);
    setTipoAlerta(tipo);
    setMostrarAlerta(true);

    setTimeout(() => {
      setMostrarAlerta(false);
      setDesabilitarBotao(false);
    }, 5000);
  };

  async function CadastrarUsuario(event) {
    event.preventDefault();
    setDesabilitarBotao(true); // Bloqueia o botão após o clique

    try {
      await UsuarioApi.criarUsuarioAsync(
        usuarioCadastro.nomeCadastro,
        usuarioCadastro.emailCadastro,
        usuarioCadastro.senhaCadastro
      );
      exibirAlerta("Usuário cadastrado com sucesso!", "success");

      setUsuarioCadastro({
        nomeCadastro: "",
        emailCadastro: "",
        senhaCadastro: "",
      });
    } catch (error) {
      exibirAlerta(`${error.response.data}`, "danger");
    }


  }

  return (
    <div className="content first-content">
      <div className="first-column">
        <h2 className="title title-primary">Bem-vindo de volta!</h2>
        <p className="description description-primary">
          Para se manter conectado, faça login com suas informações pessoais.
        </p>
        <button id="signin" className="btn btn-primary" onClick={onSwitch}>
          Login
        </button>
      </div>

      <div className="second-column">
        <h2 className="title title-second">Criar Conta</h2>

        {/* Exibição do alerta */}
        <Alerta
          tipo={tipoAlerta}
          mensagem={mensagemAlerta}
          visivel={mostrarAlerta}
          aoFechar={() => setMostrarAlerta(false)}
        />

        <form className="form" onSubmit={CadastrarUsuario}>
          <label className="label-input">
            <input
              type="text"
              placeholder="Nome"
              id="nomeCadastro"
              value={usuarioCadastro.nomeCadastro}
              onChange={AtualizarUsuarioCadastro}
              required
            />
          </label>
          <label className="label-input">
            <input
              type="email"
              placeholder="Email"
              id="emailCadastro"
              value={usuarioCadastro.emailCadastro}
              onChange={AtualizarUsuarioCadastro}
              required
            />
          </label>
          <label className="label-input">
            <input
              type="password"
              placeholder="Senha"
              id="senhaCadastro"
              value={usuarioCadastro.senhaCadastro}
              onChange={AtualizarUsuarioCadastro}
              required
            />
          </label>
          <button type="submit" className="btn btn-second" disabled={desabilitarBotao}>
            {desabilitarBotao ? "Cadastrando..." : "Cadastrar"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default CadastroForm;
