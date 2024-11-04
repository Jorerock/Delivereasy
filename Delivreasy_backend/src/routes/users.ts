import express,{ Request, Response, Router } from "express";
var cookieParser = require('cookie-parser')
import { query } from "../db";
import {Connect,adminConnect,GETuserID} from '../Function/jwt.utils';


const userRouter = Router();
userRouter.use(express.json());
userRouter.use(cookieParser());

userRouter.get('/',Connect, async (req: Request, res: Response) => {
  try {
    // const Utilisateur_ID  = req.body.Utilisateur_ID 	
    const Utilisateur_ID  = GETuserID(req)
  const Tournee = await query('SELECT livraisons.Livraison_ID ,Objet_Desciption,Livraison_Adresse,Livraison_Etape,Livraison_Commentaire_,Livraison_Arrive,Tournee_Jour FROM objets join commandes on objets.Commande_ID_Commande = commandes.Commande_ID_Commande join livraisons on livraisons.Livraison_ID = commandes.Livraison_ID join tournee on tournee.Tournee_ID = livraisons.Tournee_ID join utilisateurs on utilisateurs.Utilisateur_ID = tournee.Utilisateur_ID where utilisateurs.Utilisateur_ID = ? ',[Utilisateur_ID])
    		  // where Utilisateur_ID = ? ',[Utilisateur_ID])

  res.status(201).json(Tournee);
  } catch (error) {
  console.error('Erreur :', error);
  res.status(500).json({ error: 'Erreur serveur' });
}});



export default userRouter;

