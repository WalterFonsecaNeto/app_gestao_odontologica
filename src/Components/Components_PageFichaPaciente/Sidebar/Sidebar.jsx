import style from "./Sidebar.module.css";
import { SidebarItem } from "../SidebarItem/SidebarItem";
import { MdGroup, MdAttachMoney, MdExitToApp } from "react-icons/md";
import { VscAccount } from "react-icons/vsc";
import { FaClipboardList } from "react-icons/fa";
export function Sidebar({ children, paciente }) {
  const idCodificado = btoa(paciente.id); //? Codifica o ID em Base64
  return (
    <div>
      <div className={style.sidebar_conteudo}>
        <div className={style.sidebar_header}>
          <VscAccount className={style.logo_paciente} />
          <h3>{paciente.nome}</h3>
        </div>
        <div className={style.sidebar_corpo}>
          <SidebarItem
            texto="Ficha"
            link={`/paciente/ficha-clinica/${idCodificado}`}
            usuarioId={idCodificado}
            logo={<FaClipboardList />}
          />
           <SidebarItem
            texto="Orçamentos"
            link={`/orcamento/${idCodificado}`}
            logo={<MdAttachMoney />}
          />
          <SidebarItem
            texto="Agendamentos"
            link={`/paciente/agendamentos/${idCodificado}`}
            logo={<MdGroup/>}
          />
          <SidebarItem
            texto="Home"
            link={`/home`}
            logo={<MdExitToApp/>}
          />
        </div>
      </div>
      <div className={style.pagina_conteudo}>{children}</div>
    </div>
  );
}
