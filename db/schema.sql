-- Create the database connactivities and specified it for use.
create database if not exists connactivities;

use connactivities;

create table if not exists Users (
	user_id int not null auto_increment,
    username varchar(15),
    password varchar(15),
    email varchar(30),
    primary key (user_id)
);

create table if not exists Posts (
    post_id int not null auto_increment,
    user_id int not null,
    description text,
    address text,
    time date,
    partner_id int,
    primary key (post_id),
    foreign key (user_id) references Users (user_id)
);


