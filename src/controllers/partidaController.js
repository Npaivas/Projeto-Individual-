var partidaModel = require("../models/partidaModel");

function registrar(req, res) {
    var fkUsuario = req.body.fkUsuario;
    var fkQuiz = req.body.fkQuiz;
    var pontuacao = req.body.pontuacao;
    var tempo = req.body.tempo;

    partidaModel.registrarPartida(fkUsuario, fkQuiz, pontuacao, tempo)
        .then(resultado => res.status(200).json(resultado))
        .catch(erro => {
            console.log("Erro ao registrar partida:", erro);
            res.status(500).json(erro.sqlMessage);
        });
}

function ultima(req, res) {
    var idUsuario = req.params.idUsuario;

    partidaModel.ultimaPartida(idUsuario)
        .then(resultado => res.status(200).json(resultado))
        .catch(erro => {
            console.log("Erro ao buscar última partida:", erro);
            res.status(500).json(erro.sqlMessage);
        });
}

function media(req, res) {
    partidaModel.mediaPontuacao()
        .then(resultado => res.status(200).json(resultado))
        .catch(erro => {
            console.log("Erro média geral:", erro);
            res.status(500).json(erro.sqlMessage);
        });
}

function gabarito(req, res) {
    var total = req.params.total;

    partidaModel.gabaritaram(total)
        .then(resultado => res.status(200).json(resultado))
        .catch(erro => {
            console.log("Erro gabarito:", erro);
            res.status(500).json(erro.sqlMessage);
        });
}

function top3(req, res) {
    partidaModel.top3()
        .then(resultado => res.status(200).json(resultado))
        .catch(erro => {
            console.log("Erro top3:", erro);
            res.status(500).json(erro.sqlMessage);
        });
}

function ranking(req, res) {
    partidaModel.ranking()
        .then(resultado => res.status(200).json(resultado))
        .catch(erro => {
            console.log("Erro ranking:", erro);
            res.status(500).json(erro.sqlMessage);
        });
}

function distribuicao(req, res) {
    partidaModel.distribuicao()
        .then(resultado => res.status(200).json(resultado))
        .catch(erro => {
            console.log("Erro distribuição:", erro);
            res.status(500).json(erro.sqlMessage);
        });
}

module.exports = {
    registrar,
    ultima,
    media,
    gabarito,
    top3,
    ranking,
    distribuicao
};