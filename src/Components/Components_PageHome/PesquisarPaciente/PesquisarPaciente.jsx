import { useState, useEffect } from "react";
import { Search, Users } from "lucide-react";
import styles from "./PesquisarPaciente.module.css";
import PacienteApi from "../../../Services/MinhaApi/Paciente";
import { useNavigate } from "react-router-dom";  // Importe useNavigate

const PatientSearch = () => {
  const [search, setSearch] = useState("");
  const [pacientes, setPacientes] = useState([]);
  const navigate = useNavigate();  // Inicialize o hook useNavigate

  // Função para buscar a lista de pacientes na API
  async function BuscarPacientesApi() {
    const usuarioId = localStorage.getItem("usuarioId");

    try {
      const response = await PacienteApi.listarPacientesPorUsuarioAsync(usuarioId, true);
      setPacientes(response);
    } catch (error) {
      console.error("Erro ao buscar pacientes:", error);
    }
  }

  // Carregar lista de pacientes ao iniciar a página
  useEffect(() => {
    BuscarPacientesApi();
  }, []);

  const pacientesFiltrados = pacientes.filter((paciente) =>
    paciente.nome.toLowerCase().startsWith(search.toLowerCase())
  );

  // Função para navegar até a página do paciente
  const navegarParaPaciente = (idPaciente) => {
    const idCodificado = btoa(idPaciente); //? Codifica o ID em Base64
    navigate(`/paciente/ficha-clinica/${idCodificado}`);  // Redireciona para a URL específica do paciente
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
          {pacientesFiltrados.map((paciente) => (
            <div
              key={paciente.id}
              className={styles.patientItem}
              onClick={() => navegarParaPaciente(paciente.id)}  // Adiciona a função de clique
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
