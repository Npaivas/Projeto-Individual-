drop database if exists La_Gloria_Eterna;
create database La_Gloria_Eterna;
use La_Gloria_Eterna;

create table usuario (
idusuario int primary key auto_increment,
nome varchar(45),
email varchar(45) unique,
senha varchar(45)
);

select * from usuario;


create table quiz (
idquiz int primary key auto_increment,
nomequiz varchar(45)
);
INSERT INTO quiz (nomequiz) VALUES 
('Quiz Libertadores');

select * from quiz;


create table partida (
idpartida int primary key auto_increment,
pontuacao int,
tmptotal int,
dtpartida datetime default current_timestamp,
fkusuario int,
fkquiz int,
constraint fk_partida_usuario
	foreign key (fkusuario) 
		references usuario(idusuario),
    constraint fk_partida_quiz
        foreign key (fkquiz) 
			references quiz(idquiz)
);
