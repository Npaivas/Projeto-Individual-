DROP DATABASE IF EXISTS individual;
CREATE DATABASE individual;
USE individual;

CREATE TABLE usuario(
idUsuario INT PRIMARY KEY AUTO_INCREMENT,
nome VARCHAR(45) NOT NULL,
email VARCHAR(45) UNIQUE,
senha VARCHAR(45) NOT NULL
);

SELECT * FROM usuario;

CREATE TABLE quiz (
    idQuiz int PRIMARY KEY AUTO_INCREMENT,
    pergunta text,
    opcaoA varchar(10),
    opcaoB varchar(10),
    opcaoC varchar(10),
    opcaoD varchar(10),
    resposta varchar(1)
    );
    
CREATE TABLE respostaQuiz (
    id INT,
    fkUsuario INT NOT NULL,
    fkPergunta INT NOT NULL,
    respostaEscolhida VARCHAR(1),
    respostaCorreta boolean,
    constraint pkComposta primary key(id,fkUsuario,fkPergunta),
    FOREIGN KEY (fkUsuario) REFERENCES usuario(idUsuario),
    FOREIGN KEY (fkPergunta) REFERENCES quiz(idQuiz)
);