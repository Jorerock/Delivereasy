import express, { Router, Express, Request, Response } from "express";
import cors from "cors";
import { query } from './db';

import Adminrouteur from "./routes/Admin";
import authRouter from "./routes/auth";
import Clientrouteur from "./routes/Client";
import Commandesrouteur from "./routes/Commandes";
import livraisonsRouter from "./routes/livraisons";
import objetsrouteur from "./routes/Objet";
import Tourneesrouteur from "./routes/Tournee";
import livreurRouteur from "./routes/Livreur";



objetsrouteur

const server = express();
server.use(express.json());

// server.use(cors())
var whitelist = ['http://localhost:3000', /** other domains if any */ ]
var corsOptions = {
}

server.use(cors({
  origin: 'http://localhost:5173',  
  credentials: true
}));


server.use('/admin',Adminrouteur);
server.use('/auth',authRouter);
server.use('/client',Clientrouteur);
server.use('/Commande',Commandesrouteur);
server.use('/livraisons',livraisonsRouter);
server.use('/objet',objetsrouteur);
server.use('/tournee',Tourneesrouteur);
server.use('/Livreur',livreurRouteur);




const sql = `SELECT 1 + 1 AS test`;
query(sql).then(
  value => console.log(value)
)

server.listen(3000, () => console.log("Serveur prêt à démarrer"));