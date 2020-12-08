import express from 'express';

import pkg from '@prisma/client';
const { PrismaClient } = pkg;
const prisma = new PrismaClient();

import AppError from '../errors/AppError.js'

import pkg2 from 'bcryptjs';
const { hash } = pkg2;

const router = express.Router(); 


// pega todas as empresas cadastradas
router.get('/', async (request, response) => {
    const usuarios = await prisma.usuarios.findMany();
    response.send(usuarios)
});

router.get('/firstcheck/:id', async (request, response) => {
    const { id } = request.params;
    try{
        const checkUserFirstExists = await prisma.usuarios.findOne({ where: { CPF: id } });
        if(checkUserFirstExists){
            response.status(200).json({ response: 'sucesso' });
            return;
        }
        const checkUserDados = await prisma.dados.findOne({ where: { CPF: id } });
        if(!checkUserDados){
            response.status(202).json({ response: 'inexistente' });
            return;
        }
        response.status(201).json({ response: 'erro' });
    }catch (err) { response.status(400).json({ response: err })}
});

router.post('/', async (request, response) => {
    const { CPF, Nome, Email, Senha } = request.body;
    try{
        const checkUserExists = await prisma.usuarios.findOne({ where: { CPF: CPF } });
        
        if ( checkUserExists) {
            throw new AppError('Usuario existente');
        }

        const checkEmailExists = await prisma.usuarios.findOne({ where: { Email: Email } });

        if ( checkEmailExists) {
            throw new AppError('Email existente');
        }
        console.log('checkEmailExists: ' + checkEmailExists)

        const hashPassword = await hash(Senha, 10);
        console.log(hashPassword)

        const userCreate = await prisma.usuarios.create({
            data: {
                CPF : CPF,
                Senha : hashPassword, 
                Nome : Nome,      
                Email : Email,      
            },
        });
        response.status(200).json(userCreate);
    }
    catch (err) { response.status(400).json({ error: err })}
});

export default router;