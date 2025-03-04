"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
// Importação dos módulos necessários
const socket_io_1 = require("./utils/socket-io");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const http_1 = __importDefault(require("http"));
const grid_routes_1 = __importDefault(require("./Grid/grid.routes"));
const payment_routes_1 = __importDefault(require("./Payment/payment.routes"));
const PORT = process.env.PORT || 3000;
exports.app = (0, express_1.default)();
const server = http_1.default.createServer(exports.app);
exports.app.use((0, cors_1.default)({
    origin: '*',
    methods: ['GET', 'POST']
}));
exports.app.use(express_1.default.json());
(0, socket_io_1.socketConnection)(server);
exports.app.get('/', (req, res) => {
    res.send('Hello world!');
});
// APP ROUTES
exports.app.use('/grid', grid_routes_1.default);
exports.app.use('/payment', payment_routes_1.default);
server.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});
