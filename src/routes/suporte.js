import express from 'express';
import AppError from '../errors/AppError.js'
import pkg from '@prisma/client';
const { PrismaClient } = pkg;
const prisma = new PrismaClient();
const router = express.Router();

router.get('/', async (request, response) => {
    
    const suporte = await prisma.suporte.findMany({
        select: {
            Id: true,
            Protocolo: true,
            DtTicketAbertura: true,
            DtTicketFechamento: true,
            Assunto: true,
            Msg: true,
            Avaliacao: true,
            Status: true,
            dados: {
                select: {
                    NmColaborador: true, 
                },
            },
        },
    });
    response.send(suporte)
});

router.get('/detalhes/:Id', async (request, response) => {
    const { Id } = request.params;
    const suporte = await prisma.suporte.findMany({
        where: { IdEmpresa: Number(Id) }
    })
    response.send(suporte)
});

router.get('/detalhes/itens/abertos', async (request, response) => {
    const suporte = await prisma.suporte.count({
        where: { Status: "Em Aberto" },
      })
      console.log(suporte);

    response.status(200).send({data: suporte})
});

router.get('/detalhes/itens/finalizados', async (request, response) => {
    const suporte = await prisma.suporte.count({
        where: { Status: "Finalizado" },
      })
      console.log(suporte);

    response.status(200).send({data: suporte})
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
        const { Msg, Assunto, CPF } = request.body;
        const createSuporte = await prisma.suporte.create({
            data: {
                Protocolo: protocolo,
                Msg : Msg,
                Assunto : Assunto,
                dados: {
                    connect: { CPF: CPF },
                },
            }
        })
         
        console.log(createSuporte);
        response.json(createSuporte);
    }
    catch (err) { response.status(400).json({ error: err })}
});

router.get('/SuporteHistorico/:Id', async (request, response) => {
    const { Id } = request.params;
    const suporte = await prisma.suportehistorico.findMany({
        where: { Id: Number(Id) }
    })
    console.log(suporte[0].Msg)
    response.send(suporte[0].Msg)
});

router.post('/detalhes/itens/avaliar', async (request, response) => {
    const { id, Avaliacao } = request.body; 
    console.log(id);
    console.log(Avaliacao);
    const suporte = await prisma.suporte.findOne({ where: { Id: Number(id) } })

    if(!suporte){
        throw new AppError('Suporte não encontrado'); 
    }

    const suporteAvaliacao = await prisma.suporte.update({
        where: { Id: Number(id) },
        data: { Avaliacao: Number(Avaliacao)},
      })
      console.log(suporteAvaliacao);

    response.send(suporteAvaliacao)
});
 

export default router;