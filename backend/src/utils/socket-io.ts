import { Server } from 'socket.io';
import { startGridGeneration, stopGridGeneration, setBiasChar } from '../grid.service';

type Client = {
    id: string;
};

const clients: Client[] = [];

let io: any;
export const socketConnection = (server: any) => {
    io = new Server(server, {
        cors: {
            origin: '*',
            methods: ['GET', 'POST']
        }
    });

    io.on('connection', (socket: any) => {
        console.log(`Socket connected: ${socket.id}`);
        clients.push({ id: socket.id });

        if (clients.length == 1) startGridGeneration();

        socket.on('setBias', (char: string) => {
            if (/^[a-z]$/.test(char)) {
                socket.emit('gridUpdate', setBiasChar(char));
            }
        });

        socket.on('disconnect', () => {
            console.log(`Socket disconnected: ${socket.id}`);
            const index = clients.findIndex(c => c.id === socket.id);
            if (index !== -1) clients.splice(index, 1);
            if (clients.length == 0) stopGridGeneration();
        });
    });
}

export const sendGrid = (data: any) => io.emit('gridUpdated', JSON.stringify(data));