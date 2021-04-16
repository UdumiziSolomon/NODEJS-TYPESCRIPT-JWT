import express, { Request, Response , NextFunction } from 'express';
import { debug } from 'console';
const jwt = require('jsonwebtoken');
const NAMESPACE = 'Auth';
import {JWT_EXPIRES_IN}  from '../config/config';
import { JWT_SECRET, JWT_ISSUER }  from '../config/config';
import IUser from '../interfaces/IUser';

// const JWT_EXPIRY = process.env.JWT_EXPIRY;
// const JWT_SECRET = process.env.JWT_SECRET ;
// const JWT_ISSUER = process.env.JWT_ISSUER ;

// Extract jwt
export const validateRoute = (req: Request, res: Response, next: NextFunction) => {
  debug(NAMESPACE, 'Validation en-process');  
  let token = req.headers.authorization?.split(' ')[1];
  if(token){
      jwt.verify(token, JWT_SECRET, (error: Error | null , decoded: string) => {
          if(error){
              res.json({ success: false, error});
          }else{
             let verifiedToken = decoded ;
             debug(verifiedToken);
              next();
          }
      });
  }else {
      return res.status(401).json({ success: false, msg: 'UnAuthorized token validation',})
  }
};

// Sign JWT
export const signJWT = (user: IUser, callback: (error: Error | null, token: string | null) => void ): void => {
//    let expiration = JWT_EXPIRY ;
   debug(NAMESPACE, `Attempt to sign ${user.email}`);
//    sign jwt
    try{
        jwt.sign({ user: user.email }, JWT_SECRET, 
        {
            expiresIn : JWT_EXPIRES_IN,
            algorithm: 'HS256',
            issuer: JWT_ISSUER 
        }, (error: Error, token: string) => {
            if(error){
                callback(error, null);
                debug('Token not generated!!', error);
            }else if(token){
                callback(null,token);
                debug('Token generated!!', token);
            }
        });
    }
    catch(error){
        debug(NAMESPACE, error);
        callback(error, null);
}
};
