import express,{ Request, Response, Router } from "express";
var cookieParser = require('cookie-parser')
import { query } from "../db";
import {Connect} from "../Function/jwt.utils"
var cookies = require('js-cookie')
// import cookies from "js-cookie"

const livraisonsRouter = Router();
livraisonsRouter.use(express.json());
livraisonsRouter.use(cookieParser());


livraisonsRouter.post('/', async (req: Request, res: Response) => {
  const token =cookies.get("token")
  let Employe_id = 1
   console.log("Employe_id est : :"+Employe_id)
  // const Employe_id = tokendecrypted[0]
  // const isAdmin = tokendecrypted[1]
  console.log('.get/todos/'+Employe_id)
  try {
  const Mescommandes = await query('SELECT Objet_Desciption,tournee.Tournee_ID,commandes.Commande_ID_Commande,Livraison_Adresse,Livraison_Arrive FROM Objets inner join commandes on  Objets.Commande_ID_Commande 	= commandes.Commande_ID_Commande ,tournee,livraisons WHERE Utilisateur_ID = ?',[1]);
  console.log("Mescommandes :",Mescommandes)
  res.status(201).json(Mescommandes);
  } catch (error) {
  console.error('Erreur :', error);
  res.status(500).json({ error: 'Erreur serveur' });
}});



export default livraisonsRouter;


  
  