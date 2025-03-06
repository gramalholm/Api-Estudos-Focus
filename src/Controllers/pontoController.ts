import { Request, Response } from 'express';
import { verifyIfPontoExists, ClosePonto } from '../services/pontoServices';
import { verifyToken } from '../Middlewares/JWT';
import { OpenPonto } from '../services/pontoServices';
import { Ponto } from '../Models/ponto';

export class pontoController{
    public static async abrirPonto(req: Request, res: Response):Promise<Response | void>{
        const token = req.header('Authorization');

        if(!token){
            return res.status(401).json({message: "Token não informado"});
        }

        const decoded = verifyToken(token);

        if(!decoded){
            return res.status(401).json({message: "Usuário sem permissão"});
        }

        if(!data || !hora || !funcionarioId){
            return res.status(400).json({message: "Data, hora e Id do funcionário são obrigatórios"});
        }

        const pontoExists = await verifyIfPontoExists(data, funcionarioId);

        if(pontoExists){
            return res.status(404).json({message: "Ponto já aberto"});
        }else{
            const dataPonto = new Date(data);
            const horaPonto = new Date(hora);
            const ponto = await OpenPonto(dataPonto, horaPonto, funcionarioId);
            if(!ponto){
                return res.status(500).json({message: "Erro ao abrir ponto"});
            }
            return res.status(201).json(ponto);
        }

    }

    public static async fecharPonto(req: Request, res: Response):Promise<Response | void>{
    try{
        const token = req.header('Authorization');
        const {data, hora, funcionarioId} = req.body;

        if(!token){
            return res.status(401).json({message: "Token não informado"});
        }

        const decoded = verifyToken(token);

        if(!decoded){
            return res.status(401).json({message: "Usuário sem permissão"});
        }

        if(!data || !hora || !funcionarioId){
            return res.status(400).json({message: "Data, hora e Id do funcionário são obrigatórios"});
        }

        const pontoExists = await verifyIfPontoExists(data, funcionarioId);

        if(!pontoExists){
            return res.status(404).json({message: "Ponto não aberto"});
        }else{
            const dataPonto = new Date(data);
            const horaPonto = new Date(hora);
            const ponto = await ClosePonto(dataPonto, horaPonto, funcionarioId);
            if(!ponto){
                return res.status(500).json({message: "Erro ao fechar ponto"});
            }
            return res.status(201).json(ponto);
        }
    }catch(err){
            return res.status(500).json({message: (err as Error).message});
    }
    }

    public static async getAllPontos(req: Request, res: Response):Promise<Response | void>{
        try{
            const token = req.header('Authorization');
            if(!token){
                return res.status(401).json({message: "Token não informado"});
            }

            const decoded = verifyToken(token);
            if(!decoded){
                return res.status(401).json({message: "Usuário sem permissão"});
            }
        }catch(err){

        }
    }


}