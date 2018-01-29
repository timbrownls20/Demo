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

}

export enum GameTurn {
    NoughtsTurn = 1,
    CrossesTurn = 2,
    NoughtsWin = 3,
    CrossesWin = 4,
    Draw = 5
}


