import { useState, useEffect } from "react";
import ModalGlobal from "../../ModalGlobal/ModalGlobal";
import Alerta from "../../Alerta/Alerta";
import style from "./ModalEditarProcedimento.module.css";
import { MdEdit } from "react-icons/md";
import ProcedimentoApi from "../../../Services/MinhaApi/Procedimento"; // Supondo que você tenha um serviço para procedimentos
import EspecialidadeApi from "../../../Services/MinhaApi/Especialidade"; // Supondo que você tenha um serviço para especialidades

function ModalEditarProcedimento({ procedimentoSelecionado, setProcedimentos }) {
    const [procedimento, setProcedimento] = useState({
        nome: "",
        descricao: "",
        valor: 0,
        especialidadeId: 0,
    });
    const [especialidades, setEspecialidades] = useState([]); // Lista de especialidades
    const [aberto, setAberto] = useState(false);
    const [mostrarAlerta, setMostrarAlerta] = useState(false);
    const [mensagemAlerta, setMensagemAlerta] = useState("");
    const [tipoAlerta, setTipoAlerta] = useState("");
    const [desabilitarBotoes, setDesabilitarBotoes] = useState(false); // Para desabilitar os botões
    const [desabilitarBotaoSalvar, setDesabilitarBotaoSalvar] = useState(true); // Para desabilitar o botão de salvar

    function ExibirAlerta(mensagem, tipo) {
        setMensagemAlerta(mensagem);
        setTipoAlerta(tipo);
        setMostrarAlerta(true);

        setTimeout(() => {
            setMostrarAlerta(false);
            setAberto(false);
            setDesabilitarBotoes(false); // Reabilitar botões após 5 segundos
        }, 5000);
    }

    useEffect(() => {
        if (!aberto) {
            setProcedimento({ ...procedimentoSelecionado });
        }
    }, [aberto, procedimentoSelecionado]);

    useEffect(() => {
        // Garantir que especialidadeId seja sempre um número
        const especialidadeIdAtual = Number(procedimento.especialidadeId);
        const especialidadeIdOriginal = Number(procedimentoSelecionado.especialidadeId);

        // Comparar os valores dos campos corretamente
        const camposNaoAlterados =
            procedimento.nome === procedimentoSelecionado.nome &&
            procedimento.descricao === procedimentoSelecionado.descricao &&
            parseFloat(procedimento.valor) === parseFloat(procedimentoSelecionado.valor) && // Comparação numérica
            especialidadeIdAtual === especialidadeIdOriginal; // Comparação correta da especialidade

        setDesabilitarBotaoSalvar(camposNaoAlterados);
    }, [procedimento]); // Agora o useEffect reage corretamente a qualquer mudança no procedimento


    async function carregarEspecialidades() {
        const usuarioId = localStorage.getItem("usuarioId");
        try {
            const response = await EspecialidadeApi.listarEspecialidadesPorUsuarioAsync(usuarioId, true);
            setEspecialidades(response);
        } catch (error) {
            ExibirAlerta("Erro ao carregar especialidades", "danger");
        }
    }

    useEffect(() => {
        carregarEspecialidades();
    }, []);

    const AtualizarProcedimento = async (event) => {
        event.preventDefault();
        const usuarioId = localStorage.getItem("usuarioId");

        // Desabilita os botões enquanto a requisição está em andamento
        setDesabilitarBotoes(true);

        try {
            // Chama a API para atualizar o procedimento
            await ProcedimentoApi.atualizarProcedimentoAsync(
                usuarioId,
                procedimentoSelecionado.id,
                procedimento.nome,
                procedimento.descricao,
                procedimento.valor,
                procedimento.especialidadeId
            );

            // Atualiza a lista de procedimentos no componente pai com o setProcedimentos
            setProcedimentos((prevProcedimentos) => {
                return prevProcedimentos.map((item) =>
                    item.id === procedimentoSelecionado.id
                        ? { ...item, nome: procedimento.nome, descricao: procedimento.descricao, valor: procedimento.valor, especialidadeId: procedimento.especialidadeId }
                        : item
                );
            });

            ExibirAlerta("Procedimento atualizado com sucesso!", "success");
        } catch (error) {
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
                <div className={`${style.container_total_modal} ${desabilitarBotoes ? style.container_total_modal_desabilitado : ""}`}>
                    <ModalGlobal aberto={aberto} setAberto={setAberto} titulo="Editar Procedimento">
                        <div className={`${style.container_formulario} ${desabilitarBotoes ? style.container_formulario_desabilitado : ""}`}>
                            <form onSubmit={AtualizarProcedimento}>
                                <div className={style.container_linha}>
                                    <div className={style.container_info_nome}>
                                        <label className={style.label}>Nome:</label>
                                        <input
                                            type="text"
                                            className={style.input}
                                            placeholder="Nome do procedimento"
                                            name="nome"
                                            value={procedimento.nome}
                                            onChange={(e) =>
                                                setProcedimento((prev) => ({ ...prev, nome: e.target.value }))
                                            }
                                            required
                                        />
                                    </div>

                                    <div className={style.container_info_descricao}>
                                        <label className={style.label}>Descrição:</label>
                                        <input
                                            type="text"
                                            className={style.input}
                                            placeholder="Descrição do procedimento"
                                            name="descricao"
                                            value={procedimento.descricao}
                                            onChange={(e) =>
                                                setProcedimento((prev) => ({ ...prev, descricao: e.target.value }))
                                            }
                                            required
                                        />
                                    </div>
                                </div>

                                <div className={style.container_linha}>
                                    <div className={style.container_info_valor}>
                                        <label className={style.label}>Valor:</label>
                                        <input
                                            type="number"
                                            className={style.input}
                                            placeholder="Valor do procedimento"
                                            name="valor"
                                            value={procedimento.valor}
                                            onChange={(e) =>
                                                setProcedimento((prev) => ({ ...prev, valor: e.target.value }))
                                            }
                                            required
                                        />
                                    </div>

                                    <div className={style.container_info_especialidade}>
                                        <label className={style.label}>Especialidade:</label>
                                        <select
                                            className={style.input}
                                            name="especialidadeId"
                                            value={procedimento.especialidadeId}
                                            onChange={(e) =>
                                                setProcedimento((prev) => ({ ...prev, especialidadeId: Number(e.target.value) })) // Garantindo que o valor seja numérico
                                            }
                                            required
                                        >
                                            <option value="" disabled>Selecione uma especialidade</option>
                                            {especialidades.map((especialidade) => (
                                                <option key={especialidade.id} value={especialidade.id}>
                                                    {especialidade.nome}
                                                </option>
                                            ))}
                                        </select>

                                    </div>
                                </div>

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

export default ModalEditarProcedimento;
