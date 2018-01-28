import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { CellComponent } from '../cell/cell.component';
import { GameService } from '../../services/game.service';
import { Game } from '../../model/game';
import { Cell } from '../../model/cell';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.css']
})
export class GridComponent implements OnInit {

  constructor(private gameService: GameService) { }

  model: Game;

  ngOnInit() {
    this.model = this.gameService.model;
  }

  pushState(state: Cell) {
    this.gameService.model.state[state.index] = state;
    this.gameService.updateGameResult();
  }
}
