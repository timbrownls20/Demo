import { Injectable } from '@angular/core';
import { Game, GameState } from '../model/game';
import { CellState, Cell } from '../model/cell';

@Injectable()
export class GameService {

  model: Game;

  constructor() { 
    this.model = new Game();
  }

  
  nextTurn(): GameState {
    
    if(this.model.result === GameState.CrossesTurn){
        this.model.result = GameState.NoughtsTurn;
    }
    else  if(this.model.result === GameState.NoughtsTurn){
        this.model.result = GameState.CrossesTurn;
    }

    return this.model.result;
  }

  updateGameResult(){

    const gridDimension: number[] = [1,2,3]

    let resultSetDiagonal1: Cell[] = new Array<Cell>();
    let resultSetDiagonal2: Cell[] = new Array<Cell>();
    
    for(let i of gridDimension){

        let resultSetRow: Cell[] = new Array<Cell>();
        let resultSetColumn: Cell[] = new Array<Cell>();
        
        let diagonal1Cell:Cell = this.model.state.get(new Cell(i, i).index);
        if(diagonal1Cell !== undefined)
          resultSetDiagonal1.push(diagonal1Cell);

        let diagonal2Cell:Cell = this.model.state.get(new Cell(i, 4-i).index);
          if(diagonal2Cell !== undefined)
            resultSetDiagonal2.push(diagonal2Cell);

        for(let j of gridDimension){
          
          let rowCell:Cell = this.model.state.get(new Cell(i, j).index);
          if(rowCell !== undefined)
            resultSetRow.push(rowCell);

          let columnCell:Cell = this.model.state.get(new Cell(j, i).index);
          if(columnCell !== undefined)
            resultSetColumn.push(columnCell);
        }

        this.checkResultSet(resultSetRow);
        this.checkResultSet(resultSetColumn);

      }

      this.checkResultSet(resultSetDiagonal1);
      this.checkResultSet(resultSetDiagonal2);

      if(this.model.state.size === 9) 
        this.model.result = GameState.Draw;
  }

  private checkResultSet(resultSet: Cell[]): void{

    if(resultSet.length !== 3) return;
    
    let stateSet: Set<CellState> = new Set<CellState>();
    for(let result of resultSet){
      stateSet.add(result.state);  
    }

    if(stateSet.has(CellState.Cross) && !stateSet.has(CellState.Nought))
      this.model.result = GameState.CrossesWin;
    else if(stateSet.has(CellState.Nought) && !stateSet.has(CellState.Cross))
      this.model.result = GameState.NoughtsWin;

  }


}
