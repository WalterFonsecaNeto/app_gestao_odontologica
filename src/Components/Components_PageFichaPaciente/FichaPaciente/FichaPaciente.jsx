import style from "./FichaPaciente.module.css";
function FichaPaciente({ paciente }) {
  return (
    <div className={style.container_total}>
      <div className={style.titulo_container_total}>
        <h1>Ficha do Paciente</h1>
      </div>

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
              <p>Email: {paciente.email} </p>
            </div>
          </div>

          <div className={style.container_info_coluna_principal}>
            <div className={style.container_info_linha}>
              <h3>Data de Nascimento:</h3>
              <p>
                {new Date(paciente.dataNascimento).toLocaleDateString("pt-BR")}
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
    </div>
  );
}

export default FichaPaciente;
