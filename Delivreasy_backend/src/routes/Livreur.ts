import express,{ Request, Response, Router } from "express";
var cookieParser = require('cookie-parser')
import { query } from "../db";
import {Connect,adminConnect,GETuserID} from '../Function/jwt.utils';


const livreurRouteur = Router();
livreurRouteur.use(express.json());
livreurRouteur.use(cookieParser());

livreurRouteur.post('/', async (req: Request, res: Response) => {
  try {
    const Utilisateur_ID  = req.body.Utilisateur_ID 	
    console.log("body",req.body)
    const Tournee = await query('SELECT tournee.Tournee_ID, livraisons.Livraison_ID,objets.Objet_ID ,Objet_Desciption,Livraison_Adresse,Livraison_Etape,Livraison_Commentaire_,Livraison_Arrive,Tournee_Jour FROM objets join livraisons on objets.Livraison_ID = livraisons.Livraison_ID  join tournee on tournee.Tournee_ID = livraisons.Tournee_ID join utilisateurs on utilisateurs.Utilisateur_ID = tournee.Utilisateur_ID where utilisateurs.Utilisateur_ID = ? ',[1])

    console.log(Tournee)
  res.status(201).json(Tournee);
  } catch (error) {
  console.error('Erreur :', error);
  res.status(500).json({ error: 'Erreur serveur' });
}});


livreurRouteur.post('/date', async (req: Request, res: Response) => {
  try {
    const Utilisateur_ID  = req.body.Utilisateur_ID 	
    const date = req.body.date 	
    console.log("body",req.body)
    const Tournee = await query('SELECT tournee.Tournee_ID, Tournee_Jour FROM tournee  where tournee.Tournee_Jour = ? ',['2024-11-25'])

    console.log(Tournee)
  res.status(201).json(Tournee);
  } catch (error) {
  console.error('Erreur :', error);
  res.status(500).json({ error: 'Erreur serveur' });
}});


livreurRouteur.post('/Livraisons', async (req: Request, res: Response) => {
  try {
    const Utilisateur_ID  = req.body.Utilisateur_ID 	
    const Tournee_Jour = req.body.Tournee_Jour 	
    console.log("body",req.body)
    const Tournee = await query('SELECT tournee.Tournee_ID,Livraison_ID,Livraison_Adresse, Livraison_Commentaire_ ,Livraison_Arrive from livraisons join tournee on tournee.Tournee_ID = livraisons.Tournee_ID join utilisateurs on utilisateurs.Utilisateur_ID = tournee.Utilisateur_ID where utilisateurs.Utilisateur_ID = ? AND tournee.Tournee_Jour = ? ',[Utilisateur_ID,Tournee_Jour])
    console.log(Tournee)
  res.status(201).json(Tournee);
  } catch (error) {
  console.error('Erreur :', error);
  res.status(500).json({ error: 'Erreur serveur' });
}});



livreurRouteur.post('/Objet', async (req: Request, res: Response) => {
  try {
    const  Livraison_ID 	  = req.body. Livraison_ID 	 	
    console.log("body",req.body)
    const Tournee = await query('SELECT * from objets  where  Livraison_ID 	= ? ',[Livraison_ID ])

    console.log(Tournee)
  res.status(201).json(Tournee);
  } catch (error) {
  console.error('Erreur :', error);
  res.status(500).json({ error: 'Erreur serveur' });
}});



export default livreurRouteur;

