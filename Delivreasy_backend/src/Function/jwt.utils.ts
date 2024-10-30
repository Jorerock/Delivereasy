// Imports
var jwt = require('jsonwebtoken');
// import {Response, Router ,NextFunction} from "express";
import { User } from "../models/user"
import { Request, Response, NextFunction } from 'express';
// var cookieParser = require('cookie-parser')
var cookies = require('js-cookie')

const tokensign = 'test';

// const tokensign = process.env.JWT_SIGN_SECRET 
export function generateTokenForUser(userData: User)
{
  const token =  jwt.sign(
    { utilisateur_ID: userData.Utilisateur_ID, Utilisateur_Admin: userData.Utilisateur_Admin }, 
    tokensign, 
    { expiresIn: '1h' }
  );
  console.log('token',token)
  return token
}

export interface UserRequest extends Request {
  user?: { utilisateur_ID: number ,Utilisateur_Admin: boolean };
}

export function Connect(req: UserRequest, res: Response, next: NextFunction)
{
  const token = req.cookies['token'];
  if(token != null) {
      const jwtToken = jwt.verify(token,tokensign) ;
      req.user = {
        utilisateur_ID  : jwtToken.utilisateur_ID,
        Utilisateur_Admin : jwtToken.Utilisateur_Admin 
      };

        next()
}else{
    return res.status(401).json({ message: 'Pas de token présent dans le cookie' });
  }
}

export const adminConnect = (req: UserRequest, res: Response, next: NextFunction) => {
  if (req.user && req.user.Utilisateur_Admin) {
    next();
  } else {
    return res.status(403).json({ message: "admin connect marche pas" });
  }
};



export const GETuserID = (req: UserRequest) => {
  if (req.user && req.user.utilisateur_ID) {
    return(req.user.utilisateur_ID)
  }
};
