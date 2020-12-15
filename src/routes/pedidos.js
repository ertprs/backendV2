import express from 'express';

import pkg from '@prisma/client';
const { PrismaClient } = pkg;
const prisma = new PrismaClient();

import AppError from '../errors/AppError.js'

const router = express.Router(); 

router.get('/pedidos', async (request, response) => {
    const pedidos = await prisma.pedidos.findMany({
        select: {
            Id: true,
            Competencia: true,
            Status: true,
            empresas: {
                select: {
                    NmFantasia: true, 
                },
            },
        },
    });
    console.log(pedidos)
    response.send(pedidos)
});

router.get('/detalhes/:id', async (request, response) => {
    try{
        const { id } = request.params; 
        const result = await prisma.$queryRaw`SELECT NmColaborador, NrCartao, NmOperadora, ValorDia, NmEscala, QtdOcorrencias, QtdFolgas, QtdDias, QtdDiasUteis, Valor, Valor_Total FROM gvt.detalhepedidos
        where IdPedido = ${id}`
        console.log(result);
        response.json(result); 
    }
    catch (err) { response.status(400).json({ error: err })}
});

router.post('/', async (request, response) => {
    try{
        const { IdEmpresa, Competencia, DtStart, DtEnd } = request.body;
        console.log(IdEmpresa, DtStart, DtEnd)
        const pedidosCreate = await prisma.pedidos.create({
            data: { 
                Competencia: Competencia,
                DtInicialFolgas : DtStart +'T00:00:00.000Z',
                DtFinalFolgas : DtEnd + 'T00:00:00.000Z',
                DtInicialFaltas : DtStart + 'T00:00:00.000Z',
                DtFinalFaltas : DtEnd + 'T00:00:00.000Z',
                empresas: {
                    connect: { Id: Number(IdEmpresa) },
                },
            },
          });
          console.log(pedidosCreate);
          response.status(200).json({ data: pedidosCreate.Id })
    }
    catch (err) { response.status(400).json({ error: err })}
});



router.post('/cadastro', async (request, response) => {
    try{
        const { IdPedido, IdEmpresa, DtOcorrenciaInicial, DtOcorrenciaFinal } = request.body; 

        const result = await prisma.$queryRaw`INSERT INTO detalhepedidos (IdPedido, NmColaborador, CPF, NrCartao, IdOperadora, NmOperadora, 
            ValorDia, NmEscala, QtdOcorrencias, QtdFolgas, QtdDias, QtdDiasUteis, Valor, Valor_Total)
            SELECT ${IdPedido}, d.NmColaborador, p.CPF, p.NrCartao, p.IdOperadora, o.NmOperadora, SUM(p.Valor) AS 'Valor Dia', 
            e.NmEscala, Count(oct.Id) AS Ocorrencias, ec.QtdFolgas AS Folgas, p.QtdDia AS 'QtdVezesAoDia', ec.QtdUteis, 
            ((p.QtdDia * p.Valor ) * 2 ) AS 'Valor Dia Final', ( (ec.QtdUteis - ( Count(oct.Id) + ec.QtdFolgas)) * ((p.QtdDia * p.Valor ) * 2 ) ) AS 'Valor_Total'
            FROM  gvt.passagens 					p
            LEFT JOIN gvt.dados 					d 	on 	d.CPF = p.CPF
            LEFT JOIN gvt.operadoras 				o 	on 	o.Id = p.IdOperadora
            LEFT JOIN gvt.escalas	 				e 	on 	e.Id = d.IdEscala
            LEFT JOIN gvt.escalascompetencia	 	ec 	on 	ec.IdEscalas = d.IdEscala
            LEFT JOIN gvt.ocorrencias				oc  on  oc.CPF = p.CPF AND (DtOcorrencia between ${DtOcorrenciaInicial} AND ${DtOcorrenciaFinal})
            LEFT JOIN gvt.tiposocorrencias			oct on  oct.id = oc.IdTipoOcorrencia AND oct.DescBeneficio = true
            where d.IdEmpresa = ${IdEmpresa} and d.Situacao = 'Ativo' group by o.NmOperadora, p.CPF`
            
        response.json(result); 
        console.log(result); 
            
    }
    catch (err) { response.status(400).json({ error: err })}
});

router.get('/historico', async (request, response) => {
    try{
        // const result = await prisma.$queryRaw`SELECT P.Id, E.NmFantasia, P.Competencia, P.Status, SUM(Valor_Total) AS 'Total' 
        //     FROM gvt.pedidos P
        //     LEFT JOIN gvt.detalhepedidos DP ON DP.IdPedido = P.Id
        //     LEFT JOIN gvt.empresas E ON E.Id = P.IdEmpresa
        //     group by P.Competencia`;   
        
        const result = await prisma.$queryRaw`SELECT P.Id, E.NmFantasia, P.Competencia, P.Status, SUM(Valor_Total) AS 'Total' 
            FROM gvt.pedidos P
            LEFT JOIN gvt.detalhepedidos DP ON DP.IdPedido = P.Id
            LEFT JOIN gvt.empresas E ON E.Id = P.IdEmpresa
            group by P.Id, E.NmFantasia, P.Competencia, P.Status`;

        response.json(result); 
        console.log(result);
    }
    catch (err) { response.status(400).json({ error: err })}
});



router.post('/detalhepedidos', async (request, response) => {
    try{
        const { idpedido, nmcolaborador, cpf, nrcartao, idoperadora, nmoperadora, _valordia_, nmescala,
            qtdocorrencias, qtdfolgas, qtddias, qtddiasuteis, _valor_, _valor_total_, memoriacalculo } = request.body.NmColaborador;
        
        // console.log(request.body.NmColaborador) 
        // console.log(request.body.NmColaborador._valor_) 

        
        console.log(Number(idpedido), nmcolaborador, cpf, nrcartao, idoperadora, nmoperadora, Number(_valordia_), nmescala,
            qtdocorrencias, qtdfolgas, qtddias, qtddiasuteis, _valor_, _valor_total_, memoriacalculo);

        const pedidosCreate = await prisma.detalhepedidos.create({
            data: {
                IdPedido : idpedido, 
                NmColaborador : nmcolaborador, 
                CPF : String(cpf), 
                NrCartao : String(nrcartao),
                IdOperadora : idoperadora, 
                NmOperadora : nmoperadora, 
                ValorDia : _valordia_, 
                NmEscala : nmescala,
                QtdOcorrencias : qtdocorrencias, 
                QtdFolgas : qtdfolgas, 
                QtdDias : qtddias, 
                QtdDiasUteis : qtddiasuteis, 
                Valor : _valor_, 
                Valor_Total : _valor_total_, 
                MemoriaCalculo : memoriacalculo
            },
          });
          console.log(pedidosCreate);
          response.status(200).json({ data: pedidosCreate.Id })
    }
    catch (err) { response.status(400).json({ error: err })}
});


export default router;