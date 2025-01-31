import { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { FiMenu, FiX } from "react-icons/fi";
import style from "./MenuHamburguer.module.css";

function MenuHamburguer() {
    const [isOpen, setIsOpen] = useState(false); // Estado para o menu hamburguer
    const [submenuOpen1, setSubmenuOpen1] = useState(false); // Estado para o submenu do primeiro item
    const [submenuOpen2, setSubmenuOpen2] = useState(false); // Estado para o submenu do segundo item

    const toggleMenu = () => {
        setIsOpen(!isOpen); // Alterna entre abrir e fechar o menu hamburguer
    };

    return (
        <>
            <button className={style.menuButton} onClick={toggleMenu}>
                {isOpen ? <FiX size={30}   style={{ strokeWidth: 2 }}/> : <FiMenu size={30} style={{ strokeWidth: 2 }} />}
            </button>
            <nav className={`${style.sidebar} ${isOpen ? style.open : ""}`}>
                <ul className={style.menuList}>
                    <li className={`${style.menuItem} ${submenuOpen1 ? style.open : ""}`}>
                        <a
                            href="#"
                            className={style.link}
                            onClick={() => setSubmenuOpen1(!submenuOpen1)} // Alterna o submenu do primeiro item
                        >
                            Cadastrar <IoIosArrowDown />
                        </a>
                        {submenuOpen1 && (
                            <ul className={style.submenu}>
                                <li className={style.submenu_item}><a href="#" className={style.submenu_link}>Forma de Pagamento</a></li>
                                <li className={style.submenu_item}><a href="#" className={style.submenu_link}>Procedimento</a></li>
                                <li className={style.submenu_item}><a href="#" className={style.submenu_link}>Paciente</a></li>
                                <li className={style.submenu_item}><a href="#" className={style.submenu_link}>Especialidade</a></li>
                            </ul>
                        )}
                    </li>
                    <li className={`${style.menuItem} ${submenuOpen2 ? style.open : ""}`}>
                        <a
                            href="#"
                            className={style.link}
                            onClick={() => setSubmenuOpen2(!submenuOpen2)} // Alterna o submenu do segundo item
                        >
                            Item 2 <IoIosArrowDown />
                        </a>
                        {submenuOpen2 && (
                            <ul className={style.submenu}>
                                <li className={style.submenu_item}><a href="#" className={style.submenu_link}>Development</a></li>
                                <li className={style.submenu_item}><a href="#" className={style.submenu_link}>Design</a></li>
                                <li className={style.submenu_item}><a href="#" className={style.submenu_link}>Marketing</a></li>
                                <li className={style.submenu_item}><a href="#" className={style.submenu_link}>SEO</a></li>
                            </ul>
                        )}
                    </li>
                </ul>
            </nav>
        </>
    );
}

export default MenuHamburguer;
