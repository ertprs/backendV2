import express from 'express';

import pkg from '@prisma/client';
const { PrismaClient } = pkg;
const prisma = new PrismaClient();

import AppError from '../errors/AppError.js'

const router = express.Router(); 


// pega todas as empresas cadastradas
router.get('/', async (request, response) => {
    const centrodecustos = await prisma.centrodecustos.findMany();
    response.send(centrodecustos)
});

router.post('/', async (request, response) => {

    try{
        const { NmCentroDeCusto, IdEmpresa } = request.body;
        const centrodecustos = await prisma.centrodecustos.findMany({ where: { NmCentroDeCusto: NmCentroDeCusto} })

        if(centrodecustos){
            throw new AppError('CentroDeCusto já existente'); 
        }
        const centrodecustosCreate = await prisma.centrodecustos.create({
            data: {
                NmCentroDeCusto : NmCentroDeCusto,      
                empresas: {
                    connect: { Id: IdEmpresa },
                },
            },
          });
          console.log(centrodecustosCreate);
        response.json(centrodecustosCreate);
    }
    catch (err) { response.status(400).json({ error: err })}
});

export default router;