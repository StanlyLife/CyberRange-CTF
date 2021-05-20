import { Subscription } from 'rxjs';
import { GameService } from './../game/game.service';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-game-element',
  templateUrl: './game-element.component.html',
  styleUrls: ['./game-element.component.scss']
})
export class GameElementComponent implements OnInit {

  constructor() { }
  @Input() gameName: string;
  @Input() gameId: string;
  @Input() Hidden: string;
  @Input() Icon: string;
  @Input() Description: string;
  @Input() Category: string;

  ngOnInit(): void {
  }

}
