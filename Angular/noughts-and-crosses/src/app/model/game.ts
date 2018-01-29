import { Cell, CellState } from './cell';

export class Game {
    
    state: Map<string, Cell>;

    result: GameState;

    constructor(){
        this.result = GameState.NoughtsTurn;
        this.state = new Map<string, Cell>();
    }

    get resultDisplay(): string{

        debugger;

        switch(this.result){
            case GameState.NoughtsTurn:
                return "Cross's Turn";
            case GameState.CrossesTurn:
                return "Nought's Turn";
            case GameState.CrossesWin:
                return "Crosses Win";
            case GameState.NoughtsWin:
                return "Noughts Win";
            case GameState.Draw:
                return "Draw";
       }

    }

}

export enum GameState {
    NoughtsTurn = 1,
    CrossesTurn = 2,
    NoughtsWin = 3,
    CrossesWin = 4,
    Draw = 5
}


