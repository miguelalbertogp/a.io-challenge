// Importação dos módulos necessários
import { socketConnection } from './utils/socket-io';
import express from 'express';
import cors from 'cors';
import http from 'http';
import gridRoutes from './Grid/grid.routes';
import paymentRoutes from './Payment/payment.routes';

const PORT = process.env.PORT || 3000;

export const app = express();
const server = http.createServer(app);

app.use(cors());
app.use(express.json());

socketConnection(server)

app.get('/', (req, res) => {
  res.send('Hello world!');
});

// APP ROUTES
app.use('/grid', gridRoutes);
app.use('/payment', paymentRoutes);

server.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
