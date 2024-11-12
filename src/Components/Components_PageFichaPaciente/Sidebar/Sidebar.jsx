import style from "./Sidebar.module.css";
import { SidebarItem } from "../SidebarItem/SidebarItem";
import { MdGroup, MdAttachMoney } from "react-icons/md";
import { VscAccount } from "react-icons/vsc";
import { FaClipboardList } from "react-icons/fa";
export function Sidebar({ children, paciente }) {
  const idCodificado = btoa(paciente.id); //? Codifica o ID em Base64
  return (
    <div>
      <div className={style.sidebar_conteudo}>
        <div className={style.sidebar_header}>
          <VscAccount className={style.logo_paciente} />
          <h2>{paciente.nome}</h2>
        </div>
        <div className={style.sidebar_corpo}>
          <SidebarItem
            texto="Ficha"
            link={`/paciente/ficha-clinica/${idCodificado}`}
            usuarioId={idCodificado}
            logo={<FaClipboardList className={style.ficha_icon} />}
          />
          <SidebarItem
            texto="Agendamentos"
            link={`/agendamento/${idCodificado}`}
            logo={<MdGroup className={style.agendamento_icon} />}
          />
          <SidebarItem
            texto="Orçamentos"
            link={`/orcamento/${idCodificado}`}
            logo={<MdAttachMoney className={style.orcamento_icon} />}
          />
        </div>
      </div>
      <div className={style.pagina_conteudo}>{children}</div>
    </div>
  );
}
