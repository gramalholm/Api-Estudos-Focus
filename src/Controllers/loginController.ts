import { findFuncByEmail } from '../services/loginServices';
import { Request, Response } from 'express';
import { generateToken } from '../Middlewares/JWT';

export class loginController{
   public static async verifyLogin(req: Request, res: Response):Promise<Response | void>{
      try{
         const {email, senha} = req.body;
         if(email === ""|| senha === ""){
            return res.status(400).json({message: "Email and password are required"});
         }
         
         const user = await findFuncByEmail(email, senha);
         
         if(!user){
            return res.status(404).json({message: "User not found"});
         }

         const token = generateToken({UserId: user.id, UserRole: user.cargo});
         console.log(token);
         return res.json(token).redirect('/api/ponto'); 
   }catch(err){
      return res.status(500).json({message: (err as Error).message});
   }
   }
   
}