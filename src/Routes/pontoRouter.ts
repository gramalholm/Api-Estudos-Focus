import express from 'express';
import { pontoController } from '../Controllers/pontoController';

const ponto = express.Router();

//listar todos os pontos
ponto.get('/api/ponto', (req, res) => {
    res.send('Rota GET');
});

//abrir um ponto
ponto.post('/api/ponto', async (req, res) => {
    await pontoController.abrirPonto(req, res);
});

//fechar um ponto
ponto.patch('/api/ponto', async (req, res) => {
    await pontoController.fecharPonto(req, res);
});

export { ponto };