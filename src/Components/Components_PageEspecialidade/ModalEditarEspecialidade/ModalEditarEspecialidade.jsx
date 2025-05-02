import { useState, useEffect } from "react";
import ModalGlobal from "../../ModalGlobal/ModalGlobal";
import EspecialidadeApi from "../../../Services/MinhaApi/Especialidade";
import Alerta from "../../Alerta/Alerta";
import style from "./ModalEditarEspecialidade.module.css";
import { MdEdit } from "react-icons/md";

function ModalEditarEspecialidade({ especialidadeSelecionada, setEspecialidades, especialidades }) {
  const [especialidade, setEspecialidade] = useState({
    ...especialidadeSelecionada
  });
  const [aberto, setAberto] = useState(false);
  const [mostrarAlerta, setMostrarAlerta] = useState(false);
  const [mensagemAlerta, setMensagemAlerta] = useState("");
  const [tipoAlerta, setTipoAlerta] = useState("");
  const [desabilitarBotoes, setDesabilitarBotoes] = useState(false);
  const [desabilitarBotaoSalvar, setDesabilitarBotaoSalvar] = useState(true);

  function ExibirAlerta(mensagem, tipo) {
    setMensagemAlerta(mensagem);
    setTipoAlerta(tipo);
    setMostrarAlerta(true);

    setTimeout(() => {
      setMostrarAlerta(false);
      setAberto(false);
      setDesabilitarBotoes(false);
    }, 500);
  }

  useEffect(() => {
    if (!aberto) {
      setEspecialidade(especialidadeSelecionada);
    }
  }, [aberto, especialidadeSelecionada]);

  useEffect(() => {
    if (especialidade.nome !== especialidadeSelecionada.nome) {
      setDesabilitarBotaoSalvar(false);
    } else {
      setDesabilitarBotaoSalvar(true);
    }
  }, [especialidade, especialidadeSelecionada]);

  const AtualizarEspecialidade = async (event) => {
    event.preventDefault();
    setDesabilitarBotoes(true);

    const usuarioId = localStorage.getItem("usuarioId");

    try {
      await EspecialidadeApi.atualizarEspecialidadeAsync(
        especialidadeSelecionada.id,
        usuarioId,
        especialidade.nome
      );

      const especialidadesAtualizadas = especialidades.map(e =>
        e.id === especialidadeSelecionada.id
          ? { ...e, nome: especialidade.nome }
          : e
      );
      setEspecialidades(especialidadesAtualizadas);

      ExibirAlerta("Especialidade atualizada com sucesso!", "success");
    }
    catch (error) {
      const mensagemErro = error.response?.data?.errors
        ? Object.values(error.response.data.errors).flat().join(" ")
        : error.response?.data?.title || "Erro ao atualizar especialidade.";

      ExibirAlerta(mensagemErro, "danger");
    }


  };

  return (
    <div>
      <button className={style.botao_modal} onClick={() => setAberto(true)}>
        <MdEdit />
      </button>

      {aberto && (
        <div
          className={`${style.container_total_modal} ${desabilitarBotoes ? style.container_total_modal_desabilitado : ""
            }`}
        >
          <ModalGlobal
            aberto={aberto}
            setAberto={setAberto}
            titulo="Editar Especialidade"
          >
            <div
              className={`${style.container_formulario} ${desabilitarBotoes ? style.container_formulario_desabilitado : ""
                }`}
            >
              <form onSubmit={AtualizarEspecialidade}>
                <label>Nome</label>
                <input
                  type="text"
                  className={style.input}
                  name="nome"
                  value={especialidade.nome}
                  onChange={(e) =>
                    setEspecialidade((prev) => ({
                      ...prev,
                      nome: e.target.value,
                    }))
                  }
                  required
                />

                <button
                  type="submit"
                  className={style.botao_salvar}
                  disabled={desabilitarBotaoSalvar}
                >
                  Salvar
                </button>
              </form>
            </div>
          </ModalGlobal>
        </div>
      )}

      <Alerta
        tipo={tipoAlerta}
        mensagem={mensagemAlerta}
        visivel={mostrarAlerta}
        aoFechar={() => setMostrarAlerta(false)}
      />
    </div>
  );
}

export default ModalEditarEspecialidade;
