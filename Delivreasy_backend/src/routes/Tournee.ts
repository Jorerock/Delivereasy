import express,{ Request, Response, Router,NextFunction  } from "express";
var cookieParser = require('cookie-parser')
import { query } from "../db";
import {Connect,adminConnect,GETuserID} from '../Function/jwt.utils';
var cookies = require('js-cookie')
import { Utilisateur } from "../models/Utilisateur"
var bodyParser  = require('body-parser');
const Tourneesrouteur = Router();

Tourneesrouteur.use(bodyParser.urlencoded({ extended: true }));
Tourneesrouteur.use(bodyParser.json());

Tourneesrouteur.use(express.json());
Tourneesrouteur.use(cookieParser());

// get all objets
Tourneesrouteur.get('/all',Connect,adminConnect, async (req: Request, res: Response) => {
  try {
  const Tournee = await query('SELECT * FROM objets')

  res.status(201).json(Tournee);
  } catch (error) {
  console.error('Erreur :', error);
  res.status(500).json({ error: 'Erreur serveur' });
}});

// delete une objets
Tourneesrouteur.delete('/',Connect,adminConnect, async (req: Request, res: Response) => {
  const Tournee_ID         = req.body.Tournee_ID 
  console.log('req.body ',req.body)
try {
  const DeleteTournee = await query(' DELETE FROM objets WHERE Tournee_ID = ? ; ',[Tournee_ID]);
  res.status(201).json({
    'Utilisateur_ID': "Objet : "+Tournee_ID +" Deleted"});
} catch (error) {
console.error('Erreur :', error);
res.status(500).json({ error: 'Erreur serveur'});
}});

// update un objets
Tourneesrouteur.put('/',Connect,adminConnect, async (req: Request, res: Response) => {
  const Tournee_ID             = req.body.Tournee_ID 
  const Tournee_Jour        = req.body.Tournee_Jour
  const Utilisateur_ID          = req.body.Utilisateur_ID

try{
  const UpdateTournee = await query('UPDATE objets SET Tournee_ID = ?,Tournee_Jour = ?, Utilisateur_ID= ?',[Tournee_ID,Tournee_Jour,Utilisateur_ID]);
  res.status(201).json({'Utilisateur_ID': "User : "+UpdateTournee+" is update"});
} catch (error) {
  console.error('Erreur :', error);
  res.status(500).json({ error: error });
}});

// cree une livraison
Tourneesrouteur.post('/',Connect,adminConnect,async (req: Request, res: Response) => { 
try{   
    const Tournee_ID             = req.body.Tournee_ID 
    const Tournee_Jour        = req.body.Tournee_Jour
    const Utilisateur_ID          = req.body.Utilisateur_ID 	 	 	
  console.log('req.body ',req.body)
  const NewTournee = await query('INSERT INTO objets (Tournee_ID, Tournee_Jour,Utilisateur_ID) VALUES (?,?,?)',[Tournee_ID,Tournee_Jour,Utilisateur_ID])
  res.status(201).json({'Message': "Compte client crée"});
} catch (error) {
  console.error('Erreur :', error);
  res.status(500).json({ error: error });
}});


Tourneesrouteur.post('/Mine',Connect,adminConnect, async (req: Request, res: Response) => {
  try {
    // const Utilisateur_ID  = req.body.Utilisateur_ID 	
    const Utilisateur_ID  = GETuserID(req)
  const Tournee = await query('SELECT * FROM objets where Utilisateur_ID = ? ',[Utilisateur_ID])

  res.status(201).json(Tournee);
  } catch (error) {
  console.error('Erreur :', error);
  res.status(500).json({ error: 'Erreur serveur' });
}});



export default Tourneesrouteur;