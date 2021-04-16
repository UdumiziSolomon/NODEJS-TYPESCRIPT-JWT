"use strict";
import express, { Request, RequestHandler, Response, NextFunction } from 'express';
import User from '../model/userSchema';
import mongoose from 'mongoose';
import { debug } from 'console';
import bcrypt from 'bcryptjs';
const NAMESPACE = 'UserAuth';
const jwt = require('jsonwebtoken');
import { signJWT } from '../middlewares/jwt';

export const validateTokRoute: RequestHandler = (req: Request, res: Response, next: NextFunction) => {
    debug(NAMESPACE, 'Token validated');
    return res.status(200).json({ msg: 'user is Authorized!!'})
};

export const userRegisterController: RequestHandler = ( req: Request, res: Response) => {
    debug('User Configuration');
    let { email, username, password } = req.body ;
    // hash password with bcrypt
    bcrypt.hash(password, 10, async (hashError, hash) => {
        if(hashError){
            return res.status(200).json({ msg: hashError });
        }
        // create new user
        const user = new User({
            _id: new mongoose.Types.ObjectId(),
            email, username, password: hash
        });

        // check user existence
    const check = await User.findOne({ email })
    try{
       if(!check){
        //save to db
           user.save()
           .then( user_save => {
               user_save ? debug(`User: ${user.email} saved!!`, user) : debug('Error in saving user')
           })
       }else{
           debug(`User: ${user.email} exists`)
       }
    }catch(err){
        debug(err);
    }

  });
};

// login
export const userLoginController: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
    let {email, password} = req.body ;
    const user = await User.findOne({email});
    try{
        if(!user){
            return res.status(401).json({msg: `User with ${email} not found`});
        }
        // compare password
        bcrypt.compare(password, user.password, (error, result) => {
            if(error){
                res.status(401).json({ msg: 'Unauthorized password' });
            }
            else if(result){
                signJWT(user, (error, token) => {
                    if(error){
                        return res.status(401).json({ msg: 'Token Unauth', error });
                    }else if(token){
                        return res.status(200).json({
                            msg: 'Authentication sucesss', user, token
                        })
                    }
                })
            }
        });
    }catch (error) {
        debug(NAMESPACE, `error logging in ${email}`);
        debug(error);
    }
};

// get users
export const accessUsers: RequestHandler = (req: Request, res: Response, next: NextFunction) => {
     User.find()
     .select('-password')
     .then( user => {
         return res.status(200).json({ user });
     })
     .catch( error => {
         debug(error);
     });
};