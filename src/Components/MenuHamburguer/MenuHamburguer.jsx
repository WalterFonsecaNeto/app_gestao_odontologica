import { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { FiMenu, FiX } from "react-icons/fi";
import style from "./MenuHamburguer.module.css";

function MenuHamburguer() {
  const [isOpen, setIsOpen] = useState(false); // Estado do menu hamburguer
  const [activeSubmenu, setActiveSubmenu] = useState(null); // Controla qual submenu está aberto

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleSubmenuToggle = (submenu) => {
    setActiveSubmenu((prev) => (prev === submenu ? null : submenu)); // Fecha o submenu se for clicado de novo
  };

  return (
    <>
      <button className={style.menuButton} onClick={toggleMenu}>
        {isOpen ? <FiX size={30} style={{ strokeWidth: 2 }} /> : <FiMenu size={30} style={{ strokeWidth: 2 }} />}
      </button>

      <nav className={`${style.sidebar} ${isOpen ? style.open : ""}`}>
        <ul className={style.menuList}>
          {/* Submenu 1 */}
          <li className={`${style.menuItem} ${activeSubmenu === "submenu1" ? style.open : ""}`}>
            <a
              href="#"
              className={style.link}
              onClick={() => handleSubmenuToggle("submenu1")}
            >
              Cadastro <IoIosArrowDown />
            </a>
            {activeSubmenu === "submenu1" && (
              <ul className={style.submenu}>
                <li className={style.submenu_item}>
                  <a href="http://localhost:3000/formaspagamento" className={style.submenu_link}>Forma de Pagamento</a>
                </li>
                <li className={style.submenu_item}>
                  <a href="http://localhost:3000/procedimentos" className={style.submenu_link}>Procedimento</a>
                </li>
                <li className={style.submenu_item}>
                  <a href="http://localhost:3000/pacientes" className={style.submenu_link}>Paciente</a>
                </li>
                <li className={style.submenu_item}>
                  <a href="http://localhost:3000/especialidades" className={style.submenu_link}>Especialidade</a>
                </li>
              </ul>
            )}
          </li>

          {/* Submenu 2 */}
          <li className={`${style.menuItem} ${activeSubmenu === "submenu2" ? style.open : ""}`}>
            <a
              href="#"
              className={style.link}
              onClick={() => handleSubmenuToggle("submenu2")}
            >
              Atendimento <IoIosArrowDown />
            </a>
            {activeSubmenu === "submenu2" && (
              <ul className={style.submenu}>
                <li className={style.submenu_item}>
                  <a href="#" className={style.submenu_link}>Agendamento</a>
                </li>
              </ul>
            )}
          </li>
        </ul>
      </nav>
    </>
  );
}

export default MenuHamburguer;
