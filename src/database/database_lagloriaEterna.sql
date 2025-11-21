drop database if exists La_Gloria_Eterna;
create database La_Gloria_Eterna;
use La_Gloria_Eterna;

create table usuario (
idusuario int primary key auto_increment,
nome varchar(45) not null,
email varchar(45) not null unique,
senha varchar(45) not null
);

create table quiz (
idquiz int primary key auto_increment,
nomequiz varchar(45) not null
);

create table partida (
idpartida int primary key auto_increment,
pontuacao int not null,
tmptotal int,
dtpartida datetime default current_timestamp,
fkusuario int not null,
fkquiz int not null,
constraint fk_partida_usuario
	foreign key (fkusuario) 
		references usuario(idusuario),
    constraint fk_partida_quiz
        foreign key (fkquiz) 
			references quiz(idquiz)
);