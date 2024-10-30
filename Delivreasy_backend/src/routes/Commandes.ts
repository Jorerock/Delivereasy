import express,{ Request, Response, Router,NextFunction  } from "express";
var cookieParser = require('cookie-parser')
import { query } from "../db";
import {Connect,adminConnect} from '../Function/jwt.utils';
var cookies = require('js-cookie')
import { Utilisateur } from "../models/Utilisateur"
var bodyParser  = require('body-parser');
const Commandesrouteur = Router();

Commandesrouteur.use(bodyParser.urlencoded({ extended: true }));
Commandesrouteur.use(bodyParser.json());

Commandesrouteur.use(express.json());
Commandesrouteur.use(cookieParser());

// get all
Commandesrouteur.get('/all',Connect,adminConnect, async (req: Request, res: Response) => {
  try {
  const clients = await query('SELECT * FROM commandes')

  res.status(201).json(clients);
  } catch (error) {
  console.error('Erreur :', error);
  res.status(500).json({ error: 'Erreur serveur' });
}});

// delete
Commandesrouteur.delete('/',Connect,adminConnect, async (req: Request, res: Response) => {
  const Commande_ID_Commande         = req.body.Commande_ID_Commande 
  console.log('req.body ',req.body)
try {
  const DeleteClient = await query(' DELETE FROM commandes WHERE Commande_ID_Commande = ? ; ',[Commande_ID_Commande]);
  res.status(201).json({
    'Utilisateur_ID': "User : "+Commande_ID_Commande +" Deleted"});
} catch (error) {
console.error('Erreur :', error);
res.status(500).json({ error: 'Erreur serveur'});
}});

// update un user
Commandesrouteur.put('/',Connect,adminConnect, async (req: Request, res: Response) => {
  const Commande_ID_Commande         = req.body.Commande_ID_Commande 
  const Client_ID_Client     = req.body.Client_ID_Client
  const Livraison_ID  = req.body.Livraison_ID
try{
  const updateClient = await query('UPDATE commandes SET Commande_ID_Commande = ?,Client_ID_Client = ?, Livraison_ID= ?',[Commande_ID_Commande,Client_ID_Client,Livraison_ID]);
  res.status(201).json({'Utilisateur_ID': "User : "+Client_ID_Client+" is update"});
} catch (error) {
  console.error('Erreur :', error);
  res.status(500).json({ error: error });
}});

// cree un user
Commandesrouteur.post('/',Connect,adminConnect,async (req: Request, res: Response) => { 
try{ 
    const Commande_ID_Commande         = req.body.Commande_ID_Commande 
    const Client_ID_Client     = req.body.Client_ID_Client
    const Livraison_ID  = req.body.Livraison_ID
    console.log('req.body ',req.body)
  const NewClient = await query('INSERT INTO commandes (Commande_ID_Commande, Client_ID_Client,Livraison_ID) VALUES (?,?,?)',[Commande_ID_Commande,Client_ID_Client,Livraison_ID])
  res.status(201).json({'Message': "Compte client crée"});
} catch (error) {
  console.error('Erreur :', error);
  res.status(500).json({ error: error });
}});


export default Commandesrouteur;