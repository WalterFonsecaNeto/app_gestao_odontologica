import { PieChart as Chart, Pie, Cell, Legend, Tooltip } from "recharts";
import { CreditCard } from "lucide-react";
import styles from "./GraficoPizza.module.css";

const data = [
  { name: "PIX", value: 40 },
  { name: "Dinheiro", value: 25 },
  { name: "Cartão de Crédito", value: 20 },
  { name: "Cartão de Débito", value: 15 },
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const PieChart = () => {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.title}>
          <CreditCard />
          Formas de Pagamento
        </h2>
      </div>
      <div className={styles.chartContainer}>
        <Chart width={300} height={300}>
          <Pie
            data={data}
            cx={150}
            cy={120}
            innerRadius={60}
            outerRadius={80}
            fill="#8884d8"
            paddingAngle={5}
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend layout="horizontal" verticalAlign="bottom" align="center" />
        </Chart>
      </div>
    </div>
  );
};

export default PieChart;
