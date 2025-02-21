import express from 'express';
import cors from "cors";
import { login } from './Routes/loginRouter';
import { PrismaClient } from '@prisma/client';

const app = express();
app.use(express.json());
app.use(cors())
app.use('/', login);
console.log(process.env.DATABASE_URL);

try{
    const prisma = new PrismaClient();
    prisma.$connect();
    console.log("Conexão com o banco de dados estabelecida");
}catch(err){
    console.log(err);
}

export { app };