function obterRanking() {
    console.log("entrou no model: obtendo ranking");

    var instrucao = `
        SELECT u.Nome AS nome, MAX(p.Pontuacao) AS melhor
        FROM Usuario u
        JOIN Partida p ON p.FkUsuario = u.IdUsuario
        GROUP BY u.IdUsuario
        ORDER BY melhor DESC
    `;

    return database.executar(instrucao);
}