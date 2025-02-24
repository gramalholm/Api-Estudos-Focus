import { Funcionario } from "../Models/funcionario";
import { PrismaClient } from "@prisma/client";

export async function findFuncByEmail(email: string, senha: string): Promise<Funcionario> {
   const prisma = new PrismaClient();
   try{
    if(!email || !senha){
        throw new Error("Email e senha são obrigatórios");
    }
    
    const funcionario = await prisma.funcionario.findFirst({
        where:{
            email: email,
            senha: senha,
        }
       })
    
       if(!funcionario){
             throw new Error("Funcionário não encontrado");
       }
    
        return funcionario;
    }finally{
        await prisma.$disconnect();
    }
}

export async function createUser(nome: string, email: string, senha: string, cargo: string):Promise<Funcionario>{
    const prisma = new PrismaClient();
    try{
        if(!nome || !email || !senha || !cargo){
            throw new Error("Todos os campos são obrigatórios");
        }

        const funcionario = await prisma.funcionario.create({
            data:{
                nome: nome,
                email: email,
                senha: senha,
                cargo: cargo,
            }
        })
        if(!funcionario){
            throw new Error("Erro ao criar funcionário");
        }

        return funcionario;
    }finally{
        await prisma.$disconnect();
    }
}


