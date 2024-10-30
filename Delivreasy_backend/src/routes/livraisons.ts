import express,{ Request, Response, Router,NextFunction  } from "express";
var cookieParser = require('cookie-parser')
import { query } from "../db";
import {Connect,adminConnect} from '../Function/jwt.utils';
var cookies = require('js-cookie')
import { Utilisateur } from "../models/Utilisateur"
var bodyParser  = require('body-parser');
const livraisonsrouteur = Router();

livraisonsrouteur.use(bodyParser.urlencoded({ extended: true }));
livraisonsrouteur.use(bodyParser.json());

livraisonsrouteur.use(express.json());
livraisonsrouteur.use(cookieParser());

// get all livraisons
livraisonsrouteur.get('/all',Connect,adminConnect, async (req: Request, res: Response) => {
  try {
  const clients = await query('SELECT * FROM livraisons')

  res.status(201).json(clients);
  } catch (error) {
  console.error('Erreur :', error);
  res.status(500).json({ error: 'Erreur serveur' });
}});

// delete une livraisons
livraisonsrouteur.delete('/',Connect,adminConnect, async (req: Request, res: Response) => {
  const Livraison_ID         = req.body.Livraison_ID 
  console.log('req.body ',req.body)
try {
  const DeleteClient = await query(' DELETE FROM livraisons WHERE Livraison_ID = ? ; ',[Livraison_ID]);
  res.status(201).json({
    'Utilisateur_ID': "User : "+Livraison_ID +" Deleted"});
} catch (error) {
console.error('Erreur :', error);
res.status(500).json({ error: 'Erreur serveur'});
}});

// update un livraisons
livraisonsrouteur.put('/',Connect,adminConnect, async (req: Request, res: Response) => {
  const Livraison_ID             = req.body.Livraison_ID 
  const Livraison_Adresse        = req.body.Livraison_Adresse
  const Livraison_Etape          = req.body.Livraison_Etape
  const Livraison_Signature      = req.body.Livraison_Signature
  const Livraison_Commentaire_   = req.body.Livraison_Commentaire_
  const Livraison_Arrive         = req.body.Livraison_Arrive
  const Tournee_ID               = req.body.Tournee_ID

try{
  const updatelivraisons = await query('UPDATE livraisons SET Livraison_ID = ?,Livraison_Adresse = ?, Livraison_ID= ?',[Livraison_ID,Livraison_Adresse,Livraison_Etape]);
  res.status(201).json({'Utilisateur_ID': "User : "+Livraison_Adresse+" is update"});
} catch (error) {
  console.error('Erreur :', error);
  res.status(500).json({ error: error });
}});

// cree une livraison
livraisonsrouteur.post('/',Connect,adminConnect,async (req: Request, res: Response) => { 
try{ 
  const Livraison_ID             = req.body.Livraison_ID 
  const Livraison_Adresse        = req.body.Livraison_Adresse
  const Livraison_Etape          = req.body.Livraison_Etape
  const Livraison_Commentaire_   = req.body.Livraison_Commentaire_
  const Livraison_Arrive         = req.body.Livraison_Arrive
  const Tournee_ID               = req.body.Tournee_ID
  console.log('req.body ',req.body)
  const NewClient = await query('INSERT INTO livraisons (Livraison_ID, Livraison_Adresse,Livraison_Etape,Livraison_Commentaire_,Livraison_Arrive,Tournee_ID) VALUES (?,?,?,?,?,?)',[Livraison_ID,Livraison_Adresse,Livraison_Etape,Livraison_Commentaire_,Livraison_Arrive,Tournee_ID])
  res.status(201).json({'Message': "Compte client crée"});
} catch (error) {
  console.error('Erreur :', error);
  res.status(500).json({ error: error });
}});


export default livraisonsrouteur;