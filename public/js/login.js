/*função de login*/
function entrar() {
    aguardar();

    var emailVar = inp_login.value;
    var senhaVar = inp_senha.value;

    if (emailVar == "" || senhaVar == "") {
        cardErro.style.display = "block"
        mensagem_erro.innerHTML = "(Não esqueça de preencher nenhum campo)";
        finalizarAguardar();
        return false;
    }
    else {
        setInterval(sumirMensagem, 5000)
    }

    console.log("FORM LOGIN: ", emailVar);
    console.log("FORM SENHA: ", senhaVar);

    fetch("/usuarios/autenticar", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            emailServer: emailVar,
            senhaServer: senhaVar
        })
    }).then(function (resposta) {
        console.log("ESTOU NO THEN DO entrar()!")
        
        if (resposta.ok) {
            console.log(resposta);

            resposta.json().then(json => {
                console.log(json);
                console.log(JSON.stringify(json));
                
                // ✅ CORREÇÃO: Salvar dados no sessionStorage
                sessionStorage.EMAIL_USUARIO = json.email;
                sessionStorage.NOME_USUARIO = json.nome;
                sessionStorage.ID_USUARIO = json.idUsuario;

                console.log("Dados salvos no sessionStorage:");
                console.log("ID_USUARIO:", sessionStorage.ID_USUARIO);
                console.log("NOME_USUARIO:", sessionStorage.NOME_USUARIO);
                console.log("EMAIL_USUARIO:", sessionStorage.EMAIL_USUARIO);

                setTimeout(function () {
                    window.location = "dashboard.html"; // ✅ Mudar para dashboard
                }, 1000);

            });

        } else {

            console.log("Houve um erro ao tentar realizar o login!");

            resposta.text().then(texto => {
                console.error(texto);
                finalizarAguardar(texto);
            });
        }

    }).catch(function (erro) {
        console.log(erro);
    })

    return false;
}

function sumirMensagem() {
    cardErro.style.display = "none"
}