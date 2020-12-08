import express from 'express';

import pkg from '@prisma/client';
const { PrismaClient } = pkg;
const prisma = new PrismaClient();

import AppError from '../errors/AppError.js'

const router = express.Router(); 


// pega todas as empresas cadastradas
router.get('/', async (request, response) => {
    const operadoras = await prisma.operadoras.findMany();
    response.send(operadoras)
});

router.post('/', async (request, response) => {

    try{
        const { NmOperadora, IdEmpresa, UF } = request.body;
        const operadoras = await prisma.operadoras.findMany({ where: { NmOperadora: NmOperadora} })

        // if(operadoras){
        //     throw new AppError('Operadora já existente'); 
        // }
        const operadorasCreate = await prisma.operadoras.create({
            data: {
                NmOperadora : NmOperadora,      
                empresas: {
                    connect: { Id: IdEmpresa },
                },
                UF: UF,
            },
          });
          console.log(operadorasCreate);
        response.json(operadorasCreate);
    }
    catch (err) { response.status(400).json({ error: err })}
});

export default router;