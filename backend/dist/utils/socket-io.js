"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendMessage = exports.socketConnection = void 0;
const socket_io_1 = require("socket.io");
const grid_service_1 = require("../Grid/grid.service");
const gridSrv = new grid_service_1.GridService();
const clients = [];
let io;
const socketConnection = (server) => {
    io = new socket_io_1.Server(server, {
        cors: {
            origin: '*',
            methods: ['GET', 'POST']
        }
    });
    io.on('connection', (socket) => {
        console.log(`Socket connected: ${socket.id}`);
        clients.push({ id: socket.id });
        if (clients.length == 1)
            gridSrv.startGridGeneration();
        socket.on('setBias', (char) => {
            if (/^[a-z]$/.test(char)) {
                gridSrv.setBiasChar(char);
            }
        });
        socket.on('disconnect', () => {
            console.log(`Socket disconnected: ${socket.id}`);
            const index = clients.findIndex(c => c.id === socket.id);
            if (index !== -1)
                clients.splice(index, 1);
            if (clients.length == 0)
                gridSrv.stopGridGeneration();
        });
    });
};
exports.socketConnection = socketConnection;
const sendMessage = (event, data) => io.emit(event, data);
exports.sendMessage = sendMessage;
