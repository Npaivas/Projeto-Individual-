function carregarDashboard() {
    validarSessao();
    
    let idUsuario = sessionStorage.ID_USUARIO;

    if (!idUsuario) {
        alert("Faça login primeiro!");
        window.location = "login.html";
        return;
    }

    fetch(`/partidas/ultima/${idUsuario}`)
        .then(r => r.json())
        .then(d => {
            if (d.length > 0) {
                document.getElementById("kpi_ultima_partida").innerHTML = 
                    `${d[0].Pontuacao}`;
            }
        });

    fetch("/partidas/media")
        .then(r => r.json())
        .then(d => {
            let media = d[0].media || 0;
            document.getElementById("kpi_media_geral").innerHTML = 
                `${Number(media).toFixed(1)}`;
        });

    fetch("/partidas/gabarito/5")
        .then(r => r.json())
        .then(d => {
            document.getElementById("kpi_gabaritaram").innerHTML = 
                `${Number(d[0].porcentagem).toFixed(0)}%`;
        });

    fetch("/partidas/top3")
        .then(r => r.json())
        .then(top => {
            let html = "";
            top.forEach((jogador, index) => {
                const medalhas = ["1°", "2°", "3°"];
                html += `<div class="pessoa">${medalhas[index]} ${jogador.nome} - ${jogador.melhor} pts</div>`;
            });
            document.getElementById("top3_div").innerHTML = html;
        });

    fetch("/partidas/distribuicao")
        .then(r => r.json())
        .then(d => {
            new Chart(document.getElementById("graficoDistribuicao"), {
                type: "bar",
                data: {
                    labels: ["0-5 pontos", "6-8 pontos", "9-10 pontos"],
                    datasets: [{
                        label: "Quantidade de Jogadores",
                        data: [d[0].faixa_0_5, d[0].faixa_6_8, d[0].faixa_9_10]
                    }]
                }
            });
        });

    fetch("/partidas/ranking")
        .then(r => r.json())
        .then(lista => {
            const top10 = lista.slice(0, 10);
            new Chart(document.getElementById("graficoRanking"), {
                type: "bar",
                data: {
                    labels: top10.map(l => l.nome),
                    datasets: [{
                        label: "Melhor Pontuação",
                        data: top10.map(l => l.melhor)
                    }]
                },
                options: { 
                    indexAxis: "y",
                    scales: {
                        x: {
                            max: 10
                        }
                    }
                }
            });
        });
}