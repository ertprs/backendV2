import express from 'express';
const { Request, Response, NextFunction  } = express; 

import jsonwebtoken from 'jsonwebtoken';
const { verify } = jsonwebtoken; 

import authConfig from '../config/auth.js'
import AppError from '../errors/AppError.js' 


export default function ensureAuthenticated(request, response, next){
    const authHeader = request.headers.authorization;
 
    if ( !authHeader) {
        throw new AppError('JWToken incorreto');
    }
    
    const [, token] = authHeader.split(' ');

    try {
        const decoded = verify(token, authConfig.jwt.secret);
        
        const { subject } = decoded;
         
        request.user = {
            id: subject,
        };
        // console.log()

        return next();
    } catch (erro) {
        throw new AppError('JWToken Invalido');    
    }
}