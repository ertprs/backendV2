import express from 'express';

import pkg from '@prisma/client';
const { PrismaClient } = pkg;
const prisma = new PrismaClient();

import AppError from '../errors/AppError.js'

const router = express.Router(); 


router.get('/', async (request, response) => {
    const passagens = await prisma.ocorrencias.findMany({
        include: {
            tiposocorrencias: true,
        }
    });
    response.send(passagens)
});

router.get('/detalhe/:id', async (request, response) => {
    const { id } = request.params;
    const passagens = await prisma.ocorrencias.findMany({
        where: { CPF: id},
        include: {
            tiposocorrencias: true,
        }
    });
    response.send(passagens)
});

router.post('/', async (request, response) => {
    try{
        const { IdTipoOcorrencia, DtNascimento } = request.body;
        console.log(IdTipoOcorrencia, DtNascimento)
        
        const ocorrenciaCreate = await prisma.ocorrencias.create({
            data: {
                CPF: "12797475798",
                DtOcorrencia : DtNascimento+ 'T00:00:00.000Z',
                tiposocorrencias: {
                    connect: { Id: Number(IdTipoOcorrencia) },
                },
            },
          });
          console.log(ocorrenciaCreate);
        response.json(ocorrenciaCreate);
    }
    catch (err) { response.status(400).json({ error: err })}
});

router.get('/tipos', async (request, response) => {
    // const { Id } = request.params;
    const passagens = await prisma.tiposocorrencias.findMany();
    response.send(passagens)
});






export default router;