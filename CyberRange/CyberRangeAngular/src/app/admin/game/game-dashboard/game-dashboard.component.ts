import { ValueArrayPipe } from './../../../pipes/value-array.pipe';
import { GameService } from './../game.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-game-dashboard',
  templateUrl: './game-dashboard.component.html',
  styleUrls: ['./game-dashboard.component.scss']
})
export class GameDashboardComponent implements OnInit {
  gameList = {};
  constructor(private gs: GameService) { 
  }

  ngOnInit(): void {
    this.gs.GetGames().subscribe(
      res => {
        console.log(res);
        this.gameList = res;
      },
      (error) => {
        console.log("Error on getGames");
        console.log(error);
      }
    );
  }
}
