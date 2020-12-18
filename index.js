import express from 'express';
import bodyParser from 'body-parser';
import path from 'path'; 

import helmet from "helmet";
import morgan from 'morgan'
import cors from 'cors'
import pkg from '@prisma/client';
const {
    PrismaClient
} = pkg;
const prisma = new PrismaClient();

import sessionsRoutes from './src/routes/sessions.js';
import empresasRoutes from './src/routes/empresas.js';
import centrodecustosRoutes from './src/routes/centrodecustos.js';
import operadorasRoutes from './src/routes/operadoras.js';
import dadosRoutes from './src/routes/dados.js';
import usersRoutes from './src/routes/usuarios.js';
import vtRoutes from './src/routes/valetransporte.js';
import ocorrenciasRoutes from './src/routes/ocorrencias.js';
import escalasRoutes from './src/routes/escalas.js';
import meurhRoutes from './src/routes/meurh.js';
import suporteRoutes from './src/routes/suporte.js';
import pedidosRoutes from './src/routes/pedidos.js';
import solicitacoesRoutes from './src/routes/solicitacoes.js';

import arquivosRoutes from './src/routes/arquivos.js'
import ensureAuthenticated from './src/middlewares/ensureAuthenticated.js'
import notificationsRoutes from './src/routes/notifications.js'


import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const tempFolder = path.resolve(__dirname, 'tmp');

console.log(tempFolder);

const app = express();
const PORT = 5000;

app.use(bodyParser.json());

app.use(morgan("dev"));
app.use(cors());
// app.use(helmet());
app.use('/files', express.static(tempFolder));

app.use('/usuarios', usersRoutes);
app.use('/sessions', sessionsRoutes);
app.use('/arquivos', arquivosRoutes);
app.use('/centrodecustos', centrodecustosRoutes);
app.use('/operadoras', operadorasRoutes);
app.use('/empresas', empresasRoutes);
app.use('/dados', dadosRoutes);
app.use('/valetransport', vtRoutes);
app.use('/ocorrencias', ocorrenciasRoutes);
app.use('/escalas', escalasRoutes);
app.use('/meurh', meurhRoutes);
app.use('/suporte', suporteRoutes);
app.use('/pedidos', pedidosRoutes);
app.use('/solicitacoes', solicitacoesRoutes);
app.use('/notifications', notificationsRoutes);



// app.use('/colaboradores', colaboradoresRoutes);

app.get('/', (request, response) => response.send('Fala brd!'));
app.get('/portas', (request, response) => response.send('Fala brd!'));
app.listen(PORT, () => console.log(`Server Running on port: ${PORT}`));