import { createUser, findFuncByEmail, updatePasswordByEmail } from '../services/authServices';
import { Request, Response } from 'express';
import { generateToken } from '../Middlewares/JWT';


const maxTime = 2 * 60 * 60 * 1000;

export class authController{
   public static async verifyLogin(req: Request, res: Response):Promise<Response | void>{
      try{
         const {email, senha} = req.body;
         if(email === ""|| senha === ""){
            return res.status(400).json({message: "Email e senha são obrigatórios"});
         }
         
         const user = await findFuncByEmail(email, senha);
         
         if(!user){
            return res.status(404).json({message: "Usuário não encontrado"});
         }

         const token = generateToken({UserId: user.id, UserRole: user.cargo});

         res.cookie('token', token, {httpOnly:true, maxAge: maxTime});

         return res.redirect('/api/ponto'); 
      }catch(err){
         return res.status(500).json({message: (err as Error).message});
      }
   }

   public static async createUser(req: Request, res: Response):Promise<Response|void>{
      try{
         const {nome, email, senha, cargo} = req.body;
         if(!nome || !email || !senha || !cargo){
            return res.status(400).json({message: "Todos os campos são obrigatórios"});
         }

         const user = await createUser(nome, email, senha, cargo);
         const token = generateToken({UserId: user.id, UserRole: user.cargo});

         res.cookie('token', token, {httpOnly:true,  maxAge: maxTime});

         if(!user){
            return res.status(404).json({message: "Erro ao criar funcionário"});
         }

         return res.status(201).json(user.id);

      }catch(err){
         return res.status(500).json({message: (err as Error).message});
     }
   }

   public static async updatePassword(req: Request, res: Response):Promise<Response|void>{
      try{
         const {email, senha} = req.body;
         if(!email || !senha){
            return res.status(400).json({message: "Email e senha são obrigatórios"});
         }

         const updateFunc = await updatePasswordByEmail(email, senha);

         if(!updateFunc){
            return res.status(404).json({message: "Erro ao atualizar senha"});
         }

         return res.status(200).json({id: updateFunc.id, mensagem: "Senha atualizada com sucesso"});

      }catch(err){
         return res.status(500).json({message: (err as Error).message});
      }
   }
}