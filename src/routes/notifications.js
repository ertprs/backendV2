import express from 'express';
import AppError from '../errors/AppError.js'
import pkg from '@prisma/client';
const { PrismaClient } = pkg;
const prisma = new PrismaClient();
const router = express.Router();

router.get('/detalhe/:id', async (request, response) => {
    const { id } = request.params;
        // const checkUserProvider = await prisma.notification.findOne({ where: { CPF: id.toString() } });
    
        // if (!checkUserProvider) {
        //   return response
        //     .status(401)
        //     .json({ error: 'Only provider can load notifications' });
        // }
    
        const notifications = await prisma.notification.findMany({ 
            where: { CPF: id },
            orderBy: {
                created_at: 'desc',
              }, 
        });
        //   .sort({ createdAt: 'desc' })
        //   .limit(20);
    
        console.log(notifications);
        return response.json(notifications);
});


export default router;