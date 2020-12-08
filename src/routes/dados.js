import express from 'express';

import pkg from '@prisma/client';
const { PrismaClient } = pkg;
const prisma = new PrismaClient();

import AppError from '../errors/AppError.js'

const router = express.Router(); 


// pega todas as empresas cadastradas
router.get('/', async (request, response) => {
    const dados = await prisma.dados.findMany();
    response.send(dados)
});

router.get('/detalhe/:id', async (request, response) => {
    const { id } = request.params;
    const dados = await prisma.dados.findOne({ where: { CPF: id} });
    response.send(dados)
});

router.post('/', async (request, response) => {

    try{
        const { NmColaborador, CPF, IdEmpresa, DtNascimento, IdCentroDeCusto, Matricula, IdEscala } = request.body;
        const dados = await prisma.dados.findMany({ where: { CPF: CPF} })

        console.log(dados);
        console.log(IdEscala);
        
        // if(dados){
        //     throw new AppError('Colaborador já existente'); 
        // }
 
        const dadosCreate2 = await prisma.dados.create({
            data: {
                NmColaborador : NmColaborador,
                CPF : CPF,
                empresas: {
                    connect: { Id: Number(IdEmpresa) },
                },
                DtNascimento : '2020/10/10', 
                centrodecustos: {
                    connect: { Id: Number(IdCentroDeCusto) },
                },
                Matricula : Matricula,
                escalas: {
                    connect: { Id: Number(IdEscala) },
                },
            },
          });
          console.log(dadosCreate2);
        response.json(dadosCreate2);
    }
    catch (err) { response.status(400).json({ error: err })}
});

export default router;