import { useState } from "react";
import { Search, Users } from "lucide-react";
import styles from "./PesquisarPaciente.module.css";

const PatientSearch = () => {
  const [search, setSearch] = useState("");

  const patients = [
    { id: 1, name: "João Silva", lastVisit: "15/03/2024" },
    { id: 2, name: "Maria Santos", lastVisit: "14/03/2024" },
    { id: 3, name: "Pedro Oliveira", lastVisit: "13/03/2024" },
  ];

  const filteredPatients = patients.filter((patient) =>
    patient.name.toLowerCase().startsWith(search.toLowerCase())
  );

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.title}>
          <Users />
          Buscar Pacientes
        </h2>
      </div>
      <div>
        <div className={styles.searchContainer}>
          <Search />
          <input
            className={styles.input}
            placeholder="Digite o nome do paciente..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className={styles.patientList}>
          {filteredPatients.map((patient) => (
            <div key={patient.id} className={styles.patientItem}>
              <span>{patient.name}</span>
              <span>Última visita: {patient.lastVisit}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PatientSearch;
