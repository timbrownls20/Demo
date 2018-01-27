import { Cell, CellState } from './cell';

export class Game {

    currentTurn: CellState;

    state: Cell[];

    constructor(){
        this.currentTurn = CellState.Nought;
        this.state = new Array<Cell>();
    }

}