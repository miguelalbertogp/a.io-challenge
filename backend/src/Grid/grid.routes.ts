import express, { Router, Request, Response } from "express";
import { GridService } from './grid.service';

const gridSrv: GridService = new GridService();

const router: Router = express.Router();
router.get('/', (req, res) => {
    res.json(gridSrv.getCurrentGrid());
});

router.get('/test-code', (req, res) => {
    res.send(gridSrv.getCode());
});

export default router;