"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const grid_service_1 = require("./grid.service");
const gridSrv = new grid_service_1.GridService();
const router = express_1.default.Router();
router.get('/', (req, res) => {
    res.json(gridSrv.getCurrentGrid());
});
router.get('/test-code', (req, res) => {
    res.send(gridSrv.getCode());
});
exports.default = router;
