create database main_hub;

drop table if exists user;

create table main_hub.user
(id integer auto_increment primary key,
username varchar(30) unique not null,
password_hash varchar(255) not null,
email varchar(255) unique not null,
created_dt datetime not null
);