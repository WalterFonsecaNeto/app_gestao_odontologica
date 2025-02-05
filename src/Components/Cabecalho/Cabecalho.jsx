import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import style from "./Cabecalho.module.css";
import { IoIosArrowDown } from "react-icons/io";

import MenuHamburguer from "../MenuHamburguer/MenuHamburguer";
import BotaoSair from "./BotaoSair";

function Cabecalho() {
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setIsAnimating((prev) => !prev); // Alterna o estado a cada 10 segundos
    }, 3000);

    return () => clearInterval(intervalId); // Limpeza do intervalo ao desmontar o componente
  }, []);

  return (
    <header className={style.cabecalho}>
      <div className={style.container_menu_logo}>
        <div className={style.menuHamburguerContainer}>
          <MenuHamburguer />
        </div>
        <Link to="/home">
          <button className={style.button} data-text="Awesome">
            <span className={style.actual_text}>&nbsp;OdontoSync&nbsp;</span>
            <span
              aria-hidden="true"
              className={`${style.hover_text} ${
                isAnimating ? style.animate : ""
              }`}
            >
              &nbsp;OdontoSync&nbsp;
            </span>
          </button>
        </Link>
      </div>
      <div className={style.menu_total}>
        <div className={style.menu}>
          <div className={style.item}>
            <a className={style.link} href="#">
              <p>Informações</p>
              <IoIosArrowDown />
            </a>
            <div className={style.submenu}>
              <div className={style.submenu_item}>
                <Link className={style.submenu_link} to="/pacientes">
                  Pacientes
                </Link>
              </div>
              <div className={style.submenu_item}>
                <Link className={style.submenu_link} to="/especialidades">
                  Especialidades
                </Link>
              </div>
              <div className={style.submenu_item}>
                <Link className={style.submenu_link} to="/procedimentos">
                  Procedimentos
                </Link>
              </div>
              <div className={style.submenu_item}>
                <Link className={style.submenu_link} to="/formaspagamento">
                  Formas de Pagamento
                </Link>
              </div>
            </div>
          </div>

          <div className={style.item}>
            <a className={style.link} href="#">
              <p>Atendimento</p>
              <IoIosArrowDown />
            </a>
            <div className={style.submenu}>
              <div className={style.submenu_item}>
                <Link className={style.submenu_link} to="/agendamentos">
                  Agendamento
                </Link>
              </div>
            </div>
          </div>
          <BotaoSair />
        </div>
      </div>
    </header>
  );
}

export default Cabecalho;
