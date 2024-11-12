import style from "./PageNovoPaciente.module.css";
import PacientesForm from "../../Components/Conponents_PageNovoPaciente/PacientesForm/PacientesForm";
import Rodape from "../../Components/Rodape/Rodape"
import  Cabecalho  from "../../Components/Cabecalho/Cabecalho";

function PageNovoPaciente() {
  return (
    <div className={style.container_total}>
      <Cabecalho/>
      <div className={style.container_info}>
        <PacientesForm />
      </div>
      <Rodape/>
    </div>
  );
}
export default PageNovoPaciente;
