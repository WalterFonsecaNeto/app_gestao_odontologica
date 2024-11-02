import React, { useState } from "react";
import LoginForm from "../../Components/Components_PageAutenticacao/LoginForm/LoginForm";
import CadastroForm from "../../Components/Components_PageAutenticacao/CadastroForm/CadastroForm";
import "./PageAutenticacao.css"; // Certifique-se de importar o CSS correto

function PageAutenticacao({ setIsAuth }) {
  const [isLogin, setIsLogin] = useState(false);

  const handleSwitch = () => {
    setIsLogin(!isLogin);
  };

  return (
    <div className={`container ${isLogin ? 'sign-in-js' : 'sign-up-js'}`}>
      {isLogin ? (
        <LoginForm onSwitch={handleSwitch} />
      ) : (
        <CadastroForm onSwitch={handleSwitch} />
      )}
    </div>
  );
}

export default PageAutenticacao;
