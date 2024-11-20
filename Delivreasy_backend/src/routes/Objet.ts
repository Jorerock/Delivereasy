import express,{ Request, Response, Router,NextFunction  } from "express";
var cookieParser = require('cookie-parser')
import { query } from "../db";
import {Connect,adminConnect} from '../Function/jwt.utils';
var cookies = require('js-cookie')
import { Utilisateur } from "../models/Utilisateur"
var bodyParser  = require('body-parser');
const objetsrouteur = Router();

objetsrouteur.use(bodyParser.urlencoded({ extended: true }));
objetsrouteur.use(bodyParser.json());

objetsrouteur.use(express.json());
objetsrouteur.use(cookieParser());

// get all objets
objetsrouteur.get('/all',Connect,adminConnect, async (req: Request, res: Response) => {
  try {
  const clients = await query('SELECT * FROM objets')

  res.status(201).json(clients);
  } catch (error) {
  console.error('Erreur :', error);
  res.status(500).json({ error: 'Erreur serveur' });
}});

// delete une objets
objetsrouteur.delete('/',Connect,adminConnect, async (req: Request, res: Response) => {
  const Objet_ID         = req.body.Objet_ID 
  console.log('req.body ',req.body)
try {
  const DeleteClient = await query(' DELETE FROM objets WHERE Objet_ID = ? ; ',[Objet_ID]);
  res.status(201).json({
    'Utilisateur_ID': "Objet : "+Objet_ID +" Deleted"});
} catch (error) {
console.error('Erreur :', error);
res.status(500).json({ error: 'Erreur serveur'});
}});

// update un objets
objetsrouteur.put('/',Connect,adminConnect, async (req: Request, res: Response) => {
  const Objet_ID             = req.body.Objet_ID 
  const Objet_Desciption        = req.body.Objet_Desciption
  const Livraison_Etape          = req.body.Livraison_Etape
  const Client_ID_Client = req.body.Client_ID_Client
  const Livraison_ID  = req.body.Livraison_ID
  console.log('put req.body :',req.body)

try{
                                  'UPDATE utilisateurs SET Utilisateur_Email = ? ,Utilisateur_Nom=?,Utilisateur_Prenom=?, Utilisateur_Admin = ?  WHERE Utilisateur_ID = ?'
  const updateobjets = await query('UPDATE objets SET Objet_Desciption =? ,Client_ID_Client=?,Livraison_ID=? WHERE Objet_ID = ?',[Objet_Desciption,Client_ID_Client,Livraison_ID,Objet_ID]);
  res.status(201).json({'Utilisateur_ID': "User : "+Objet_Desciption+" is update"});
} catch (error) {
  console.error('Erreur :', error);
  res.status(500).json({ error: error });
}});

// cree un objet
objetsrouteur.post('/',Connect,adminConnect,async (req: Request, res: Response) => { 
try{   
    
    const Objet_Desciption        = req.body.Objet_Desciption
    const Client_ID_Client        = req.body.Client_ID_Client
    const Livraison_Etape          = req.body.Livraison_Etape
  console.log('req.body ',req.body)
  const NewClient = await query('INSERT INTO objets (Objet_Desciption,Client_ID_Client) VALUES (?,?)',[Objet_Desciption,Client_ID_Client])
  res.status(201).json({'Message': "Compte client crée"});
} catch (error) {
  console.error('Erreur :', error);
  res.status(500).json({ error: error });
}});


export default objetsrouteur;