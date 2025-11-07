    DROP DATABASE IF EXISTS individual;
CREATE DATABASE individual;
USE individual;

CREATE TABLE usuario(
idUsuario INT PRIMARY KEY AUTO_INCREMENT,
nome VARCHAR(45),
email VARCHAR(45) UNIQUE,
senha VARCHAR(45)
);

SELECT * FROM usuario;