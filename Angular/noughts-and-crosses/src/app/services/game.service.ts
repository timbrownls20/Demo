import { Injectable } from '@angular/core';
import { Game } from '../model/game';
import { CellState } from '../model/cell';

@Injectable()
export class GameService {

  model: Game;

  constructor() { 
    this.model = new Game();
  }

  
  nextTurn(): CellState {
    if(this.model.currentTurn === CellState.Nought){
        this.model.currentTurn = CellState.Cross;
    }
    else{
        this.model.currentTurn = CellState.Nought;
    }
    return this.model.currentTurn;
  }

}
