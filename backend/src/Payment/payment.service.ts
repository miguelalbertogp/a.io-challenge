import { Payment } from './payment.model';
import { v4 as uuidv4 } from 'uuid';

let payments: Payment[] = [];

export class PaymentService {
    getAll(): Payment[] {
        return payments;
    }

    get(id: string): Payment | undefined {
        return payments.find((p: Payment) => p.id === id);
    }

    create(payment: Payment): Payment {
        payment.id = uuidv4();
        payment.created_at = new Date();
        payments.push(payment);
        return payment;
    }

    update(id: string, payment: Payment): boolean {
        const paymentIndex = payments.findIndex((p: Payment) => p.id === id);
        if (paymentIndex >= 0) {
            payments[paymentIndex].amount = payment.amount;
            payments[paymentIndex].code = payment.code;
            payments[paymentIndex].grid = payment.grid;
            payments[paymentIndex].name = payment.name;
            return true;
        };
        return false;
    }

    delete(id: string): boolean {
        const paymentIndex = payments.findIndex((p: Payment) => p.id === id);
        if (paymentIndex >= 0) {
            payments = payments.filter((p: Payment) => p.id !== id)
            return true;
        };
        return false;
    }
}