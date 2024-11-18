import style from "./PageNovaEspecialidade.module.css";
import Rodape from "../../Components/Rodape/Rodape"
import  Cabecalho  from "../../Components/Cabecalho/Cabecalho";
import EspecialidadesForm from "../../Components/Components_PageNovaEspecialidade/EspecialidadesForm/EspecialidadesForm";

function PageNovaEspecialidade() {
  return (
    <div className={style.container_total}>
      <Cabecalho/>
      <div className={style.container_info}>
        <EspecialidadesForm/>
      </div>
      <Rodape/>
    </div>
  );
}
export default PageNovaEspecialidade;
