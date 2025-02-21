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
    }
    catch(err){
        throw err;
    }
}


