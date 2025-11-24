var partidaModel = require("../models/partidaModel");

function registrar(req, res) {
    var fkUsuario = req.body.fkUsuario;
    var fkQuiz = req.body.fkQuiz;
    var pontuacao = req.body.pontuacao;
    var tempo = req.body.tempo;

    // Validação
    if (!fkUsuario || !fkQuiz || pontuacao === undefined || tempo === undefined) {
        return res.status(400).json({
            erro: "Dados incompletos",
            mensagem: "Todos os campos são obrigatórios"
        });
    }

    if (isNaN(pontuacao) || isNaN(tempo) || pontuacao < 0 || tempo < 0) {
        return res.status(400).json({
            erro: "Dados inválidos",
            mensagem: "Pontuação e tempo devem ser números positivos"
        });
    }

    partidaModel.registrarPartida(fkUsuario, fkQuiz, pontuacao, tempo)
        .then(resultado => res.status(201).json({
            sucesso: true,
            mensagem: "Partida registrada com sucesso",
            dados: resultado
        }))
        .catch(erro => {
            console.log("Erro ao registrar partida:", erro);
            res.status(500).json({
                erro: "Erro interno do servidor",
                detalhes: erro.sqlMessage || erro.message
            });
        });
}

function ultima(req, res) {
    var idUsuario = req.params.idUsuario;

    if (!idUsuario || isNaN(idUsuario)) {
        return res.status(400).json({
            erro: "ID de usuário inválido",
            mensagem: "O ID do usuário deve ser um número válido"
        });
    }

    partidaModel.obterUltimaPartida(idUsuario)
        .then(resultado => {
            if (resultado.length > 0) {
                res.status(200).json(resultado[0]);
            } else {
                res.status(404).json({
                    mensagem: "Nenhuma partida encontrada para este usuário"
                });
            }
        })
        .catch(erro => {
            console.log("Erro ao buscar última partida:", erro);
            res.status(500).json({
                erro: "Erro interno do servidor",
                detalhes: erro.sqlMessage || erro.message
            });
        });
}

function media(req, res) {
    partidaModel.obterMediaGeral()
        .then(resultado => {
            if (resultado.length > 0) {
                res.status(200).json(resultado[0]);
            } else {
                res.status(404).json({
                    mensagem: "Nenhuma estatística disponível"
                });
            }
        })
        .catch(erro => {
            console.log("Erro média geral:", erro);
            res.status(500).json({
                erro: "Erro interno do servidor",
                detalhes: erro.sqlMessage || erro.message
            });
        });
}

function gabarito(req, res) {
    var total = req.query.total; // Mudado para query parameter

    if (!total || isNaN(total) || total <= 0) {
        return res.status(400).json({
            erro: "Parâmetro inválido",
            mensagem: "O parâmetro 'total' deve ser um número positivo"
        });
    }

    partidaModel.obterGabaritaram(total)
        .then(resultado => {
            if (resultado.length > 0) {
                res.status(200).json(resultado[0]);
            } else {
                res.status(404).json({
                    mensagem: "Nenhum usuário gabaritou com essa pontuação"
                });
            }
        })
        .catch(erro => {
            console.log("Erro gabarito:", erro);
            res.status(500).json({
                erro: "Erro interno do servidor",
                detalhes: erro.sqlMessage || erro.message
            });
        });
}

function top3(req, res) {
    partidaModel.obterTop3()
        .then(resultado => res.status(200).json(resultado))
        .catch(erro => {
            console.log("Erro top3:", erro);
            res.status(500).json({
                erro: "Erro interno do servidor",
                detalhes: erro.sqlMessage || erro.message
            });
        });
}

function ranking(req, res) {
    const limite = parseInt(req.query.limite) || 100;
    const offset = parseInt(req.query.offset) || 0;

    partidaModel.obterRanking(limite, offset)
        .then(resultado => res.status(200).json(resultado))
        .catch(erro => {
            console.log("Erro ranking:", erro);
            res.status(500).json({
                erro: "Erro interno do servidor",
                detalhes: erro.sqlMessage || erro.message
            });
        });
}

function distribuicao(req, res) {
    partidaModel.obterDistribuicao()
        .then(resultado => res.status(200).json(resultado))
        .catch(erro => {
            console.log("Erro distribuição:", erro);
            res.status(500).json({
                erro: "Erro interno do servidor",
                detalhes: erro.sqlMessage || erro.message
            });
        });
}

function estatisticasUsuario(req, res) {
    var idUsuario = req.params.idUsuario;

    if (!idUsuario || isNaN(idUsuario)) {
        return res.status(400).json({
            erro: "ID de usuário inválido",
            mensagem: "O ID do usuário deve ser um número válido"
        });
    }

    partidaModel.obterEstatisticasUsuario(idUsuario)
        .then(resultado => {
            if (resultado.length > 0) {
                res.status(200).json(resultado[0]);
            } else {
                res.status(404).json({
                    mensagem: "Nenhuma estatística encontrada para este usuário"
                });
            }
        })
        .catch(erro => {
            console.log("Erro estatísticas do usuário:", erro);
            res.status(500).json({
                erro: "Erro interno do servidor",
                detalhes: erro.sqlMessage || erro.message
            });
        });
}

function historico(req, res) {
    var idUsuario = req.params.idUsuario;
    const limite = parseInt(req.query.limite) || 10;

    if (!idUsuario || isNaN(idUsuario)) {
        return res.status(400).json({
            erro: "ID de usuário inválido",
            mensagem: "O ID do usuário deve ser um número válido"
        });
    }

    partidaModel.obterHistoricoUsuario(idUsuario, limite)
        .then(resultado => res.status(200).json(resultado))
        .catch(erro => {
            console.log("Erro histórico:", erro);
            res.status(500).json({
                erro: "Erro interno do servidor",
                detalhes: erro.sqlMessage || erro.message
            });
        });
}

module.exports = {
    registrar,
    ultima,
    media,
    gabarito,
    top3,
    ranking,
    distribuicao,
    estatisticasUsuario,
    historico
};