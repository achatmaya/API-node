DROP database IF EXISTS AIRBOOK;
CREATE database IF NOT EXISTS AIRBOOK;
use AIRBOOK;
CREATE TABLE IF NOT EXISTS USER
 (
   ID_USER INTEGER(6) NOT NULL AUTO_INCREMENT ,
   CIVILITE VARCHAR(15) NULL  ,
   NOM VARCHAR(50) NULL  ,
   PRENOM VARCHAR(50) NULL  ,
   ADRESSE VARCHAR(100) NULL  ,
   CODEPOSTAL CHAR(5) NULL  ,
   VILLE VARCHAR(50) NULL  ,
   TEL VARCHAR(20) NULL  ,
   EMAIL VARCHAR(128) NULL  ,
   NBRESERVATION INTEGER(2) NULL  ,
   MOT_PASSE VARCHAR(30) NULL  
   , PRIMARY KEY (ID_USER) 
 ) ;

 CREATE TABLE IF NOT EXISTS AUTEUR
 (
   ID_AUTEUR INTEGER(6) NOT NULL AUTO_INCREMENT  ,
   CIVILITE VARCHAR(15) NULL  ,
   NOM VARCHAR(50) NULL  ,
   PRENOM VARCHAR(50) NULL  ,
   ADRESSE VARCHAR(100) NULL  ,
   CODEPOSTAL CHAR(5) NULL  ,
   VILLE VARCHAR(50) NULL  ,
   TEL VARCHAR(20) NULL  ,
   EMAIL VARCHAR(128) NULL  ,
   MOT_PASSE VARCHAR(30) NULL  
   , PRIMARY KEY (ID_AUTEUR) 
 ) 
 comment = "";

 CREATE TABLE IF NOT EXISTS TYPE_LIVRE
 (
   ID_TYPE INTEGER(6) NOT NULL AUTO_INCREMENT ,
   LIBELLE_T INTEGER(6) NOT NULL  ,
   DESCRIP text NULL  ,
   PRIMARY KEY (ID_TYPE) ) ;

 CREATE TABLE IF NOT EXISTS EDITION
 (
   ID_EDITION INTEGER(6) NOT NULL AUTO_INCREMENT ,
   LIBELLE INTEGER(6) NOT NULL  ,
   PRIMARY KEY (ID_EDITION) ) 
 comment = "";

 CREATE TABLE IF NOT EXISTS LIVRE
 (
   ID_LIVRE INTEGER(6) NOT NULL AUTO_INCREMENT ,
   NOM VARCHAR(50) NOT NULL  ,
   RESUME text NOT NULL,
   DATE_SORTIE DATE NOT NULL,
   PRIMARY KEY (ID_LIVRE) ) 
 comment = "";

CREATE TABLE IF NOT EXISTS LIVRES_TYPEL (
    ID_LIVRE INTEGER(6),
    ID_TYPE INTEGER(6),
    FOREIGN KEY (ID_LIVRE) REFERENCES LIVRE(ID_LIVRE),
    FOREIGN KEY (ID_TYPE) REFERENCES TYPE_LIVRE(ID_TYPE)
);
CREATE TABLE IF NOT EXISTS LIVRE_AUTEURS (
    ID_LIVRE INTEGER(6),
    ID_AUTEUR INTEGER(6),
    FOREIGN KEY (ID_LIVRE) REFERENCES LIVRE(ID_LIVRE),
    FOREIGN KEY (ID_AUTEUR) REFERENCES AUTEUR(ID_AUTEUR)
);
 CREATE TABLE IF NOT EXISTS EXEMPLAIRE
 (
   ID_EXEMP INTEGER(6) NOT NULL AUTO_INCREMENT ,
   ID_LIVRE INTEGER(6),
   ID_EDITION INTEGER(6),
   NOM VARCHAR(50) NOT NULL ,
   RESUME text NOT NULL,
   PRIX_J Decimal(10,2),
   DATE_SORTIE DATE NOT NULL,
   PRIMARY KEY (ID_EXEMP),
   FOREIGN KEY (ID_EDITION) REFERENCES EDITION(ID_EDITION),
   FOREIGN KEY (ID_LIVRE) REFERENCES LIVRE(ID_LIVRE)
    ) 
 comment = "";

