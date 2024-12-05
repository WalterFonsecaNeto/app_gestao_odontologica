import { ArrowUpRight, ArrowDownRight, BarChart } from "lucide-react";
import styles from "./MovimentacaoDiaria.module.css";

const DailyMovements = () => {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.title}>
          <BarChart />
          Movimentações Diárias
        </h2>
      </div>
      <div className={styles.movementsContainer}>
        <div className={styles.movement}>
          <ArrowUpRight />
          <span>R$ 1.250</span>
        </div>
        <div className={styles.movement}>
          <ArrowDownRight />
          <span>R$ 450</span>
        </div>
      </div>
    </div>
  );
};

export default DailyMovements;
