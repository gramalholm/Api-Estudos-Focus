import { PrismaClient } from "@prisma/client";
import { Ponto } from "../Models/ponto";

export async function verifyIfPontoExists(data: Date, funcionarioId: string): Promise<boolean | void>{
    const prisma = new PrismaClient();
    try{
        if(!data || !funcionarioId){
            throw new Error("Data e funcionário são obrigatórios");
        }
        const ponto = await prisma.ponto.findFirst({
            where:{
                data: data,
                funcionarioId: funcionarioId
            }
        })

        if(!ponto){
            return false;
        }

        return true;
    }catch(err){
        throw err;
    }
}

export async function OpenPonto(data: Date, entrada: Date, funcionarioId: string): Promise<Ponto | void>{
    const prisma = new PrismaClient();
    try{
        if(!data || !entrada || !funcionarioId){
            throw new Error("Data, entrada e funcionário são obrigatórios");
        }
         const ponto = await prisma.ponto.create({
                data: {
                    data: data,
                    entrada: entrada,
                    funcionarioId: funcionarioId,
                    saida: null as any
                },
                include: {
                    funcionario: true
                }
         })

         if(!ponto){
             throw new Error("Erro ao abrir ponto");
         }

        return ponto;
    }
    catch(err){
        throw err;
    }
}

export async function ClosePonto(data: Date, saida: Date, funcionarioId: string): Promise<Ponto | void>{
    const prisma = new PrismaClient();
    try{
        if(!data || !saida || !funcionarioId){
            throw new Error("Data, saída e funcionário são obrigatórios");
        }

        const Getponto = await prisma.ponto.findFirst({
            where:{
                data: data,
                funcionarioId: funcionarioId
            }
        })

        if(!Getponto){
            throw new Error("Ponto não encontrado");
        }

        const ponto = await prisma.ponto.update({
            where:{
                id: Getponto.id
            },
            data:{
                saida: saida
            },
            include:{
                funcionario: true
            }
        });

        return ponto;

    }catch(err){
        throw err;
    }
}

