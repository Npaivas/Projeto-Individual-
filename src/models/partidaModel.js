var database = require("../database/config");

function registrarPartida(fkUsuario, fkQuiz, pontuacao, tempo) {
  console.log("entrou no model: registrando partida");

  var instrucao = `
    INSERT INTO Partida (FkUsuario, FkQuiz, Pontuacao, Tempo)
    VALUES (${fkUsuario}, ${fkQuiz}, ${pontuacao}, ${tempo});
`;

  return database.executar(instrucao);
}

function obterUltimaPartida(idUsuario) {
  var instrucao = `
        SELECT 
            p.IdPartida AS id,
            p.Pontuacao AS pontuacao,
            p.Tempo AS tempo,
            p.DataHora AS dataHora,
            q.Titulo AS quiz
        FROM Partida p
        JOIN Quiz q ON p.FkQuiz = q.IdQuiz
        WHERE p.FkUsuario = ${idUsuario}
        ORDER BY p.DataHora DESC;
    `;

  return database.executar(instrucao);
}

function obterMediaGeral() {

  var instrucao = `
        SELECT 
            ROUND(AVG(Pontuacao), 2) AS media_pontuacao,
            ROUND(AVG(Tempo), 2) AS media_tempo,
            COUNT(IdPartida) AS total_partidas,
            COUNT(DISTINCT FkUsuario) AS total_usuarios
        FROM Partida;
    `;

  return database.executar(instrucao);
}

function obterGabaritaram(total) {

  var instrucao = `
        SELECT 
        COUNT(DISTINCT FkUsuario) AS total_gabaritaram
        FROM Partida 
        WHERE Pontuacao >= ${total};
    `;

  return database.executar(instrucao);
}

function obterTop3() {

  var instrucao = `
        SELECT 
            u.Nome AS nome,
            MAX(p.Pontuacao) AS melhor_pontuacao,
            MIN(p.Tempo) AS melhor_tempo
        FROM Usuario u
        JOIN Partida p ON p.FkUsuario = u.IdUsuario
        GROUP BY u.IdUsuario, u.Nome
        ORDER BY melhor_pontuacao DESC, melhor_tempo ASC;
    `;

  return database.executar(instrucao);
}

function obterRanking() {

  var instrucao = `
    SELECT 
        u.Nome AS nome,
        MAX(p.Pontuacao) AS melhor_pontuacao,
        COUNT(p.IdPartida) AS total_partidas
    FROM Usuario u
    JOIN Partida p ON p.FkUsuario = u.IdUsuario
    GROUP BY u.IdUsuario, u.Nome
    ORDER BY melhor_pontuacao DESC;
`;

  return database.executar(instrucao);
}

function obterDistribuicao() {
  console.log("entrou no model: obtendo distribuição");

  var instrucao = `
        SELECT 
            CASE 
                WHEN Pontuacao >= 90 THEN '90-100'
                WHEN Pontuacao >= 80 THEN '80-89'
                WHEN Pontuacao >= 70 THEN '70-79'
                WHEN Pontuacao >= 60 THEN '60-69'
                WHEN Pontuacao >= 50 THEN '50-59'
                ELSE '0-49'
            END AS faixa_pontuacao,
            COUNT(*) AS quantidade
        FROM Partida
        GROUP BY faixa_pontuacao
        ORDER BY faixa_pontuacao DESC;
    `;

  return database.executar(instrucao);
}

function obterEstatisticasUsuario(idUsuario) {
  console.log("entrou no model: obtendo estatísticas do usuário");

  var instrucao = `
        SELECT 
            u.Nome AS nome,
            COUNT(p.IdPartida) AS total_partidas,
            MAX(p.Pontuacao) AS melhor_pontuacao,
            ROUND(AVG(p.Pontuacao), 2) AS media_pontuacao,
            MIN(p.Tempo) AS melhor_tempo,
            ROUND(AVG(p.Tempo), 2) AS media_tempo,
            MAX(p.DataHora) AS ultima_partida
        FROM Usuario u
        LEFT JOIN Partida p ON p.FkUsuario = u.IdUsuario
        WHERE u.IdUsuario = ${idUsuario}
        GROUP BY u.IdUsuario, u.Nome;
    `;

  return database.executar(instrucao);
}

function obterHistoricoUsuario(idUsuario, limite = 10) {
  console.log("entrou no model: obtendo histórico do usuário");

var instrucao = `
    SELECT 
        p.IdPartida AS id,
        p.Pontuacao AS pontuacao,
        p.Tempo AS tempo,
        p.DataHora AS dataHora,
        q.Titulo AS quiz
    FROM Partida p
    JOIN Quiz q ON p.FkQuiz = q.IdQuiz
    WHERE p.FkUsuario = ${idUsuario}
    ORDER BY p.DataHora DESC;
`;

  return database.executar(instrucao);
}

module.exports = {
  registrarPartida,
  obterUltimaPartida,
  obterMediaGeral,
  obterGabaritaram,
  obterTop3,
  obterRanking,
  obterDistribuicao,
  obterEstatisticasUsuario,
  obterHistoricoUsuario,
};
