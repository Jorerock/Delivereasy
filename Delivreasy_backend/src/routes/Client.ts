import express,{ Request, Response, Router,NextFunction  } from "express";
var cookieParser = require('cookie-parser')
import { query } from "../db";
import {Connect,adminConnect} from '../Function/jwt.utils';
var cookies = require('js-cookie')
import { Utilisateur } from "../models/Utilisateur"
var bodyParser  = require('body-parser');
const Clientrouteur = Router();

Clientrouteur.use(bodyParser.urlencoded({ extended: true }));
Clientrouteur.use(bodyParser.json());

Clientrouteur.use(express.json());
Clientrouteur.use(cookieParser());

Clientrouteur.get('/all',Connect,adminConnect, async (req: Request, res: Response) => {
  try {
  const clients = await query('SELECT * FROM clients')
  // console.log("Request All Client: " , clients)

  res.status(201).json(clients);
  } catch (error) {
  console.error('Erreur :', error);
  res.status(500).json({ error: 'Erreur serveur' });
}});

// Clientrouteur.get('/:User_ID',Connect,adminConnect,async (req: Request, res: Response) => {
//   const User_ID = parseInt(req.params.List_ID, 10);
//   try {
//   const users = await query('SELECT Utilisateur_ID,Utilisateur_Nom,Utilisateur_Prenom,Utilisateur_Admin,Utilisateur_Email FROM utilisateurs where Utilisateur_ID= ?',[User_ID])
//   res.status(201).json(users);
//   } catch (error) {
//   console.error('Erreur :', error);
//   res.status(500).json({ error: 'Erreur serveur' });
// }});

// delete user
Clientrouteur.delete('/',Connect,adminConnect, async (req: Request, res: Response) => {
  const Client_ID_Client         = req.body.Client_ID_Client 
  console.log('req.body ',req.body)
try {
  const DeleteClient = await query(' DELETE FROM clients WHERE Client_ID_Client = ? ; ',[Client_ID_Client]);
  res.status(201).json({
    'Utilisateur_ID': "User : "+Client_ID_Client +" Deleted"});
} catch (error) {
console.error('Erreur :', error);
res.status(500).json({ error: 'Erreur serveur'});
}});

// update un user
Clientrouteur.put('/', async (req: Request, res: Response) => {
  const Client_ID_Client         = req.body.Client_ID_Client 
  const Client_Email     = req.body.Client_Email
  const Client_AdresseFacturation  = req.body.Client_AdresseFacturation
  const Client_Prenom        = req.body.Client_Prenom
  const Client_nom    = req.body.Client_nom

try{
  console.log("body :",req.body)
  const updateClient = await query('UPDATE clients SET Client_Email = ?,Client_AdresseFacturation = ?, Utilisateur_Prenom= ? ,Utilisateur_Nom = ?,  WHERE Utilisateur_ID = ?',[Client_Email,Client_AdresseFacturation,Client_Prenom,Client_nom,Client_ID_Client]);
  res.status(201).json({'Utilisateur_ID': "User : "+Client_ID_Client+" is update"});
} catch (error) {
  console.error('Erreur :', error);
  res.status(500).json({ error: error });
}});

// cree un user
Clientrouteur.post('/',Connect,adminConnect,async (req: Request, res: Response) => { 
try{ 
   const Client_Email     = req.body.Client_Email
    const Client_AdresseFacturation  = req.body.Client_AdresseFacturation
    const Client_nom    = req.body.Client_nom
    const Client_Prenom        = req.body.Client_Prenom
  console.log('req.body ',req.body)
  const NewClient = await query('INSERT INTO clients (Utilisateur_Email, Client_AdresseFacturation,Utilisateur_Nom,Utilisateur_Prenom,Utilisateur_Admin) VALUES (?,?,?,?)',[Client_Email,Client_AdresseFacturation,Client_nom,Client_Prenom])
  res.status(201).json({'Message': "Compte client crée"});
} catch (error) {
  console.error('Erreur :', error);
  res.status(500).json({ error: error });
}});

export default Clientrouteur;