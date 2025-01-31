import { useParams } from "react-router-dom";
import { Sidebar } from "../../Components/Components_PageFichaPaciente/Sidebar/Sidebar";
import { useState, useEffect } from "react";
import PacienteApi from "../../Services/MinhaApi/Paciente";
import PacienteAgendamentos from "../../Components/Components_PageAgendamentosPaciente/PacienteAgendamentos/PacienteAgendamentos";

function PageAgendamentosPaciente() {
  const { id } = useParams();
  const decodedId = atob(id); //? Decodifica o ID
  const [paciente, setPaciente] = useState({});

  async function BuscarPaciente() {
    const usuarioId = localStorage.getItem("usuarioId");
    try {
      const response = await PacienteApi.obterPacienteAsync(
        decodedId,
        usuarioId,
        true
      );
      setPaciente(response);
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
        <PacienteAgendamentos />
      </Sidebar>
    </div>
  );
}
export default PageAgendamentosPaciente;
