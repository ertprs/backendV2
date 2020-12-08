import express from 'express';

import pkg from '@prisma/client';
const { PrismaClient } = pkg;
const prisma = new PrismaClient();

import AppError from '../errors/AppError.js'

const router = express.Router(); 

// pega todas as empresas cadastradas
router.post('/', async (request, response) => {
    
    
    return res.json({ auth: true, 'x-rcauth-token': 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJndWlsaGVybWV2ZWlnYTE5QGdtYWlsLmNvbSIsImF1ZGllbmNlIjoid2ViIiwiY3JlZFVzZXIiOiIxMjc5NzQ3NTc5OCIsImNyZWRQYXNzIjoiM0AwNlozcjBjNGxsIiwiY3JlYXRlZCI6MTYwNTI3NjUzNzkyNiwibG9naW5EYXRlIjoxNjA1Mjc2NTM3OTI2LCJleHAiOjE2MzY4MTI1Mzd9.e62csC02yc8oLPhQ7InJblK4WiCwTEI6s7iszjfmRt6pbfU9sp3nRqOgTsDgvprrOaB7g2IMrSnDeuDBGX46Nw' });
});



export default router;