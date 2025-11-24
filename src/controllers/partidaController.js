var partidaModel = require("../models/partidaModel");

function registrar(req, res) {
    var { fkUsuario, fkQuiz, pontuacao, tempo } = req.body;

    if (!fkUsuario || !fkQuiz || pontuacao === undefined || tempo === undefined) {
        return res.status(400).json({});
    }

    if (isNaN(pontuacao) || isNaN(tempo) || pontuacao < 0 || tempo < 0) {
        return res.status(400).json({});
    }

    partidaModel.registrarPartida(fkUsuario, fkQuiz, pontuacao, tempo)
        .then(resultado => res.status(200).json(resultado))
        .catch(erro => {
            console.log("Erro ao registrar partida:", erro);
            res.status(500).json(erro.sqlMessage);
        });
}

function ultima(req, res) {
    var idUsuario = req.params.idUsuario;

    if (!idUsuario || isNaN(idUsuario)) {
        return res.status(400).json({});
    }

    partidaModel.ultimaPartida(idUsuario)
        .then(resultado => resultado.length > 0 ? res.json(resultado) : res.status(204).send())
        .catch(erro => {
            console.log("Erro ao buscar última partida:", erro);
            res.status(500).json(erro.sqlMessage);
        });
}

function media(req, res) {
    partidaModel.mediaPontuacao()
        .then(resultado => res.json(resultado))
        .catch(erro => {
            console.log("Erro média geral:", erro);
            res.status(500).json(erro.sqlMessage);
        });
}

function gabarito(req, res) {
    var total = req.query.total;

    if (!total || isNaN(total) || total <= 0) {
        return res.status(400).json({});
    }

    partidaModel.gabaritaram(total)
        .then(resultado => res.json(resultado))
        .catch(erro => {
            console.log("Erro gabarito:", erro);
            res.status(500).json(erro.sqlMessage);
        });
}

function top3(req, res) {
    partidaModel.top3()
        .then(resultado => res.json(resultado))
        .catch(erro => {
            console.log("Erro top3:", erro);
            res.status(500).json(erro.sqlMessage);
        });
}

function ranking(req, res) {
    partidaModel.ranking()
        .then(resultado => res.json(resultado))
        .catch(erro => {
            console.log("Erro ranking:", erro);
            res.status(500).json(erro.sqlMessage);
        });
}

function distribuicao(req, res) {
    partidaModel.distribuicao()
        .then(resultado => res.json(resultado))
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