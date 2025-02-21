import express from 'express';

const ponto = express();

//listar todos os pontos
ponto.get('/api/ponto', (req, res) => {
    res.send('Rota GET');
});

//abrir um ponto
ponto.post('/api/ponto', (req, res) => {
    res.send('Rota POST');
});

//fechar um ponto
ponto.patch('/api/ponto', (req, res) => {
    res.send('Rota PATCH');
});
