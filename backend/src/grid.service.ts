import { sendGrid } from './utils/socket-io';

const GRID_SIZE = 10;

type Grid = string[][];
export let currentGrid: Grid;
let biasCharacter: string | null = null;

let gridInterval: any = null;

export const generateGrid = (bias: string | null = null): Grid => {
    let grid: Grid = Array.from({ length: GRID_SIZE }, () =>
        Array.from({ length: GRID_SIZE }, () => String.fromCharCode(97 + Math.floor(Math.random() * 26)))
    );

    if (bias) {
        const totalCells = GRID_SIZE * GRID_SIZE;
        const biasCells = Math.floor(totalCells * 0.2);
        for (let i = 0; i < biasCells; i++) {
            const row = Math.floor(Math.random() * GRID_SIZE);
            const col = Math.floor(Math.random() * GRID_SIZE);
            grid[row][col] = bias;
        }
    }

    return grid;
};

export const getCode = () => {
    let code = '';
    const date = new Date();
    const seconds = date.getSeconds();
    const seconds_string = `${seconds < 10 ? '0' : ''}${seconds.toString()}`;
    if (!currentGrid) return code;
    const v = currentGrid[+seconds_string[0]][+seconds_string[1]];
    const c = currentGrid[+seconds_string[1]][+seconds_string[0]];
    return v;
}

const updateGrid = () => {
    const grid: Grid = generateGrid(biasCharacter);
    currentGrid = grid
    const code = getCode();
    sendGrid({ grid: currentGrid, code })
    return currentGrid
};

export const setBiasChar = (char: string) => {
    biasCharacter = char;
}

export const startGridGeneration = () => {
    updateGrid();
    if (!gridInterval) {
        gridInterval = setInterval(updateGrid, 2000);
    }
}

export const stopGridGeneration = () => {
    if (gridInterval) {
        clearInterval(gridInterval);
        gridInterval = null;
    }
}