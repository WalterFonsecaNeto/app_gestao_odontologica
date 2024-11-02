import style from "./PacientesTable.module.css";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { MdPersonOutline } from 'react-icons/md';

function PacientesTable({ filtro }) {
  const navigate = useNavigate();
  const [pacientes, setPacientes] = useState([]);

  function InformacoesPaciente(id) {
    const idCodificado = btoa(id); //? Codifica o ID em Base64
    navigate(`/paciente/ficha-clinica/${idCodificado}`);
  }

  function BuscarPacienteApi() {
    //! Simulação de dados de pacientes (substitua com a lógica real de busca de pacientes)
    const response = {
      data: [
        {
          id: 1,
          nome: "João Silva Almeida Costa",
          cpf: "123.456.789-00",
          rg: "98.765.4321", // Formato RG
          telefone: "(12) 34567-8900", // Formato telefone
          endereco: "Rua A, 123",
        },
        {
          id: 2,
          nome: "Maria Oliveira Santos Lima",
          cpf: "987.654.321-00",
          rg: "12.345.6789", // Formato RG
          telefone: "(98) 76543-2100", // Formato telefone
          endereco: "Rua B, 456",
        },
        {
          id: 3,
          nome: "Pedro Henrique da Silva Pereira",
          cpf: "555.555.555-55",
          rg: "55.555.5555", // Formato RG
          telefone: "(55) 55555-5555", // Formato telefone
          endereco: "Rua C, 789",
        },
        {
          id: 4,
          nome: "Ana Clara dos Santos Oliveira",
          cpf: "111.222.333-44",
          rg: "22.233.3444", // Formato RG
          telefone: "(11) 98765-4321", // Formato telefone
          endereco: "Rua D, 321",
        },
        {
          id: 5,
          nome: "Carlos Eduardo de Souza Lima",
          cpf: "444.555.666-77",
          rg: "33.344.4555", // Formato RG
          telefone: "(44) 32165-9870", // Formato telefone
          endereco: "Rua E, 654",
        },
        {
          id: 6,
          nome: "Fernanda Maria Ferreira Santos",
          cpf: "888.999.000-11",
          rg: "66.777.8888", // Formato RG
          telefone: "(88) 45678-1234", // Formato telefone
          endereco: "Rua F, 987",
        },
        {
          id: 7,
          nome: "Roberto Carlos da Silva Lima",
          cpf: "222.333.444-55",
          rg: "44.555.6666", // Formato RG
          telefone: "(22) 65432-1098", // Formato telefone
          endereco: "Rua G, 123",
        },
        {
          id: 8,
          nome: "Juliana da Costa Almeida Santos",
          cpf: "555.666.777-88",
          rg: "77.888.9999", // Formato RG
          telefone: "(55) 12345-6789", // Formato telefone
          endereco: "Rua H, 456",
        },
        {
          id: 9,
          nome: "Felipe Augusto de Oliveira Silva",
          cpf: "333.444.555-66",
          rg: "22.111.0000", // Formato RG
          telefone: "(33) 67890-1234", // Formato telefone
          endereco: "Rua I, 789",
        },
        {
          id: 10,
          nome: "Sofia Regina da Silva Almeida",
          cpf: "777.888.999-22",
          rg: "33.444.5555", // Formato RG
          telefone: "(77) 34567-8901", // Formato telefone
          endereco: "Rua J, 123",
        },
        {
          id: 11,
          nome: "Gustavo Henrique Pereira Santos",
          cpf: "888.999.111-22",
          rg: "44.555.6666", // Formato RG
          telefone: "(88) 98765-4321", // Formato telefone
          endereco: "Rua K, 456",
        },
        {
          id: 12,
          nome: "Isabela Carolina da Silva Lima",
          cpf: "111.222.333-44",
          rg: "55.666.7777", // Formato RG
          telefone: "(11) 12345-6789", // Formato telefone
          endereco: "Rua L, 789",
        },
        {
          id: 13,
          nome: "Tiago da Silva Pereira Santos",
          cpf: "444.555.666-77",
          rg: "66.777.8888", // Formato RG
          telefone: "(44) 67890-1234", // Formato telefone
          endereco: "Rua M, 123",
        },
        {
          id: 14,
          nome: "Mariana Oliveira de Souza Lima",
          cpf: "222.333.444-55",
          rg: "77.888.9999", // Formato RG
          telefone: "(22) 54321-0987", // Formato telefone
          endereco: "Rua N, 456",
        },
        {
          id: 15,
          nome: "Luiz Fernando de Almeida Costa",
          cpf: "555.666.777-88",
          rg: "33.444.5555", // Formato RG
          telefone: "(55) 87654-3210", // Formato telefone
          endereco: "Rua O, 789",
        },
        {
          id: 16,
          nome: "Clara Beatriz dos Santos Oliveira",
          cpf: "333.444.555-66",
          rg: "22.111.0000", // Formato RG
          telefone: "(33) 23456-7890", // Formato telefone
          endereco: "Rua P, 123",
        },
        {
          id: 17,
          nome: "Rafael Augusto da Silva Ferreira",
          cpf: "777.888.999-22",
          rg: "33.444.5555", // Formato RG
          telefone: "(77) 34567-8902", // Formato telefone
          endereco: "Rua Q, 456",
        },
        {
          id: 18,
          nome: "Natalia Regina de Souza Almeida",
          cpf: "888.999.111-22",
          rg: "44.555.6666", // Formato RG
          telefone: "(88) 45678-1235", // Formato telefone
          endereco: "Rua R, 789",
        },
        {
          id: 19,
          nome: "Daniela Pereira da Silva Lima",
          cpf: "999.111.222-33",
          rg: "11.222.3333", // Formato RG
          telefone: "(99) 76543-2100", // Formato telefone
          endereco: "Rua S, 321",
        },
        {
          id: 20,
          nome: "Vinícius Santos de Almeida Costa",
          cpf: "444.666.888-99",
          rg: "22.333.4444", // Formato RG
          telefone: "(44) 32165-9876", // Formato telefone
          endereco: "Rua T, 654",
        },
      ],
    };

    setPacientes(response.data);
  }

  useEffect(() => {
    BuscarPacienteApi();
  }, []);

  function MostarPacientes() {
    // Filtra a lista de pacientes com base no filtro, considerando apenas nomes que começam com o filtro
    const pacientesFiltrados = pacientes.filter((paciente) =>
      paciente.nome.toLowerCase().startsWith(filtro.toLowerCase())
    );

    return pacientesFiltrados.map((paciente) => (
      <tr key={paciente.id}>
        <td style={{ textAlign: "start" }}>{paciente.nome}</td>
        <td>{paciente.cpf}</td>
        <td>{paciente.rg}</td>
        <td>{paciente.telefone}</td>
        <td>{paciente.endereco}</td>
        <td>
          <button onClick={() => InformacoesPaciente(paciente.id)}>
            <MdPersonOutline />
          </button>
        </td>
      </tr>
    ));
  }

  return (
    <div className={style.container_total}>
      <h2>Lista de Pacientes</h2>

      <div className={style.container_table}>
        <table>
          <thead>
            <tr>
              <th>Nome</th>
              <th>CPF</th>
              <th>RG</th>
              <th>Telefone</th>
              <th>Endereço</th>
              <th>Ficha</th>
            </tr>
          </thead>
          <tbody>{MostarPacientes()}</tbody>
        </table>
      </div>
    </div>
  );
}

export default PacientesTable;
