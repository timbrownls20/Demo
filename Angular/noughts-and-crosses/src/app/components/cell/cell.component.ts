import { Component, OnInit, ViewEncapsulation, Output, Input, EventEmitter } from '@angular/core';
import { Cell, CellState } from '../../model/cell'
import { GameTurn } from '../../model/game'
import { GameService } from '../../services/game.service';
 
@Component({
  selector: 'app-cell',
  templateUrl: './cell.component.html',
  styleUrls: ['./cell.component.css'],
  encapsulation: ViewEncapsulation.Native
})
export class CellComponent implements OnInit {

  constructor(private gameService: GameService) { }

  @Output() changeState = new EventEmitter<Cell>();
  @Input() model: Cell;
  @Input() isWon: string;

  className: string;

  ngOnInit() {
    this.className = `cell_position_${this.model.row}_${this.model.column}`;
  }

  clicked() {
    
    if(this.model.state === CellState.Empty)
    {
      var nextTurn: GameTurn = this.gameService.nextTurn();

      if(nextTurn === GameTurn.NoughtsTurn)
        this.model.state = CellState.Nought;
      else if(nextTurn === GameTurn.CrossesTurn)
        this.model.state = CellState.Cross;
      
      if(this.model.state === CellState.Nought || this.model.state === CellState.Cross)
        this.changeState.emit(this.model);
    }
  }

}
