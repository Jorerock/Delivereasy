-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3306
-- Généré le : sam. 23 nov. 2024 à 16:25
-- Version du serveur : 8.3.0
-- Version de PHP : 8.2.18

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `delivreasy`
--

-- --------------------------------------------------------

--
-- Structure de la table `clients`
--

DROP TABLE IF EXISTS `clients`;
CREATE TABLE IF NOT EXISTS `clients` (
  `Client_ID_Client` int NOT NULL AUTO_INCREMENT,
  `Client_Email` varchar(50) DEFAULT NULL,
  `Client_AdresseFacturation` varchar(150) DEFAULT NULL,
  `Client_Prenom` varchar(50) DEFAULT NULL,
  `Client_Nom` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`Client_ID_Client`),
  UNIQUE KEY `Client_Email` (`Client_Email`)
) ENGINE=MyISAM AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Structure de la table `livraisons`
--

DROP TABLE IF EXISTS `livraisons`;
CREATE TABLE IF NOT EXISTS `livraisons` (
  `Livraison_ID` int NOT NULL AUTO_INCREMENT,
  `Livraison_Adresse` varchar(50) DEFAULT NULL,
  `Livraison_Etape` int DEFAULT NULL,
  `Livraison_Signature` varchar(250) DEFAULT NULL,
  `Livraison_Commentaire_` varchar(50) DEFAULT NULL,
  `Livraison_Arrive` tinyint DEFAULT NULL,
  `Tournee_ID` varchar(50) NOT NULL,
  PRIMARY KEY (`Livraison_ID`),
  KEY `Tournee_ID` (`Tournee_ID`)
) ENGINE=MyISAM AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `livraisons`
--

INSERT INTO `livraisons` (`Livraison_ID`, `Livraison_Adresse`, `Livraison_Etape`, `Livraison_Signature`, `Livraison_Commentaire_`, `Livraison_Arrive`, `Tournee_ID`) VALUES
(3, '123 rue esicad', 1, NULL, 'Batiment B', 0, '1'),
(4, '456 rue esicad', 1, NULL, 'Batiment B', 0, '1');

-- --------------------------------------------------------

--
-- Structure de la table `objets`
--

DROP TABLE IF EXISTS `objets`;
CREATE TABLE IF NOT EXISTS `objets` (
  `Objet_ID` int NOT NULL AUTO_INCREMENT,
  `Objet_Desciption` varchar(150) DEFAULT NULL,
  `Client_ID_Client` int NOT NULL,
  `Livraison_ID` int NOT NULL,
  PRIMARY KEY (`Objet_ID`),
  KEY `Client_ID_Client` (`Client_ID_Client`),
  KEY `Livraison_ID` (`Livraison_ID`)
) ENGINE=MyISAM AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Structure de la table `tournee`
--

DROP TABLE IF EXISTS `tournee`;
CREATE TABLE IF NOT EXISTS `tournee` (
  `Tournee_ID` int NOT NULL AUTO_INCREMENT,
  `Tournee_Jour` date DEFAULT NULL,
  `Utilisateur_ID` int NOT NULL,
  PRIMARY KEY (`Tournee_ID`),
  KEY `Utilisateur_ID` (`Utilisateur_ID`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Structure de la table `utilisateurs`
--

DROP TABLE IF EXISTS `utilisateurs`;
CREATE TABLE IF NOT EXISTS `utilisateurs` (
  `Utilisateur_ID` int NOT NULL AUTO_INCREMENT,
  `Utilisateur_Nom` varchar(50) DEFAULT NULL,
  `Utilisateur_Prenom` varchar(50) DEFAULT NULL,
  `Utilisateur_Admin` tinyint(1) DEFAULT NULL,
  `Utilisateur_Password` varchar(50) DEFAULT NULL,
  `Utilisateur_Email` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`Utilisateur_ID`),
  UNIQUE KEY `Utilisateur_Email` (`Utilisateur_Email`)
) ENGINE=MyISAM AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
