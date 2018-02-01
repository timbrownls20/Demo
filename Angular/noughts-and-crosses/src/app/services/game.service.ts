import { Injectable } from '@angular/core';
import { Game, GameTurn } from '../model/game';
import { CellState, Cell } from '../model/cell';

@Injectable()
export class GameService {

  model: Game;

  constructor() { 
    this.model = new Game();

    for(let i = 1; i <= 3; i++){
      for(let j = 1; j <= 3; j++){
        let cell: Cell = new Cell(i, j);
        this.model.state.set(cell.index, cell);
      }    
    }

  }

  
  nextTurn(): GameTurn {
    
    if(this.model.currentTurn === GameTurn.CrossesTurn){
        this.model.currentTurn = GameTurn.NoughtsTurn;
    }
    else  if(this.model.currentTurn === GameTurn.NoughtsTurn){
        this.model.currentTurn = GameTurn.CrossesTurn;
    }

    return this.model.currentTurn;
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

        this.checkWinningLine(resultSetRow);
        this.checkWinningLine(resultSetColumn);

      }

      this.checkWinningLine(resultSetDiagonal1);
      this.checkWinningLine(resultSetDiagonal2);
    
      if(this.checkForDraw()) this.model.currentTurn = GameTurn.Draw;

  }

  private checkForDraw(): boolean{
    
    let isDraw: boolean = true;
    for (var entry of Array.from(this.model.state)) {
        if(entry[1].state === CellState.Empty){
          isDraw = false;
        }
    }
    return isDraw;

  }

  private checkWinningLine(resultSet: Cell[]): void{

    if(resultSet.length !== 3) return;
    
    let stateSet: Set<CellState> = new Set<CellState>();
    for(let result of resultSet){
      stateSet.add(result.state);  
    }

    let winningLine = false;
    if(stateSet.has(CellState.Cross) && !stateSet.has(CellState.Nought) && !stateSet.has(CellState.Empty)){
      this.model.currentTurn = GameTurn.CrossesWin;
      winningLine = true;
    }
    else if(stateSet.has(CellState.Nought) && !stateSet.has(CellState.Cross) && !stateSet.has(CellState.Empty)){
      this.model.currentTurn = GameTurn.NoughtsWin;
      winningLine = true;
    }
     
    if(winningLine){
      for(let result of resultSet){
        result.winningLine = true;
      }
    }
  }


}
