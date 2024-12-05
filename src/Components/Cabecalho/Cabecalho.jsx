import { Link } from "react-router-dom";
import style from "./Cabecalho.module.css";
import { IoIosArrowDown } from "react-icons/io";
function Cabecalho() {
  return (
    <header className={style.cabecalho}>
      <button className={style.button} data-text="Awesome">
        <span className={style.actual_text}>&nbsp;OdontoSync&nbsp;</span>
        <span aria-hidden="true" className={style.hover_text}>
          &nbsp;OdontoSync&nbsp;
        </span>
      </button>
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
                <Link className={style.submenu_link} to="/formasPagamento">
                  Formas de Pagamento
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className={style.menu}>
          <div className={style.item}>
            <a className={style.link} href="#">
              <p>Atendimento</p>
              <IoIosArrowDown />
            </a>
            <div className={style.submenu}>
              <div className={style.submenu_item}>
                <Link className={style.submenu_link} to=""></Link>
              </div>
              <div className={style.submenu_item}>
                <Link className={style.submenu_link} to=""></Link>
              </div>
              <div className={style.submenu_item}>
                <Link className={style.submenu_link} to=""></Link>
              </div>
              <div className={style.submenu_item}>
                <Link className={style.submenu_link} to=""></Link>
              </div>
            </div>
          </div>
        </div>
        <div className={style.menu}>
          <div className={style.item}>
            <a className={style.link} href="#">
              <p>Financeiro</p>
              <IoIosArrowDown />
            </a>
            <div className={style.submenu}>
              <div className={style.submenu_item}>
                <Link className={style.submenu_link} to=""></Link>
              </div>
              <div className={style.submenu_item}>
                <Link className={style.submenu_link} to=""></Link>
              </div>
              <div className={style.submenu_item}>
                <Link className={style.submenu_link} to=""></Link>
              </div>
              <div className={style.submenu_item}>
                <Link className={style.submenu_link} to=""></Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Cabecalho;
