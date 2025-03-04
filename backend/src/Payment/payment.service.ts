import { GridService } from '../Grid/grid.service';
import { Payment } from './payment.model';
import { v4 as uuidv4 } from 'uuid';
import { sendMessage } from '../utils/socket-io';

let payments: Payment[] = [];

export class PaymentService {
    gridSrv: GridService = new GridService();

    getAll(): Payment[] {
        return payments;
    }

    get(id: string): Payment | undefined {
        return payments.find((p: Payment) => p.id === id);
    }

    create(payment: Payment): Payment {
        payment.id = uuidv4();
        payment.created_at = new Date();
        payment.code = this.gridSrv.getCode();
        payment.grid = this.gridSrv.getCurrentGrid();
        
        payments.push(payment);

        sendMessage('paymentsUpdate', null);
        
        return payment;
    }

    update(id: string, payment: Payment): boolean {
        const paymentIndex = payments.findIndex((p: Payment) => p.id === id);
        if (paymentIndex >= 0) {
            payments[paymentIndex].ammount = payment.ammount;
            payments[paymentIndex].code = payment.code;
            payments[paymentIndex].grid = payment.grid;
            payments[paymentIndex].name = payment.name;
            return true;
        };

        sendMessage('paymentsUpdate', null);
        
        return false;
    }

    delete(id: string): boolean {
        const paymentIndex = payments.findIndex((p: Payment) => p.id === id);
        if (paymentIndex >= 0) {
            payments = payments.filter((p: Payment) => p.id !== id)
            return true;
        };

        sendMessage('paymentsUpdate', null);
        
        return false;
    }
}