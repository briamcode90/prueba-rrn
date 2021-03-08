-- se crea la bd demo_node y se corre el siguiente script

create schema demo;

create table demo.tusuario
(
   id_usuario serial not null,
   nombres varchar(150) not null,
   apellidos varchar(150) not null,
   dni varchar(8) not null,
   email varchar(50),
   flag_activo boolean default true not null,
   fecha_creacion timestamp without time zone,
   fecha_modificacion timestamp without time zone,
   primary key (id_usuario),
   unique (dni)
);
