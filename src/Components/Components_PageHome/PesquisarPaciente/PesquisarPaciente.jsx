import { useState, useEffect } from "react";
import { Search, Users } from "lucide-react";
import styles from "./PesquisarPaciente.module.css";
import PacienteApi from "../../../Services/MinhaApi/Paciente";
import { useNavigate } from "react-router-dom";

const PatientSearch = () => {
  const [search, setSearch] = useState("");
  const [pacientes, setPacientes] = useState([]);
  const navigate = useNavigate();

  async function BuscarPacientesApi() {
    const usuarioId = localStorage.getItem("usuarioId");

    try {
      const response = await PacienteApi.listarPacientesPorUsuarioAsync(usuarioId, true);
      setPacientes(response);
    } catch (error) {
      console.error("Erro ao buscar pacientes:", error);
    }
  }

  useEffect(() => {
    BuscarPacientesApi();
  }, []);

  const pacientesFiltrados = pacientes?.filter((paciente) =>
    paciente.nome.toLowerCase().startsWith(search.toLowerCase())
  );

  const navegarParaPaciente = (idPaciente) => {
    const idCodificado = btoa(idPaciente);
    navigate(`/paciente/ficha-clinica/${idCodificado}`);
  };

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
          {/* Adicionei esta condição para mostrar a mensagem */}
          {pacientesFiltrados?.length === 0 && (
            <div className={styles.message}>
              {pacientes?.length === 0 ? "Nenhum paciente cadastrado" : "Nenhum paciente encontrado"}
            </div>
          )}
          
          {pacientesFiltrados?.map((paciente) => (
            <div
              key={paciente.id}
              className={styles.patientItem}
              onClick={() => navegarParaPaciente(paciente.id)}
            >
              <span>{paciente.nome}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PatientSearch;