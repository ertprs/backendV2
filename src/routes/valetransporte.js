import express from 'express';

import pkg from '@prisma/client';
const { PrismaClient } = pkg;
const prisma = new PrismaClient();

import AppError from '../errors/AppError.js'

const router = express.Router(); 


// pega todas as passagens cadastradas
router.get('/', async (request, response) => {
    const passagens = await prisma.passagens.findMany({
        include: {
            operadoras: true,
        }
    });
    response.send(passagens)
});


router.get('/detalhe/:Id', async (request, response) => {
    const { Id } = request.params;
    
    const passagens = await prisma.passagens.findMany({ 
            where: { CPF: Id },
            select: {
                NrCartao: true,
                Valor: true,
                QtdDia: true,
                // IdOperadora: true,
                operadoras: {
                    select: {
                        NmOperadora: true,
                        UF: true,
                    },
                },
            },
            
    });

    response.send(passagens)
});

router.post('/', async (request, response) => {
    try{
        console.log(request.body);
        const { CPF, NrCartao, Valor, IdOperadora, QtdDia } = request.body;
        const valeTransporte = await prisma.passagens.create({
            data: {
                CPF : CPF, 
                NrCartao : NrCartao,
                Valor : Number(Valor),
                operadoras: {
                    connect: { Id: IdOperadora },
                },
                QtdDia : Number(QtdDia)
            }
        })
         
        console.log(valeTransporte);
        response.json(valeTransporte);
    }
    catch (err) { response.status(400).json({ error: err })}
});

router.put('/desativar/:id', async (request, response) => {
    const { id } = request.params;

    const checkPassagens = await prisma.passagens.findOne({ where: { Id: id } })

    if(!checkPassagens){
        throw new AppError('Passagen não encontrado'); 
    }

    const passagensUpdate = await prisma.passagens.update({
        where: { Id: id },
        data: { 
            Situacao: 'Desativada'
        },
      })

    response.send(passagensUpdate)
});

router.put('/editar/:id', async (request, response) => {
    const { id } = request.params;
    const { NrCartao, Valor, IdOperadora, QtdDia } = request.body;
    
    const checkPassagens = await prisma.passagens.findOne({ where: { Id: id } })

    if(!checkPassagens){
        throw new AppError('Passagen não encontrado'); 
    }

    const passagensUpdate = await prisma.passagens.update({
        where: { Id: id },
        data: { 
            NrCartao: NrCartao,
            Valor: Valor,
            IdOperadora: Number(IdOperadora),
            QtdDia: QtdDia,
        },
      })

    response.send(passagensUpdate)
});

export default router;