import express, { Router, Express, Request, Response } from "express";
import cors from "cors";
import { query } from './db';
import livraisonsRouter from "./routes/livraisons";
import Adminrouteur from "./routes/Admin";

import authRouter from "./routes/auth";

const server = express();
server.use(express.json());

server.use(cors())


server.use('/livraisons',livraisonsRouter);
server.use('/auth',authRouter);
server.use('/admin',Adminrouteur);


const sql = `SELECT 1 + 1 AS test`;
query(sql).then(
  value => console.log(value)
)

server.listen(3000, () => console.log("Serveur prêt à démarrer"));