export class Cell{

    row: number;
    column: number;
    state: CellState

    constructor(row:number, column: number){
        this.row = row;
        this.column = column;
        this.state = CellState.Empty;
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


// export class GridPosition{
//     row: number;
//     column: number;

//     constructor(row:number, column: number){
//         this.row = row;
//         this.column = column;
//     }
// }
