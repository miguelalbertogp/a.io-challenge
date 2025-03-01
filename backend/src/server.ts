// Importação dos módulos necessários
import { socketConnection } from './utils/socket-io';
import {currentGrid, getCode} from './grid.service';
import express from 'express';
import { generateGrid } from './grid.service';
import cors from 'cors';
import http from 'http';

const PORT = process.env.PORT || 3000;

export const app = express();
const server = http.createServer(app);

app.use(cors());
app.use(express.json());

socketConnection(server)

app.get('/', (req, res) => {
  res.send('Hello world!');
});

app.get('/grid', (req, res) => {
  res.json(currentGrid);
});

app.get('/test-code', (req, res) => {
  res.send(getCode());
});

server.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
