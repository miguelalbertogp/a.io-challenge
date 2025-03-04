"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentService = void 0;
const grid_service_1 = require("../Grid/grid.service");
const uuid_1 = require("uuid");
const socket_io_1 = require("../utils/socket-io");
let payments = [];
class PaymentService {
    constructor() {
        this.gridSrv = new grid_service_1.GridService();
    }
    getAll() {
        return payments;
    }
    get(id) {
        return payments.find((p) => p.id === id);
    }
    create(payment) {
        payment.id = (0, uuid_1.v4)();
        payment.created_at = new Date();
        payment.code = this.gridSrv.getCode();
        payment.grid = this.gridSrv.getCurrentGrid();
        payments.push(payment);
        (0, socket_io_1.sendMessage)('paymentsUpdate', null);
        return payment;
    }
    update(id, payment) {
        const paymentIndex = payments.findIndex((p) => p.id === id);
        if (paymentIndex >= 0) {
            payments[paymentIndex].ammount = payment.ammount;
            payments[paymentIndex].code = payment.code;
            payments[paymentIndex].grid = payment.grid;
            payments[paymentIndex].name = payment.name;
            return true;
        }
        ;
        (0, socket_io_1.sendMessage)('paymentsUpdate', null);
        return false;
    }
    delete(id) {
        const paymentIndex = payments.findIndex((p) => p.id === id);
        if (paymentIndex >= 0) {
            payments = payments.filter((p) => p.id !== id);
            return true;
        }
        ;
        (0, socket_io_1.sendMessage)('paymentsUpdate', null);
        return false;
    }
}
exports.PaymentService = PaymentService;
