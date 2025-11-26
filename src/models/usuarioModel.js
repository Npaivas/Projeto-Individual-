var database = require("../database/config")

function autenticar(email, senha) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ", email, senha)
    var instrucaoSql = `
        SELECT idusuario as idUsuario, nome, email FROM usuario WHERE email = '${email}' AND senha = '${senha}';
    `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql);
}

function cadastrar(nome, email, senha) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():", nome, email, senha);
    
    var instrucaoVerificar = `
        SELECT idusuario FROM usuario WHERE email = '${email}';
    `;
    
    console.log("Verificando se usuário existe: \n" + instrucaoVerificar);
    
    return database.executar(instrucaoVerificar)
        .then(resultado => {
            if (resultado.length > 0) {
                throw new Error("Usuário já cadastrado com este email!");
            }
            
            var instrucaoSql = `
                INSERT INTO usuario (nome, email, senha) VALUES ('${nome}', '${email}', '${senha}');
            `;
            console.log("Executando a instrução SQL: \n" + instrucaoSql);
            return database.executar(instrucaoSql);
        });
}

module.exports = {
    autenticar,
    cadastrar
};
