function cadastrar() {
    var nome = inp_nome.value
    var DtNasc = inp_dtNasc.value;
    var email = inp_email.value;
    var senha = inp_senha.value;

    var tamanhoNome = nome.length;
    var emailFormatado = email.trim().toLowerCase()

    if(nome = isNaN){
        alert("não existe nome com número");
    }
    if (tamanhoNome <= 2) {
        alert("Preencha seu Nome corretamente");
        inp_nome.value = "";
        inp_nome.focus();
    }
    if (DtNasc == "") {
        alert("Preencha sua data de nascimento corretamente");
        inp_DtNasc.value = "";
        inp_DtNasc.focus();
    }
    if (emailFormatado == "") {
        alert("Preencha seu email corretamente");
        inp_email.value = "";
        inp_email.focus();
    }
    if (senha == "") {
        alert("Preencha sua senha corretamente");
        inp_senha.value = "";
        inp_senha.focus();
    }

    
}