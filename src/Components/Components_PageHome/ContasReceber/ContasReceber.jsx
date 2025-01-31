import { Receipt } from "lucide-react";
import styles from "./ConstasReceber.module.css";

const Receivables = () => {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.title}>
          <Receipt />
          Contas a Receber
        </h2>
      </div>
      <div className={styles.receivablesContainer}>
        <div className={styles.receivableItem}>
          <span>Hoje</span>
          <span>R$ 850,00</span>
        </div>
        <div className={styles.receivableItem}>
          <span>Esta semana</span>
          <span>R$ 3.250,00</span>
        </div>
        <div className={styles.receivableItem}>
          <span>Este mês</span>
          <span>R$ 12.450,00</span>
        </div>
      </div>
    </div>
  );
};

export default Receivables;
