import { Injectable } from '@angular/core';
import { Game, GameResult } from '../model/game';
import { CellState, Cell } from '../model/cell';

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

  updateGameResult(){

    var gridDimension: number[] = [1,2,3]

    debugger;

    //let app = this;

    for(let i of gridDimension){

      let resultSetRow: Cell[] = new Array<Cell>();
      let resultSetColumn: Cell[] = new Array<Cell>();
      

      for(let j of gridDimension){
        
        let rowCell:Cell = this.model.state[new Cell(i, j).index];
        if(rowCell !== undefined)
          resultSetRow.push(rowCell);

        let columnCell:Cell = this.model.state[new Cell(j, i).index];
        if(columnCell !== undefined)
          resultSetColumn.push(columnCell);
      }

      this.checkResultSet(resultSetRow);
      this.checkResultSet(resultSetColumn);

      // if(resultSet.length === 3){
        
      // if(resultSet[0].state === resultSet[1].state && resultSet[1].state === resultSet[2].state){

      //     if(resultSet[0].state === CellState.Cross)
      //       this.model.result = GameResult.CrossesWin;
      //     else
      //       this.model.result = GameResult.NoughtsWin;
      //   }

      // }

     
    }

  }

  private checkResultSet(resultSet: Cell[]): void{

    //let result: GameResult = GameResult.InProgress;

    if(resultSet.length === 3){
      
      if(resultSet[0].state === resultSet[1].state && resultSet[1].state === resultSet[2].state){

          if(resultSet[0].state === CellState.Cross)
            this.model.result = GameResult.CrossesWin;
          else
            this.model.result = GameResult.NoughtsWin;
        }

      }

  }


}
