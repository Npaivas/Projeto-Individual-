function cadastrar() {
    // aguardar();

    //Recupere o valor da nova input pelo nome do id
    // Agora vá para o método fetch logo abaixo
    var nomeVar = inp_nome.value;
    var emailVar = inp_email.value;
    var senhaVar = inp_senha.value;
    var confrmSenhaVar =  inp_confrmSenha.value;
    var emailFormatado = emailVar.trim().toLowerCase()    
    // Verificando se há algum campo em branco
    if (
        nomeVar == "" ||
        emailFormatado == "" ||
        senhaVar == "" ||
        confrmSenhaVar == ""
    ) {
        alert("Preencha todos os campos corretamente");
      // finalizarAguardar();
        return false;
    } else if(!emailFormatado.includes('@') ||!emailFormatado.includes('.') ){
        alert("Email/senha incoretos")
        return false;
    } else if(confrmSenhaVar != senhaVar){ 
            alert("confirme a senha corretamente")
            return false;
    }
     else {
        setInterval(sumirMensagem, 5000);
    }



    // Enviando o valor da nova input
    fetch("/usuarios/cadastrar", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            nomeServer: nomeVar,
            emailServer: emailFormatado,
            senhaServer: senhaVar,
        }),
    })
        .then(function (resposta) {
            console.log("resposta: ", resposta);

            if (resposta.ok) {
                div_aguardar.style.display = "block";

                mensagem_erro.innerHTML =
                    alert("Cadastro realizado com sucesso! Redirecionando para tela de Login...");

                setTimeout(() => {
                    window.location = "login.html";
                }, "2000");

          //       finalizarAguardar();
            } else {
                throw "Houve um erro ao tentar realizar o cadastro!";
            }
        })
        .catch(function (resposta) {
            console.log(`#ERRO: ${resposta}`);
     //    finalizarAguardar();
        });

    return;
}

function sumirMensagem() {
    div_aguardar.style.display = "none"
}
