import express from 'express';
import cors from "cors";
import { auth} from './Routes/authRouter';
import { ponto } from './Routes/pontoRouter';

const app = express();
app.use(express.json());
app.use(cors())
app.use('/', auth);
app.use('/', ponto);

export { app };