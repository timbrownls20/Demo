import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { CellComponent } from '../cell/cell.component'

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.css'],
  //encapsulation: ViewEncapsulation.None
})
export class GridComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
