import express from 'express';
import AppError from '../errors/AppError.js'
import pkg from '@prisma/client';
const { PrismaClient } = pkg;
const prisma = new PrismaClient();
const router = express.Router();

router.get('/', async (request, response) => {
    const meurh = await prisma.meurh.findMany({
        select: {
            Id: true,
            Protocolo: true,
            DtTicketAbertura: true,
            DtTicketFechamento: true,
            Assunto: true,
            Msg: true,
            Status: true,
            dados: {
                select: {
                    NmColaborador: true, 
                },
            },
        },
    });
    response.send(meurh)
});

router.get('/detalhes/:Id', async (request, response) => {
    const { Id } = request.params;
    const meurh = await prisma.meurh.findMany({
        where: { IdEmpresa: Number(Id) }
    })
    response.send(meurh)
});

router.get('/detalhes/itens/abertos', async (request, response) => {
    const meurh = await prisma.meurh.count({
        where: { Status: "Em Aberto" },
      })
      console.log(meurh);

    response.status(200).send({data: meurh})
});

router.post('/', async (request, response) => {

});

export default router;