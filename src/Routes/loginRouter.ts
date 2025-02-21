import express  from "express";
import { Request, Response } from "express";
import { loginController } from "../Controllers/loginController";

const login = express();

login.get('/api/login', (req: Request, res: Response) => {
    res.send('Rota GET');
});

login.post('/api/login', async (req: Request, res: Response) => {
    await loginController.verifyLogin(req, res);
});

export { login };


