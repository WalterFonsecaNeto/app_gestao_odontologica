import { useParams } from "react-router-dom";

import { useState } from "react";


function PageFichaClinica() {
  const { id } = useParams();
  const decodedId = atob(id); //? Decodifica o ID
  const[paciente, setPaciente] = useState({});

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
      <h1>Ficha Clínica do Paciente {decodedId}</h1>
      {/* Exiba mais informações do paciente aqui */}
    </div>
  );
}
export default PageFichaClinica;