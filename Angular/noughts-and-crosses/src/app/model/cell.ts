export class Cell{

    row: number;
    column: number;
    state: CellState

    constructor(row:number, column: number){
        this.row = row;
        this.column = column;
        this.state = CellState.Empty;
    }

    // public nextState(): void{

    //     if(this.state < 2)
    //         this.state = this.state + 1;
    // }
}

export enum CellState
{
    Empty = 0,
    Nought = 1,
    Cross = 2
}