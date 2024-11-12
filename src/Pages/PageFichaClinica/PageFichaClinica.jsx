import { useParams } from "react-router-dom";
import { Sidebar } from "../../Components/Components_PageFichaPaciente/Sidebar/Sidebar";
import { useState, useEffect } from "react";
import FichaPaciente from "../../Components/Components_PageFichaPaciente/FichaPaciente/FichaPaciente";

function PageFichaClinica() {
  const { id } = useParams();
  const decodedId = atob(id); //? Decodifica o ID
  const [paciente, setPaciente] = useState({});

  useEffect(() => {
    setPaciente(
      //? Simulação de dados do paciente (substitua com a lógica real de busca de pacientes)
      {
        id: decodedId,
        nome: "Paciente Teste Teste Teste Teste  ",
        cpf: "123.456.789-01",
        cidade: "Cidade Teste",
        endereco: "Rua Teste, 123",
        telefone: "(11) 9999-9999",
        dataNascimento: "1990-01-01",
        email: "teste@example.com",
        genero: "Masculino",
        historicoMedico:
          "Sem histórico médico relevante Sem histórico médico relevante Sem histórico médico relevante Sem histórico médico relevante Sem histórico médico relevante Sem histórico médico relevante Sem histórico médico relevante Sem histórico médico relevante Sem histórico médico relevante Sem histórico médico relevante Sem histórico médico relevante Sem histórico médico relevante",
      }
    );
    BuscarPaciente(); //? Chama a função para buscar as informações do paciente
  }, []);
  // Aqui você pode buscar as informações do paciente com base no ID decodificado e exibi-las.
  function BuscarPaciente() {
    //! Chame a API para buscar as informações do paciente com base no ID
    // Exemplo de chamada para a API:
    // fetch(`api/pacientes/${decodedId}`)
    //   .then(response => response.json())
    //   .then(data => {
    //     setPaciente(data);
    //   })
    //   .catch(error => {
    //     console.error('Erro ao buscar informações do paciente:', error);
    //   });
  }

  return (
    <div>
      <Sidebar paciente={paciente}>
        <FichaPaciente paciente={paciente} />
      </Sidebar>
    </div>
  );
}
export default PageFichaClinica;
