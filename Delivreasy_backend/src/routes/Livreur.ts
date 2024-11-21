import express,{ Request, Response, Router,NextFunction  } from "express";
var cookieParser = require('cookie-parser')
import { query } from "../db";
import {Connect,adminConnect,GETuserID} from '../Function/jwt.utils';
var cookies = require('js-cookie')
var bodyParser  = require('body-parser');
const LivreurRouteur = Router();

LivreurRouteur.use(bodyParser.urlencoded({ extended: true }));
LivreurRouteur.use(bodyParser.json());

LivreurRouteur.use(express.json());
LivreurRouteur.use(cookieParser());

// get all livraisons
LivreurRouteur.get('/all',Connect, async (req: Request, res: Response) => {
  try {
  const clients = await query('SELECT * FROM livraisons')

  res.status(201).json(clients);
  } catch (error) {
  console.error('Erreur :', error);
  res.status(500).json({ error: 'Erreur serveur' });
}});


// update un livraisons
LivreurRouteur.put('/',Connect, async (req: Request, res: Response) => {
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



// get all livraisons
LivreurRouteur.get('/:userid',Connect, async (req: Request, res: Response) => {
    try {
    const userId = req.body.userId 
    const MesLivraison = await query('SELECT * FROM livraisons')

    res.status(201).json(MesLivraison);
    } catch (error) {
    console.error('Erreur :', error);
    res.status(500).json({ error: 'Erreur serveur' });
  }});
  

export default LivreurRouteur;