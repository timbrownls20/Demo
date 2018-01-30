export class Cell{

    row: number;
    column: number;
    state: CellState
    winningLine: boolean

    constructor(row:number, column: number){
        this.row = row;
        this.column = column;
        this.state = CellState.Empty;
        this.winningLine = false;
    }

    get index(): string{
        return `${this.row}_${this.column}`;
    }

}

export enum CellState
{
    Empty = 0,
    Nought = 1,
    Cross = 2
}