CREATE TABLE IF NOT EXISTS RESERVATION
 (
   IDR INTEGER(6) NOT NULL AUTO_INCREMENT ,
   ID_EXEMP INTEGER(6) NULL  ,
   ID_USER INTEGER(6) NOT NULL  ,
   ETAT VARCHAR(20) NULL  ,
   DATERESERVATION DATE NULL  ,
   DATEDEBUT DATE NULL  ,
   DATEFIN DATE NULL  ,
   MONTANT FLOAT(10,2),
   PRIMARY KEY (IDR) ,
   FOREIGN key (ID_EXEMP) REFERENCES EXEMPLAIRE(ID_EXEMP),
   FOREIGN key (ID_USER) REFERENCES USER(ID_USER)
 ) 
 comment = "";


CREATE TABLE IF NOT EXISTS ArchiveReservations
As select * from RESERVATION where 2 = 0;

#------- pour que quand on insert dans reservation on va inserer dans archiveReservation toutes les reservations ayant un état términé
Drop  trigger if exists inserArchivRes;
delimiter //
CREATE trigger inserArchivRes
after insert on RESERVATION
for each row
 begin
	if new.ETAT  = 1
	then
		insert into ArchiveReservations select * from RESERVATION;
	end if;
end//
delimiter ; 

#------- pour que quand on insert dans reservation on calcule le montant de la reservation

Drop  trigger if exists calculMontantRes;
delimiter //
CREATE trigger calculMontantRes
before insert on RESERVATION
for each row
 begin
	declare PRIX float;
	select PRIX into PRIX from EXEMPLAIRE where ID_EXEMP = new.ID_EXEMP;
	set new.MONTANT = (datediff(new.DATEFIN,new.DATEDEBUT)*PRIX);

end//
delimiter ;

#------- pour que quand on supprime dans reservation on vérifie si l'état est # de terminee on affiche impossible sinon on insère la ligne supprimée dans archiveReservation
Drop  trigger if exists supprimerRes;
delimiter //
CREATE trigger supprimerRes 
before delete on reservation
for each row
 begin
	declare nb int;
	if old.ETAT != 1
	then
		SIGNAL SQLState '42000'
		Set message_text  = 'impossible, vous ne pouvez pas supprimer une réservation non terminée' ;
	else 
		select count(IDR) into nb from ArchiveReservations where IDR = old.IDR; #-- je vérifie d'abord si cette reservation n'existe pas dans archivereservations
		if nb = 0
		then
			insert into ArchiveReservations select * from RESERVATION where IDR = old.IDR;
		end if;
	end if;
end//
delimiter ; 

#------- pour que quand on modéfie une reservation on vérifie si l'état est = terminee on l'insère dans la table archiveReservation
Drop  trigger if exists MODIF_RES;
delimiter //
CREATE trigger MODIF_RES 
after update on RESERVATION
for each row
 begin
	if new.etat = 1
	then
		insert into ArchiveReservations values
		(new.IDR, new.ID_EXEMP,new.ID_USER,new.ETAT,new.DATERESERVATION,new.DATEDEBUT,new.DATEFIN,new.MONTANT);
	end if;
end//
delimiter ; 

#------- pour incrémenter nbReservation de la table locataire à chaque insertion d'une reservation terminée
Drop  trigger if exists INC_NB_RESER_USER;
delimiter //
CREATE trigger INC_NB_RESER_USER
after insert on RESERVATION
for each row
 begin
	if new.ETAT = 1
	then
		update USER set NBRESERVATION = (NBRESERVATION + 1) WHERE new.ID_USER = ID_USER;
	end if;
end//
delimiter ; 




 
 
