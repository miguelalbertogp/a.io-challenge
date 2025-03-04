"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const payment_service_1 = require("./payment.service");
const router = express_1.default.Router();
const paymentSrv = new payment_service_1.PaymentService();
router.get('/', (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const payments = yield paymentSrv.getAll();
    res.json(payments);
}));
router.get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const payment = yield paymentSrv.get(req.params.id);
    if (!payment)
        return res.status(404).json({ error: 'Payment not found' });
    res.json(payment);
}));
router.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, ammount } = req.body;
    const payment = yield paymentSrv.create({ name, ammount });
    res.status(201).json(payment);
}));
router.put('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, ammount } = req.body;
    const updatedPayment = yield paymentSrv.update(req.params.id, { name, ammount });
    if (!updatedPayment)
        return res.status(404).json({ error: 'Payment not found' });
    res.json(updatedPayment);
}));
router.delete('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const success = yield paymentSrv.delete(req.params.id);
    if (!success)
        return res.status(404).json({ error: 'Payment not found' });
    res.status(204).send();
}));
exports.default = router;
