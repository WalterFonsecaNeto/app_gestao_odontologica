import { useParams } from "react-router-dom";
import { Sidebar } from "../../Components/Components_PageFichaPaciente/Sidebar/Sidebar";
import { useState, useEffect } from "react";
import FichaPaciente from "../../Components/Components_PageFichaPaciente/FichaPaciente/FichaPaciente";
import PacienteApi from "../../Services/MinhaApi/Paciente"

function PageFichaClinica() {
  const { id } = useParams();
  const decodedId = atob(id); //? Decodifica o ID
  const [paciente, setPaciente] = useState({});

  async function BuscarPaciente() {
    const usuarioId = localStorage.getItem('usuarioId');
    try {
      const response = await PacienteApi.obterPacienteAsync(decodedId, usuarioId, true);
      setPaciente(response)
    } catch (error) {
      console.error("Erro ao buscar informações do paciente:", error);
      throw error;
    }
  }


  useEffect(() => {
    BuscarPaciente(); //? Chama a função para buscar as informações do paciente
  }, []);

  return (
    <div>
      <Sidebar paciente={paciente}>
        <FichaPaciente paciente={paciente} setPaciente={setPaciente} />
      </Sidebar>
    </div>
  );
}
export default PageFichaClinica;
