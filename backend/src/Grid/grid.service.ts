import { sendGrid } from '../utils/socket-io';

type Grid = string[][];
const GRID_SIZE = 10;
let currentGrid: Grid;
let biasCharacter: string | null = null;

export class GridService {
    gridInterval: any = null;

    generateGrid = (): Grid => {
        let grid: Grid = Array.from({ length: GRID_SIZE }, () =>
            Array.from({ length: GRID_SIZE }, () => String.fromCharCode(97 + Math.floor(Math.random() * 26)))
        );

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

    getCurrentGrid = () : Grid => {
        return currentGrid;
    }

    getCode = () => {
        let code = '';
        const date = new Date();
        const seconds = date.getSeconds();
        const seconds_string = `${seconds < 10 ? '0' : ''}${seconds.toString()}`;
        if (!currentGrid) return code;
        const v = currentGrid[+seconds_string[0]][+seconds_string[1]];
        const count_v = this.countChar(v);
        const c = currentGrid[+seconds_string[1]][+seconds_string[0]];
        const count_c = this.countChar(c);
        code = `${count_v}${count_c}`;
        return code;
    }

    countChar = (char: string): number => {
        let count = 0;
        if (!currentGrid) return count;
        for (let x = 0; x < GRID_SIZE; x++) {
            for (let y = 0; y < GRID_SIZE; y++) {
                if (currentGrid[x][y] == char) count++
            }
        }
        return (this.divideNumber(count));
    }

    divideNumber = (count: number): number => {
        if (count <= 9) return count;
        for (let i = 2; i <= count; i++) {
            const res = count / i;
            if (res <= 9 && Number.isInteger(res)) {
                return res;
            }
        }
        return count;
    }

    updateGrid = () => {
        const grid: Grid = this.generateGrid();
        currentGrid = grid
        const code = this.getCode();
        sendGrid({ grid: currentGrid, code })
        return currentGrid
    };

    setBiasChar = (char: string) => {
        biasCharacter = char;
    }

    clearBiasChar = () => {
        biasCharacter = null;
    }

    startGridGeneration = () => {
        this.updateGrid();
        if (!this.gridInterval) {
            this.gridInterval = setInterval(this.updateGrid, 2000);
        }
    }

    stopGridGeneration = () => {
        if (this.gridInterval) {
            clearInterval(this.gridInterval);
            this.gridInterval = null;
        }
    }
}
