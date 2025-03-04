import express, { Router, Request, Response } from "express";
import { PaymentService } from "./payment.service";

const router: Router = express.Router();

const paymentSrv: PaymentService = new PaymentService();

router.get('/', async (_req: Request, res: Response) => {
    const payments = await paymentSrv.getAll();
    res.json(payments);
});

router.get('/:id', async (req: Request, res: Response) => {
    const payment = await paymentSrv.get(req.params.id);
    if (!payment) return res.status(404).json({ error: 'Payment not found' });
    res.json(payment);
});

router.post('/', async (req: Request, res: Response) => {
    const { name, ammount } = req.body;
    const payment = await paymentSrv.create({ name, ammount });
    res.status(201).json(payment);
});

router.put('/:id', async (req: Request, res: Response) => {
    const { name, ammount } = req.body;
    const updatedPayment = await paymentSrv.update(req.params.id, { name, ammount });
    if (!updatedPayment) return res.status(404).json({ error: 'Payment not found' });
    res.json(updatedPayment);
});

router.delete('/:id', async (req: Request, res: Response) => {
    const success = await paymentSrv.delete(req.params.id);
    if (!success) return res.status(404).json({ error: 'Payment not found' });
    res.status(204).send();
});


export default router;