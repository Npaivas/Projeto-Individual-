var database = require("../database/config");

// Registrar uma nova partida
function registrarPartida(fkUsuario, fkQuiz, pontuacao, tempo) {
    var instrucao = `
        INSERT INTO partida (fkusuario, fkquiz, pontuacao, tmptotal, dtpartida)
        VALUES (${fkUsuario}, ${fkQuiz}, ${pontuacao}, ${tempo}, NOW());
    `;
    return database.executar(instrucao);
}

// Buscar a última partida do usuário
function ultimaPartida(idUsuario) {
    var instrucao = `
        SELECT pontuacao as Pontuacao, tmptotal as TmpTotal, dtpartida as DtPartida
        FROM partida
        WHERE fkusuario = ${idUsuario}
        ORDER BY idpartida DESC
        LIMIT 1;
    `;
    return database.executar(instrucao);
}

// Média geral de pontuações
function mediaPontuacao() {
    var instrucao = `
        SELECT AVG(pontuacao) AS media
        FROM partida;
    `;
    return database.executar(instrucao);
}

// Porcentagem de jogadores que gabaritaram
function gabaritaram(total) {
    var instrucao = `
        SELECT 
            (SELECT COUNT(*) FROM partida WHERE pontuacao = ${total}) /
            (SELECT COUNT(*) FROM partida) * 100 AS porcentagem;
    `;
    return database.executar(instrucao);
}

// Top 3 jogadores com melhor pontuação
function top3() {
    var instrucao = `
        SELECT u.nome AS nome, MAX(p.pontuacao) AS melhor
        FROM usuario u
        JOIN partida p ON p.fkusuario = u.idusuario
        GROUP BY u.idusuario
        ORDER BY melhor DESC
        LIMIT 3;
    `;
    return database.executar(instrucao);
}

// Ranking completo (melhor pontuação por usuário)
function ranking() {
    var instrucao = `
        SELECT u.nome AS nome, MAX(p.pontuacao) AS melhor
        FROM usuario u
        JOIN partida p ON p.fkusuario = u.idusuario
        GROUP BY u.idusuario
        ORDER BY melhor DESC;
    `;
    return database.executar(instrucao);
}

// Distribuição de pontuações para o gráfico
function distribuicao() {
    var instrucao = `
        SELECT
            (SELECT COUNT(*) FROM partida WHERE pontuacao <= 5) AS faixa_0_5,
            (SELECT COUNT(*) FROM partida WHERE pontuacao BETWEEN 6 AND 8) AS faixa_6_8,
            (SELECT COUNT(*) FROM partida WHERE pontuacao BETWEEN 9 AND 10) AS faixa_9_10;
    `;
    return database.executar(instrucao);
}

module.exports = {
    registrarPartida,
    ultimaPartida,
    mediaPontuacao,
    gabaritaram,
    top3,
    ranking,
    distribuicao
};