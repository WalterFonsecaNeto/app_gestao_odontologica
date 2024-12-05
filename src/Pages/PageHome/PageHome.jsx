import Calendar from "../../Components/Components_PageHome/Calendario/Calendario";
import DailyMovements from "../../Components/Components_PageHome/MovimentacaoDiaria/MovimentacaoDiaria";
import Footer from "../../Components/Rodape/Rodape";
import Header from "../../Components/Cabecalho/Cabecalho";
import PatientSearch from "../../Components/Components_PageHome/PesquisarPaciente/PesquisarPaciente";
import PieChart from "../../Components/Components_PageHome/GraficoPizza/GraficoPizza";
import Receivables from "../../Components/Components_PageHome/ContasReceber/ContasReceber";
import styles from "./PageHome.module.css"
const PageHome = () => {
  return (
    <div className={styles.container}>
      <Header />
      
      <main className={styles.main}>
        <div className={styles.grid}>
          {/* Coluna Esquerda */}
          <div className={styles.column}>
            <Calendar />
            <div className={styles.smallGrid}>
              <DailyMovements />
              <Receivables />
            </div>
          </div>
          
          {/* Coluna Direita */}
          <div className={styles.column}>
            <PatientSearch />
            <PieChart />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default PageHome;