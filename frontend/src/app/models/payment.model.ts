export interface PaymentModel {
    id?: string;
    name: string;
    ammount: number;
    code?: string;
    grid?: string[][];
    created_at?: Date;
}