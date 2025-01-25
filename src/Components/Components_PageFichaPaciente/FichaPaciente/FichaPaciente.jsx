import style from "./FichaPaciente.module.css";
import ModalEditarPacinete from "../ModalEditarPaciente/ModalEditarPaciente";
import { useState, useEffect, useRef } from "react";
import { CgMoreVertical } from "react-icons/cg";

function FichaPaciente({ paciente, setPaciente }) {
  const [dropdownAcoes, setDropdownAcoes] = useState(false);
  const dropdownRef = useRef(null);

  const AlterarValorDropdownAcoes = () => {
    setDropdownAcoes(!dropdownAcoes);
  };

  // Fecha o dropdown ao clicar fora
  useEffect(() => {
    const ClicarForaDropdown = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownAcoes(false);
      }
    };
    document.addEventListener("mousedown", ClicarForaDropdown);
    return () => {
      document.removeEventListener("mousedown", ClicarForaDropdown);
    };
  }, []);

  return (
    <div className={style.container_total}>
      <div className={style.titulo_container_total}>
        <h2 className={style.titulo}>Ficha do Paciente</h2>

        <div className={style.menu_container} ref={dropdownRef}>
          <button className={style.menu_btn} onClick={AlterarValorDropdownAcoes}>
            <CgMoreVertical />
          </button>
          {dropdownAcoes && (
            <ul className={style.dropdown_menu}>
              <li>
                <ModalEditarPacinete
                  pacienteSelecionado={paciente}
                  setPacienteSelecionado={setPaciente}
                />
              </li>
            </ul>
          )}
        </div>
      </div>

      <div className={style.container_info_e_acao}>
        <div className={style.container_info_total}>
          <div className={style.container_info_linha_coluna}>
            <div className={style.container_info_coluna_principal}>
              <div className={style.container_info_linha}>
                <h3>Nome: </h3>
                <p>{paciente.nome}</p>
              </div>
              <div className={style.container_info_linha}>
                <h3>Gênero: </h3>
                <p>Gênero do paciente</p>
              </div>
              <div className={style.container_info_coluna}>
                <h3>Contatos: </h3>
                <p>Telefone: {paciente.telefone}</p>
                <p>Email: {paciente.email}</p>
              </div>
            </div>

            <div className={style.container_info_coluna_principal}>
              <div className={style.container_info_linha}>
                <h3>Data de Nascimento:</h3>
                <p>
                  {new Date(paciente.dataNascimento).toLocaleDateString(
                    "pt-BR"
                  )}
                </p>
              </div>
              <div className={style.container_info_linha}>
                <h3>CPF: </h3>
                <p>{paciente.cpf}</p>
              </div>
              <div className={style.container_info_coluna}>
                <h3>Endereço: </h3>
                <p>{paciente.endereco}</p>
              </div>
            </div>
          </div>

          <div className={style.container_info_coluna}>
            <h3>Histórico Médico</h3>
            <p>{paciente.historicoMedico}</p>
          </div>
        </div>

        <div className={style.container_acoes}></div>
      </div>
    </div>
  );
}

export default FichaPaciente;
