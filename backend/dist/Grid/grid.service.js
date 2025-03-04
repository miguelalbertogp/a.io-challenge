"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GridService = void 0;
const socket_io_1 = require("../utils/socket-io");
const GRID_SIZE = 10;
let currentGrid;
let biasCharacter = null;
class GridService {
    constructor() {
        this.gridInterval = null;
        this.generateGrid = () => {
            let grid = Array.from({ length: GRID_SIZE }, () => Array.from({ length: GRID_SIZE }, () => String.fromCharCode(97 + Math.floor(Math.random() * 26))));
            if (biasCharacter) {
                const totalCells = GRID_SIZE * GRID_SIZE;
                const biasCells = Math.floor(totalCells * 0.2);
                for (let i = 0; i < biasCells; i++) {
                    const row = Math.floor(Math.random() * GRID_SIZE);
                    const col = Math.floor(Math.random() * GRID_SIZE);
                    grid[row][col] = biasCharacter;
                }
            }
            return grid;
        };
        this.getCurrentGrid = () => {
            return currentGrid;
        };
        this.getCode = () => {
            let code = '';
            const date = new Date();
            const seconds = date.getSeconds();
            const seconds_string = `${seconds < 10 ? '0' : ''}${seconds.toString()}`;
            if (!currentGrid)
                return code;
            const v = currentGrid[+seconds_string[0]][+seconds_string[1]];
            const count_v = this.countChar(v);
            const c = currentGrid[+seconds_string[1]][+seconds_string[0]];
            const count_c = this.countChar(c);
            code = `${count_v}${count_c}`;
            return code;
        };
        this.countChar = (char) => {
            let count = 0;
            if (!currentGrid)
                return count;
            for (let x = 0; x < GRID_SIZE; x++) {
                for (let y = 0; y < GRID_SIZE; y++) {
                    if (currentGrid[x][y] == char)
                        count++;
                }
            }
            return (this.divideNumber(count));
        };
        this.divideNumber = (count) => {
            if (count <= 9)
                return count;
            for (let i = 2; i <= count; i++) {
                const res = count / i;
                if (res <= 9 && Number.isInteger(res)) {
                    return res;
                }
            }
            return count;
        };
        this.updateGrid = () => {
            const grid = this.generateGrid();
            currentGrid = grid;
            const code = this.getCode();
            (0, socket_io_1.sendMessage)('gridUpdated', { grid: currentGrid, code });
            return currentGrid;
        };
        this.setBiasChar = (char) => {
            (0, socket_io_1.sendMessage)('charDisable', { value: true, char: char });
            biasCharacter = char;
            setTimeout(() => {
                this.clearBiasChar();
                (0, socket_io_1.sendMessage)('charDisable', { value: false, char: '' });
            }, 4000);
        };
        this.clearBiasChar = () => {
            biasCharacter = null;
        };
        this.startGridGeneration = () => {
            this.updateGrid();
            if (!this.gridInterval) {
                this.gridInterval = setInterval(this.updateGrid, 2000);
            }
        };
        this.stopGridGeneration = () => {
            if (this.gridInterval) {
                clearInterval(this.gridInterval);
                this.gridInterval = null;
            }
        };
    }
}
exports.GridService = GridService;
