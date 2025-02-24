import express  from "express";
import { Request, Response } from "express";
import { authController } from "../Controllers/authController";

const auth = express();

auth.get('/auth/login', (req: Request, res: Response) => {
    res.send('Rota GET');
});

auth.post('/auth/login', async (req: Request, res: Response) => {
    await authController.verifyLogin(req, res);
});

auth.post('/auth/register', async (req: Request, res: Response) => {
    await authController.createUser(req, res);
});

auth.post('/auth/forget-password', (req: Request, res: Response) => {
    res.send('Rota POST');
});

export { auth };


