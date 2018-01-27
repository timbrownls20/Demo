import { Component, OnInit, ViewEncapsulation, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-cell',
  templateUrl: './cell.component.html',
  styleUrls: ['./cell.component.css'],
  encapsulation: ViewEncapsulation.Native
})
export class CellComponent implements OnInit {

  constructor() { }

  @Output() toggle = new EventEmitter<any>();

  state: string;

  ngOnInit() {
  }

  clicked() {

    console.log('clicked');

    this.toggle.emit();
    this.state = "cross";
  }

}
