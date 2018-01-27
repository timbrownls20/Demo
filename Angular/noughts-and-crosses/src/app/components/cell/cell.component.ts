import { Component, OnInit, ViewEncapsulation, Output, Input, EventEmitter } from '@angular/core';
import { Cell, CellState } from '../../model/cell'

@Component({
  selector: 'app-cell',
  templateUrl: './cell.component.html',
  styleUrls: ['./cell.component.css'],
  encapsulation: ViewEncapsulation.Native
})
export class CellComponent implements OnInit {

  constructor() { }

  @Output() toggle = new EventEmitter<any>();
  @Input() row: number;
  @Input() column: number;

  model: Cell;
  className: string;

  ngOnInit() {
    this.model = new Cell(this.row, this.column);
    this.className = `cell_position_${this.row}_${this.column}`;
  }

  clicked() {

    console.log('clicked');

    this.toggle.emit();

    this.model.nextState();
  }

}
