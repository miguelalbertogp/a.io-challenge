export interface Payment {
    id?: string;
    name: string;
    amount: number;
    code: string;
    grid: string[][];
    created_at?: Date;
}