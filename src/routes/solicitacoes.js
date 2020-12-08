import express from 'express';

import pkg from '@prisma/client';
const { PrismaClient } = pkg;
const prisma = new PrismaClient();

import AppError from '../errors/AppError.js'

const router = express.Router(); 


// pega todas as empresas cadastradas
router.get('/', async (request, response) => {
    const solicitacoes = await prisma.solicitacoes.findMany({
        include: {
            dados: true,
        }});
    response.send(solicitacoes)
});

router.post('/', async (request, response) => {

    var date = new Date();
    var current_Year = date.getFullYear().toString();
    var current_Month = date.getMonth().toString();
    var current_Date = date.getDate().toString();
    var current_hour = date.getHours().toString();
    var current_Minutes = date.getMinutes().toString();
    var current_Seconds = date.getSeconds().toString();
    var current_MilliSeconds = date.getMilliseconds().toString();
    const protocolo = current_Year + current_Month + current_Date + current_hour + current_Minutes + current_Seconds + current_MilliSeconds + current_Month;

    try{
        const { CPF, TipoSolicitacao, OrigemSolicitacao, NrCartao } = request.body;
        console.log(CPF, TipoSolicitacao, OrigemSolicitacao, NrCartao);
        // const operadoras = await prisma.operadoras.findMany({ where: { NmOperadora: NmOperadora} })
 
        const solicitacoesCreate = await prisma.solicitacoes.create({
            data: { 
                Protocolo: protocolo,
                TipoSolicitacao : TipoSolicitacao,
                OrigemSolicitacao : OrigemSolicitacao,
                NrCartao: NrCartao,
                dados: {
                    connect: { CPF: CPF },
                },
            },
          });
          console.log(solicitacoesCreate);
        response.json(solicitacoesCreate);
    }
    catch (err) { response.status(400).json({ error: err })}
});

router.get('/detalhes/itens/abertos', async (request, response) => {
    const solicitacoes = await prisma.solicitacoes.count({
        where: { Status: "Em Aberto" },
      })
      console.log(solicitacoes);

    response.status(200).send({data: solicitacoes})
});

router.get('/detalhes/itens/finalizados', async (request, response) => {
    const solicitacoes = await prisma.solicitacoes.count({
        where: { Status: "Finalizada" },
      })
      console.log(solicitacoes);

    response.status(200).send({data: solicitacoes})
});

router.post('/detalhes/itens/finalizar/:Id', async (request, response) => {
    const { Id } = request.params;
    const solicitacoes = await prisma.solicitacoes.findOne({ where: { Id: Number(Id) } })

    if(!solicitacoes){
        throw new AppError('Solicitação não encontrado'); 
    }

    const solicitacoesDelete = await prisma.solicitacoes.update({
        where: { Id: Number(Id) },
        data: { Status: 'Finalizada' },
      })

    response.send(solicitacoesDelete)
});

export default router;