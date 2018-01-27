import { Cell, CellState } from './cell';

export class Game {

    currentTurn: CellState;

    //state: Cell[];
    state: Map<string, CellState>;


    constructor(){
        this.currentTurn = CellState.Nought;
        this.state = new Map<string, CellState>();
    }

}


