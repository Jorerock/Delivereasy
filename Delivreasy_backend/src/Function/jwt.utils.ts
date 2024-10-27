// Imports
var jwt = require('jsonwebtoken');
import {Response, Router ,NextFunction} from "express";
import { user } from "../models/user"
var cookieParser = require('cookie-parser')
const tokensign = '!!11!!1!11*!!223!!44**55ABCFGzqer!cxhdr!tysc*vvxw5221';
var cookies = require('js-cookie')


// const tokensign = process.env.JWT_SIGN_SECRET 
export function generateTokenForUser(userData: user)
{
  return jwt.sign({
    userId: userData.utilisateur_ID,
    isAdmin: userData.Utilisateur_Admin
  },
  tokensign,
  {
    expiresIn: '1h'
  })

}

export function getUserId(Connexiontoken: any)
{
  var userId = -1;
  var isAdmin = 0
  var token = (Connexiontoken)
  if(token != null) {
    try {

      var jwtToken = jwt.verify(token,tokensign as string) as any;
      if(jwtToken != null)
        userId = jwtToken.userId;
        isAdmin= jwtToken.isAdmin
    } catch(err) { }
  }
  console.log("user id jwt =",userId)
  return [userId,isAdmin];
}

export function Connect(req: Request, res: Response, next: Function) {
  const token =cookies.get("token")
  if (!token) {
    return ({ message: "Non autorisé" });
  }
  if(jwt.verify(token, tokensign)){
    next();
  }
}


interface UserRequest extends Request {
  user?: { utilisateur_ID: number,Utilisateur_Admin: boolean };
}

export const UserConnect = (req: UserRequest, res: Response, next: NextFunction) => {
  if (!req.user || !req.user.Utilisateur_Admin) {
  res.status(500).json({ error: 'Erreur serveur' });
  }
  next();
};

export const AdminConnect = (req: UserRequest, res: Response, next: NextFunction) => {
  if (!req.user || !req.user.Utilisateur_Admin) {
  res.status(500).json({ error: 'Erreur serveur' });
  }
  next();
};
