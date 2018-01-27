import { Component, OnInit, ViewEncapsulation, Output, Input, EventEmitter } from '@angular/core';
import { Cell, CellState } from '../../model/cell'
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
  @Input() row: number;
  @Input() column: number;

  model: Cell;
  className: string;

  

  ngOnInit() {
    this.model = new Cell(this.row, this.column);
    this.className = `cell_position_${this.row}_${this.column}`;
  }

  clicked() {

    if(this.model.state === CellState.Empty)
      this.model.state = this.gameService.nextTurn();
      this.changeState.emit(this.model);
  }

}
