import express from 'express';

import pkg from '@prisma/client';
const { PrismaClient } = pkg;
const prisma = new PrismaClient();

import AppError from '../errors/AppError.js'

const router = express.Router(); 

// pega todas as empresas cadastradas
router.get('/', async (request, response) => {
    const empresas = await prisma.empresas.findMany({ where: { Situacao: 'Ativa' } });
    response.status(200).send(empresas)
});

router.get('/detalhes/:CNPJ', async (request, response) => {
    const { CNPJ } = request.params;
    const empresas = await prisma.empresas.findOne({ where: { CNPJ: CNPJ } })

    if(!empresas){
        throw new AppError('Cnpj não encontrado'); 
    }
    
    // verificar se ele tem acesso a empresa da URL
    // atraves do id que vem do payload

    response.status(200).send(empresas)
});

router.put('/atualizar/:id', async (request, response) => {
    const { id } = request.params;
    const { NmEmpresa, NmFantasia, Endereco, CEP, Tipo } = request.body;
    
    const empresas = await prisma.empresas.findOne({ where: { CNPJ: id } })

    if(!empresas){
        throw new AppError('Cnpj não encontrado'); 
    }

    const empresaUpdate = await prisma.empresas.update({
        where: { CNPJ: id },
        data: { 
            NmEmpresa: NmEmpresa,
            NmFantasia: NmFantasia, 
            Endereco: Endereco, 
            CEP: CEP, 
            Tipo: Tipo
        },
      })

    response.send(empresaUpdate)
});

router.post('/deletar/:CNPJ', async (request, response) => {
    const { CNPJ } = request.params;
    const empresas = await prisma.empresas.findOne({ where: { CNPJ: CNPJ } })

    if(!empresas){
        throw new AppError('Cnpj não encontrado'); 
    }

    const empresaDelete = await prisma.empresas.update({
        where: { CNPJ: CNPJ },
        data: { Situacao: 'Desativada' },
      })

    response.send(empresaDelete)
});


router.post('/', async (request, response) => {

    try{
        const { NmEmpresa, NmFantasia, CNPJ, Endereco, CEP, Tipo } = request.body;
        const empresas = await prisma.empresas.findOne({ where: { CNPJ: CNPJ } })

        if(empresas){
            throw new AppError('Cnpj já existente'); 
        }
        
        const empresasCreate = await prisma.empresas.create({
            data: {
                CNPJ : CNPJ,
                NmEmpresa : NmEmpresa,
                NmFantasia : NmFantasia,
                Endereco : Endereco,
                CEP : CEP,
                Tipo : Tipo,
            },
          });
          console.log(empresasCreate);
        response.json(empresasCreate);
    }
    catch (err) { response.status(400).json({ error: err })}
});

export default router;