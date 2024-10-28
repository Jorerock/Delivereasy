import express,{ Request, Response, Router,NextFunction  } from "express";
var cookieParser = require('cookie-parser')
import { query } from "../db";

import {getUserId,adminConnect} from '../Function/jwt.utils';

var cookies = require('js-cookie')
import { Utilisateur } from "../models/Utilisateur"

const Adminrouteur = Router();
Adminrouteur.use(express.json());
Adminrouteur.use(cookieParser());

Adminrouteur.get('/users/all',getUserId,adminConnect, async (req: Request, res: Response) => {
  const token =cookies.get("token")
  try {
  const users = await query('SELECT Utilisateur_ID,Utilisateur_Nom,Utilisateur_Prenom,Utilisateur_Admin,Utilisateur_Email FROM utilisateurs')
  res.status(201).json(users);
  } catch (error) {
  console.error('Erreur :', error);
  res.status(500).json({ error: 'Erreur serveur' });
}});

Adminrouteur.get('/users/:User_ID', async (req: Request, res: Response) => {
  const User_ID = parseInt(req.params.List_ID, 10);
  try {
  const users = await query('SELECT Utilisateur_ID,Utilisateur_Nom,Utilisateur_Prenom,Utilisateur_Admin,Utilisateur_Email FROM utilisateurs where Utilisateur_ID= ?',[User_ID])
  res.status(201).json(users);
  } catch (error) {
  console.error('Erreur :', error);
  res.status(500).json({ error: 'Erreur serveur' });
}});

Adminrouteur.delete('/users/:User_ID', async (req: Request, res: Response) => {
  const User_ID = parseInt(req.params.List_ID, 10);
try {
  const Todos = await query(' DELETE FROM Utilisateurs WHERE Utilisateur_ID= ? ; ',[User_ID]);
  res.status(201).json({
    'Utilisateur_ID': "User : "+User_ID+" Deleted"});
} catch (error) {
console.error('Erreur :', error);
res.status(500).json({ error: 'Erreur serveur'});
}});

Adminrouteur.post('/users/:User_ID', async (req: Request, res: Response) => {
  const User_ID = parseInt(req.params.List_ID, 10);
  const Utilisateur_ID        = req.params.Utilisateur_ID
  const Utilisateur_Email     = req.params.Utilisateur_Email
  const Utilisateur_Password  = req.params.Utilisateur_Password
  const Utilisateur_Nom       = req.params.Utilisateur_Nom
  const Utilisateur_Prenom    = req.params.Utilisateur_Prenom
  const Utilisateur_Admin     = req.params.Utilisateur_Admin
try{
  const Todos = await query('UPDATE utilisateurs SET Utilisateur_Email = ?,Utilisateur_Password = ?, Utilisateur_Nom = ? ,Utilisateur_Prenom= ? ,Utilisateur_Admin = ?,  WHERE Utilisateur_ID = ?',[Utilisateur_Email,Utilisateur_Password,Utilisateur_Nom,Utilisateur_Prenom,Utilisateur_Admin,Utilisateur_ID]);
  res.status(201).json({'Utilisateur_ID': "User : "+Utilisateur_ID+" is update"});
} catch (error) {
  console.error('Erreur :', error);
  res.status(500).json({ error: 'Erreur serveur' });
}});

Adminrouteur.put('/users', async (req: Request, res: Response) => { const User_ID = parseInt(req.params.List_ID, 10);
  const Utilisateur_Email     = req.params.Utilisateur_Email
  const Utilisateur_Password  = req.params.Utilisateur_Password
  const Utilisateur_Nom       = req.params.Utilisateur_Nom
  const Utilisateur_Prenom    = req.params.Utilisateur_Prenom
  const Utilisateur_Admin     = req.params.Utilisateur_Admin
try{
  const Todos = await query(' INSERT INTO utilisateurs (Utilisateur_Email, Utilisateur_Password,Utilisateur_Nom,Utilisateur_Prenom,Utilisateur_Admin) VALUES (?,?,?,?,?)',[Utilisateur_Email,Utilisateur_Password,Utilisateur_Nom,Utilisateur_Prenom,Utilisateur_Admin])
  res.status(201).json({'Message': "Compte crée"});
} catch (error) {
  console.error('Erreur :', error);
  res.status(500).json({ error: 'Erreur serveur' });
}});

export default Adminrouteur;


  
  