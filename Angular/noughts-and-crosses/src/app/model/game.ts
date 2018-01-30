import { Cell, CellState } from './cell';

export class Game {
    
    state: Map<string, Cell>;

    currentTurn: GameTurn;

    constructor(){
        this.currentTurn = GameTurn.NoughtsTurn;
        this.state = new Map<string, Cell>();
    }

    get resultDisplay(): string{

        switch(this.currentTurn){
            case GameTurn.NoughtsTurn:
                return "Cross's Turn";
            case GameTurn.CrossesTurn:
                return "Nought's Turn";
            case GameTurn.CrossesWin:
                return "Crosses Win";
            case GameTurn.NoughtsWin:
                return "Noughts Win";
            case GameTurn.Draw:
                return "Draw";
       }
    }

    get isWon(): boolean {
        return this.currentTurn === GameTurn.CrossesWin || this.currentTurn === GameTurn.NoughtsWin;
    }
}

export enum GameTurn {
    NoughtsTurn = 1,
    CrossesTurn = 2,
    NoughtsWin = 3,
    CrossesWin = 4,
    Draw = 5
}


