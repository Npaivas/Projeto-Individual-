// Quando a página carrega
window.onload = () => {
    carregarDashboard();
};

function carregarDashboard() {

    let idUsuario = sessionStorage.ID_USUARIO;

    if (!idUsuario) {
        console.error("Usuário não logado!");
        return;
    }

// puxando ultima partida
    fetch(`/partidas/ultima/${idUsuario}`)
        .then(r => r.json())
        .then(dados => {
            if (dados.length > 0) {
                document.querySelector("#kpi_ultima_partida").innerHTML =
                    `${dados[0].Pontuacao}/10`;
            } else {
                document.querySelector("#kpi_ultima_partida").innerHTML = "—";
            }
        })
        .catch(err => console.log("Erro última partida:", err));
// puxando media total
    fetch("/partidas/media")
        .then(r => r.json())
        .then(dados => {
            document.querySelector("#kpi_media_geral").innerHTML =
                Number(dados[0].media).toFixed(1);
        })
        .catch(err => console.log("Erro média geral:", err));

 // puxando qtd de gabaritos
    fetch("/partidas/gabarito/10")
        .then(r => r.json())
        .then(dados => {
            document.querySelector("#kpi_gabaritaram").innerHTML =
                Number(dados[0].porcentagem).toFixed(0) + "%";
        })
        .catch(err => console.log("Erro gabaritaram:", err));

// top 3
    fetch("/partidas/top3")
        .then(r => r.json())
        .then(lista => {
            const div = document.querySelector("#top3_div");
            div.innerHTML = "";

            lista.forEach(p => {
                div.innerHTML += `
                    <div class="top-item">
                        <span>${p.nome}</span>
                        <strong>${p.melhor}</strong>
                    </div>
                `;
            });
        })
        .catch(err => console.log("Erro top3:", err));

// rank
    fetch("/partidas/ranking")
        .then(r => r.json())
        .then(lista => {
            gerarGraficoRanking(lista);
        })
        .catch(err => console.log("Erro ranking:", err));

// pontuação
    fetch("/partidas/distribuicao")
        .then(r => r.json())
        .then(dados => {
            gerarGraficoDistribuicao(dados[0]);
        })
        .catch(err => console.log("Erro distribuição:", err));
}

// grafico 1
function gerarGraficoDistribuicao(dist) {
    const ctx = document.getElementById("graficoDistribuicao");

    new Chart(ctx, {
        type: "bar",
        data: {
            labels: ["0-5", "6-8", "9-10"],
            datasets: [{
                label: "Quantidade de Jogadores",
                data: [dist.faixa_0_5, dist.faixa_6_8, dist.faixa_9_10],
                backgroundColor: ["#ff4d4d", "#ffd11a", "#4dff4d"]
            }]
        }
    });
}

// grafico 2
function gerarGraficoRanking(lista) {

    const nomes = lista.map(e => e.nome);
    const valores = lista.map(e => e.melhor);

    const ctx = document.getElementById("graficoRanking");

    new Chart(ctx, {
        type: "bar",
        data: {
            labels: nomes,
            datasets: [{
                label: "Pontuação Máxima",
                data: valores,
                backgroundColor: "#4d79ff"
            }]
        },
        options: {
            indexAxis: 'y'
        }
    });
}
