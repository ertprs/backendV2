import express from 'express'

import pkg from '@prisma/client';
const { PrismaClient } = pkg;
const prisma = new PrismaClient()

import AppError from '../errors/AppError.js'

import bcryptjs from 'bcryptjs';
const { compare } = bcryptjs;

import jsonwebtoken from 'jsonwebtoken';
const { sign } = jsonwebtoken; 

import authConfig from '../config/auth.js'
const router = express.Router();


router.post('/', async (request, response) => {
    const { CPF, Senha } = request.body;
    console.log(CPF, Senha);
 
    try{
        const user = await prisma.usuarios.findOne({ where: { CPF: CPF } });
        if ( !user) {
            throw new AppError('CPF/Senha incorreto');
        }
        const passwordMatched = await compare(Senha, user.Senha);

        if ( !passwordMatched) {
            throw new AppError('CPF/Senha incorreto');
        }
        // Your Hash: 88fe70029ccd13268b42776c93918c3a
        // Your String: brasilpasdajiij2eZ3r0c4ll!!!@@@@@1asd232323
        const token = sign({subject: user.Id}, authConfig.jwt.secret, { expiresIn: 900*900 });
        delete user.Senha;
        // delete user.Lvl;
        delete user.Email;
        response.json({user, token});
    }
    catch (err) { response.status(400).json({ error: err })}
});



export default router;