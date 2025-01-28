import style from "./PacientesTable.module.css";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { MdPersonOutline } from "react-icons/md";
import PacienteApi from "../../../Services/MinhaApi/Paciente";
import Alerta from "../../Alerta/Alerta";

function PacientesTable({ filtro, pacientes, setPacientes }) {
  const navigate = useNavigate();
  const [mostrarAlerta, setMostrarAlerta] = useState(false);
  const [mensagemAlerta, setMensagemAlerta] = useState("");
  const [tipoAlerta, setTipoAlerta] = useState("");

  // Função para exibir o alerta
  function ExibirAlerta(mensagem, tipo) {
    setMensagemAlerta(mensagem);
    setTipoAlerta(tipo);
    setMostrarAlerta(true);

    setTimeout(() => {
      setMostrarAlerta(false);
    }, 5000); // Alerta desaparece após 5 segundos
  }

  function InformacoesPaciente(id) {
    const idCodificado = btoa(id); //? Codifica o ID em Base64 - exadecimal
    navigate(`/paciente/ficha-clinica/${idCodificado}`);
  }

  async function BuscarPacientesApi() {
    const usuarioId = localStorage.getItem("usuarioId");

    try {
      const response = await PacienteApi.listarPacientesPorUsuarioAsync(
        usuarioId,
        true
      );
      setPacientes(response);
    } catch (error) {
      const mensagemErro =
        error.response?.data ||
        "Ocorreu um erro ao listar os pacientes. Tente novamente.";
      ExibirAlerta(mensagemErro, "danger");
    }
  }

  useEffect(() => {
    BuscarPacientesApi();
  }, []);

  function MostarPacientes() {
    // Filtra a lista de pacientes com base no filtro, considerando apenas nomes que começam com o filtro
    const pacientesFiltrados = pacientes?.filter((paciente) =>
      paciente.nome.toLowerCase().startsWith(filtro.toLowerCase())
    );

    return pacientesFiltrados?.map((paciente) => (
      <>
        <tr key={paciente.id}>
          <td style={{ textAlign: "start" }}>{paciente.nome}</td>
          <td>{paciente.cpf}</td>
          <td>
            {new Date(paciente.dataNascimento).toLocaleDateString("pt-BR")}
          </td>
          <td>{paciente.telefone}</td>
          <td>{paciente.genero}</td>
          <td>
            <button className={style.botao_info} onClick={() => InformacoesPaciente(paciente.id)}>
              <MdPersonOutline />
            </button>
          </td>
        </tr>
        {/* Exibição do Alerta */}
        <Alerta
          tipo={tipoAlerta}
          mensagem={mensagemAlerta}
          visivel={mostrarAlerta}
          aoFechar={() => setMostrarAlerta(false)}
        />
      </>
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
              <th>Data de Nacimento</th>
              <th>Telefone</th>
              <th>Genero</th>
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
