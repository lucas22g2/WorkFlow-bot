create database clube_do_livro;
use clube_do_livro;
create table livro(
id_livro int not null,
nome_livro varchar(100)not null,
autoria varchar(100) not null,
editoria varchar(100) not null,
categoria varchar(100) not null,
preço varchar(100) not null,

primary key (id_livro)
);

create table estoque(
id_livro int not null,
qtd_estoque int not null,
primary key (id_livro)
);
