import { Cell, CellState } from './cell';

export class Game {

    currentTurn: CellState;
  
    state: Map<string, Cell>;

    result: GameResult;

    constructor(){
        this.currentTurn = CellState.Nought;
        this.result = GameResult.InProgress;
        this.state = new Map<string, Cell>();
    }

    get resultDisplay(): string{

        switch(this.result){
            case GameResult.InProgress:
                return "";
            case GameResult.CrossesWin:
                return "Crosses Win";
            case GameResult.NoughtsWin:
                return "Noughts Win";
            case GameResult.Draw:
                return "Draw";
       }

    }

}

export enum GameResult {
    InProgress = 1,
    NoughtsWin = 2,
    CrossesWin = 3,
    Draw = 4
}


