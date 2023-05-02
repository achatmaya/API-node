Create database if not exists API;


use API;

Create table if not exists Users (
id int(4) not null auto_increment,
username varchar(50) not null,
role varchar(20) not null ,
email varchar(40) not null,
password varchar(100) not null,
Adresse varchar(100),
primary key (id)

);

Create table if not exists Products (
id int(4) not null auto_increment,
name varchar(100) not null,
price Decimal(10,2),
UserID int(4) not null,
primary key (id),
foreign key (UserID) references Users(id)
);
insert into Products(name, price, UserID) values ('BubleTea', '20', 1);
Drop  trigger if exists dropProduits;

--- create trigger delete on product----
delimiter //
CREATE trigger dropProduits 
before delete on Users
for each row
 begin
	delete from Products where UserID = old.id;
end//
delimiter ;
--- create trigger after Update Password on product----
drop trigger if exists updateStatusConnexion
delimiter //
CREATE trigger updateStatusConnexion 
before update on Users
for each row
 begin
	if old.alredyConnect = 1
    then
    update Users set new.alredyConnect = 2 where id = old.id
    end if;
end//
delimiter ; 

--- alter table Users
alter table Users 
    add alredyConnect int(1) Default 1;
