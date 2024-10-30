import express,{ Request, Response, Router,NextFunction  } from "express";
var cookieParser = require('cookie-parser')
import { query } from "../db";
import {Connect,adminConnect,GETuserID} from '../Function/jwt.utils';
var cookies = require('js-cookie')
import { Utilisateur } from "../models/Utilisateur"
var bodyParser  = require('body-parser');
const Adminrouteur = Router();

Adminrouteur.use(bodyParser.urlencoded({ extended: true }));
Adminrouteur.use(bodyParser.json());

Adminrouteur.use(express.json());
Adminrouteur.use(cookieParser());

Adminrouteur.get('/users/all',Connect,adminConnect, async (req: Request, res: Response) => {
  
  const token =cookies.get("token")
  try {
  const users = await query('SELECT Utilisateur_ID,Utilisateur_Nom,Utilisateur_Prenom,Utilisateur_Admin,Utilisateur_Email FROM utilisateurs')
  res.status(201).json(users);
  } catch (error) {
  console.error('Erreur :', error);
  res.status(500).json({ error: 'Erreur serveur' });
}});

Adminrouteur.get('/users/:User_ID',Connect,adminConnect,async (req: Request, res: Response) => {
  const User_ID = parseInt(req.params.List_ID, 10);
  try {
  const users = await query('SELECT Utilisateur_ID,Utilisateur_Nom,Utilisateur_Prenom,Utilisateur_Admin,Utilisateur_Email FROM utilisateurs where Utilisateur_ID= ?',[User_ID])
  res.status(201).json(users);
  } catch (error) {
  console.error('Erreur :', error);
  res.status(500).json({ error: 'Erreur serveur' });
}});

// delete user
Adminrouteur.delete('/users',Connect,adminConnect, async (req: Request, res: Response) => {
  const Utilisateur_ID        = req.body.Utilisateur_ID
  console.log('req.body ',req.body)
try {
  const Todos = await query(' DELETE FROM Utilisateurs WHERE Utilisateur_ID= ? ; ',[Utilisateur_ID]);
  res.status(201).json({
    'Utilisateur_ID': "User : "+Utilisateur_ID+" Deleted"});
} catch (error) {
console.error('Erreur :', error);
res.status(500).json({ error: 'Erreur serveur'});
}});

// update un user
Adminrouteur.put('/users',Connect,adminConnect, async (req: Request, res: Response) => {
  const Utilisateur_ID        = req.body.Utilisateur_ID
  const Utilisateur_Email     = req.body.Utilisateur_Email
  const Utilisateur_Password  = req.body.Utilisateur_Password
  const Utilisateur_Nom       = req.body.Utilisateur_Nom
  const Utilisateur_Prenom    = req.body.Utilisateur_Prenom
  const Utilisateur_Admin     = req.body.Utilisateur_Admin
try{
  const Todos = await query('UPDATE utilisateurs SET Utilisateur_Email = ?,Utilisateur_Password = ?, Utilisateur_Nom = ? ,Utilisateur_Prenom= ? ,Utilisateur_Admin = ?,  WHERE Utilisateur_ID = ?',[Utilisateur_Email,Utilisateur_Password,Utilisateur_Nom,Utilisateur_Prenom,Utilisateur_Admin,Utilisateur_ID]);
  res.status(201).json({'Utilisateur_ID': "User : "+Utilisateur_ID+" is update"});
} catch (error) {
  console.error('Erreur :', error);
  res.status(500).json({ error: error });
}});

// cree un user
Adminrouteur.post('/users',Connect,adminConnect,async (req: Request, res: Response) => { 
try{
  const Utilisateur_Nom    :string    = req.body.Utilisateur_Nom
  const Utilisateur_Prenom  :string   = req.body.Utilisateur_Prenom
  const Utilisateur_Admin  :boolean   = req.body.Utilisateur_Admin
  const  Utilisateur_Email :string  = req.body.Utilisateur_Email;
  const  Utilisateur_Password:string = req.body.Utilisateur_Password;
  console.log('req.body ',req.body)

  const NewUser = await query('INSERT INTO utilisateurs (Utilisateur_Email, Utilisateur_Password,Utilisateur_Nom,Utilisateur_Prenom,Utilisateur_Admin) VALUES (?,?,?,?,?)',[Utilisateur_Email,Utilisateur_Password,Utilisateur_Nom,Utilisateur_Prenom,Utilisateur_Admin])
  res.status(201).json({'Message': "Compte crée"});
} catch (error) {
  console.error('Erreur :', error);
  res.status(500).json({ error: error });
}});


export default Adminrouteur;