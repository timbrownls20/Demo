import { CellState } from './cell';

export class Game {

    currentTurn: CellState;

    constructor(){
        this.currentTurn = CellState.Nought;
    }

}