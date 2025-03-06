import { Funcionario } from "../Models/funcionario";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

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
        });

        if(!funcionario){
            throw new Error("Funcionário não encontrado");
        }

        const passwordMatch = await bcrypt.compare(senha, funcionario.senha);

        if(!passwordMatch){   
            throw new Error("Senha incorreta");
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

        const hashedPassword = await bcrypt.hash(senha, 10);

        const funcionario = await prisma.funcionario.create({
            data:{
                nome: nome,
                email: email,
                senha: hashedPassword,
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

export async function updatePasswordByEmail(email: string, senha: string):Promise<Funcionario>{
    const prisma = new PrismaClient();
    try{
        if(!email || !senha){
            throw new Error("Email e senha são obrigatórios");
        }

        const hashedPassword = await bcrypt.hash(senha, 10);

        const updetedFuncionario = await prisma.funcionario.update({
            where:{
                email: email,
            },
            data:{
                senha: hashedPassword,
            }
        });

        if(!updetedFuncionario){
            throw new Error("Erro ao atualizar senha");
        }

        return updetedFuncionario;

    }finally{
        await prisma.$disconnect();
    }
}



