export class Cell{

    row: number;
    column: number;
    state: CellState

    constructor(row:number, column: number){
        this.row = row;
        this.column = column;
        this.state = CellState.Empty;
    }

}

export enum CellState
{
    Empty = 0,
    Nought = 1,
    Cross = 2
}