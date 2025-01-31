import style from "./Rodape.module.css";
import Navegacao from "./Navegacao";

function Rodape() {
  return (
    <footer className={style.rodape}>
      <Navegacao/>
    </footer>
  );
}

export default Rodape;
