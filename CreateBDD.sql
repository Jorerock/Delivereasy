CREATE TABLE Utilisateurs(
   Utilisateur_ID INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
   Utilisateur_Nom VARCHAR(50),
   Utilisateur_Prenom VARCHAR(50),
   Utilisateur_Admin BOOLEAN,
   Utilisateur_Password VARCHAR(50),
   Utilisateur_Email VARCHAR(50),
   UNIQUE(Utilisateur_Email)
);

CREATE TABLE Clients(
   Client_ID_Client INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
   Client_Email VARCHAR(50),
   Client_AdresseFacturation VARCHAR(150),
   Client_Prenom VARCHAR(50),
   Client_Nom VARCHAR(50),
   UNIQUE(Client_Email)

);

CREATE TABLE Tournee(
   Tournee_ID INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
   Tournee_Jour VARCHAR(50),
   Utilisateur_ID INT NOT NULL,
   FOREIGN KEY(Utilisateur_ID) REFERENCES Utilisateurs(Utilisateur_ID)
);

CREATE TABLE Livraisons(
   Livraison_ID INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
   Livraison_Adresse VARCHAR(50),
   Livraison_Etape INT,
   Livraison_Signature BLOB,
   Livraison_Commentaire_ VARCHAR(50),
   Livraison_Arrive VARCHAR(50),
   Tournee_ID VARCHAR(50) NOT NULL,
   FOREIGN KEY(Tournee_ID) REFERENCES Tournee(Tournee_ID)
);

CREATE TABLE Commandes(
   Commande_ID_Commande INT PRIMARY KEY NOT NULL AUTO_INCREMENT,

   Client_ID_Client INT NOT NULL,
   Livraison_ID INT NOT NULL,
   FOREIGN KEY(Client_ID_Client) REFERENCES Clients(Client_ID_Client),
   FOREIGN KEY(Livraison_ID) REFERENCES Livraisons(Livraison_ID)
);

CREATE TABLE Objets(
   Objet_ID INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
   Objet_Desciption VARCHAR(150),
   Client_ID_Client INT NOT NULL,
   Livraison_ID INT NOT NULL,
   FOREIGN KEY(Client_ID_Client) REFERENCES Clients(Client_ID_Client),
   FOREIGN KEY(Livraison_ID) REFERENCES Livraisons(Livraison_ID)
);

