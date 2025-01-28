import React, { useEffect, useState } from "react";
import "../../../Pages/PageAutenticacao/PageAutenticacao.css";
import { useNavigate } from "react-router-dom";
import UsuarioApi from "../../../Services/MinhaApi/Usuario";
import Alerta from "../../Alerta/Alerta"; // Importe o novo componente

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
    const navigate = useNavigate();

    // Função que atualiza os dados do usuário ao digitar no campo de login
    function AtualizarUsuarioLogin(event) {
        const id = event.target.id;
        const value = event.target.value;
        setUsuarioLogin({ ...usuarioLogin, [id]: value });
    }

    const exibirAlerta = (mensagem, tipo) => {
        console.log("Exibindo alerta", mensagem, tipo);  // Verifique se está chegando as informações
        setMensagemAlerta(mensagem);
        setTipoAlerta(tipo);
        setMostrarAlerta(true);

        setTimeout(() => {
            setMostrarAlerta(false);
        }, 5000);
    };

    async function VerificarUsuario(event) {
        event.preventDefault();
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
            exibirAlerta(`${error.response.data}`, "danger");
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
                    Insira seus dados pessoais e comece a jornada conosco
                </p>
                <button id="signup" className="btn btn-primary" onClick={onSwitch}>
                    Cadastre-se
                </button>
            </div>

            <div className="second-column">
                <h2 className="title title-second">Faça Login</h2>

                {/* Exibição do alerta */}
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
