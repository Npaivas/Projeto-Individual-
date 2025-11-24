function carregarDashboard() {
    validarSessao();
    
    let idUsuario = sessionStorage.ID_USUARIO;

    if (!idUsuario) {
        alert("Faça login primeiro!");
        window.location = "login.html";
        return;
    }

    aguardar();

    fetch(`/partidas/ultima/${idUsuario}`)
        .then(resposta => resposta.json())
        .then(dados => {
            let pontuacao = 0;
            if (dados.length > 0) {
                pontuacao = dados[0].pontuacao || dados[0].Pontuacao || 0;
            }
            document.getElementById("kpi_ultima_partida").innerHTML = pontuacao;
        })
        .catch(erro => {
            console.error("Erro última partida:", erro);
            document.getElementById("kpi_ultima_partida").innerHTML = "0";
        });

    // Média geral
    fetch("/partidas/media")
        .then(resposta => resposta.json())
        .then(dados => {
            let media = 0;
            if (dados.length > 0) {
                media = dados[0].media || dados[0].media_pontuacao || 0;
            }
            document.getElementById("kpi_media_geral").innerHTML = Number(media).toFixed(1);
        })
        .catch(erro => {
            console.error("Erro média geral:", erro);
            document.getElementById("kpi_media_geral").innerHTML = "0.0";
        });

    // Gabaritaram
    fetch("/partidas/gabarito?total=10")
        .then(resposta => resposta.json())
        .then(dados => {
            let total = 0;
            if (dados.length > 0) {
                total = dados[0].total_gabaritaram || dados[0].total || 0;
            }
            document.getElementById("kpi_gabaritaram").innerHTML = total;
        })
        .catch(erro => {
            console.error("Erro gabaritaram:", erro);
            document.getElementById("kpi_gabaritaram").innerHTML = "0";
        });

    // Top 3
    fetch("/partidas/top3")
        .then(resposta => resposta.json())
        .then(dados => {
            if (dados.length > 0) {
                dados.forEach((jogador, index) => {
                    const nome = jogador.nome || "Jogador";
                    const pontos = jogador.melhor_pontuacao || jogador.pontuacao || 0;
                    html += `<div class="pessoa">${medalhas[index]} ${nome} - ${pontos} pts</div>`;
                });
            } else {
                html = "<div class='pessoa'>Nenhum dado disponível</div>";
            }
            document.getElementById("top3_div").innerHTML = html;
        })
        .catch(erro => {
            console.error("Erro top3:", erro);
            document.getElementById("top3_div").innerHTML = "<div class='pessoa'>Erro ao carregar</div>";
        });

    // Distribuição
    fetch("/partidas/distribuicao")
        .then(resposta => resposta.json())
        .then(dados => {
            if (dados.length > 0) {
                const labels = dados.map(item => item.faixa_pontuacao);
                const valores = dados.map(item => item.quantidade);
                
                new Chart(document.getElementById("graficoDistribuicao"), {
                    type: "bar",
                    data: {
                        labels: labels,
                        datasets: [{
                            label: "Quantidade de Partidas",
                            data: valores,
                            backgroundColor: ["#ff6b6b", "#ffd93d", "#6bcf7f"]
                        }]
                    }
                });
            }
        })
        .catch(erro => {
            console.error("Erro distribuição:", erro);
        });

    // Ranking
    fetch("/partidas/ranking")
        .then(resposta => resposta.json())
        .then(dados => {
            if (dados.length > 0) {
                const top10 = dados.slice(0, 10);
                
                new Chart(document.getElementById("graficoRanking"), {
                    type: "bar",
                    data: {
                        labels: top10.map(item => item.nome),
                        datasets: [{
                            label: "Melhor Pontuação",
                            data: top10.map(item => item.melhor_pontuacao),
                            backgroundColor: "#4d79ff"
                        }]
                    },
                    options: { 
                        indexAxis: "y"
                    }
                });
            }
        })
        .catch(erro => {
            console.error("Erro ranking:", erro);
        });

    setTimeout(() => {
        finalizarAguardar();
    }, 1000);
}