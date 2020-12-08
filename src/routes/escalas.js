import express from 'express';
import AppError from '../errors/AppError.js'
import pkg from '@prisma/client';
const { PrismaClient } = pkg;
const prisma = new PrismaClient();
const router = express.Router();

router.get('/', async (request, response) => {
    const escalas = await prisma.escalas.findMany();
    response.send(escalas)
});


router.get('/detalhes/:Id', async (request, response) => {
    const { Id } = request.params;
    const escalas = await prisma.escalas.findMany({
        where: { IdEmpresa: Number(Id) }
    })
    response.send(escalas)
});

router.post('/competencia', async (request, response) => {
    try{
        const { Competencia, Valor, Id, DiasTotas } = request.body;
        console.log(Competencia)
        console.log(Valor)
        console.log(Id)
        console.log(DiasTotas)
        
        const checkEscalaCompetencia = await prisma.escalascompetencia.findMany({
            where: { IdEscalas: Number(Id), Competencia: Competencia}
        });
        
        // if(checkEscalaCompetencia){
        //     throw new AppError('já existe'); 
        // }
        
        const EscalaCompetencia = await prisma.escalascompetencia.create({
            data: {
                Competencia: Competencia,
                QtdFolgas: Number(Valor),
                QtdUteis: Number(DiasTotas),
                escalas: {
                    connect: { Id: Number(Id) },
                },
            }
        })
        
        console.log(EscalaCompetencia);
        response.json(EscalaCompetencia);
    }
    catch (err) { response.status(400).json({ error: err })}
});

export default router;