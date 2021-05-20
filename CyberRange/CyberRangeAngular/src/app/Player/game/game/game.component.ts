import { GameService } from './../../../admin/game/game.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {

  gameList = {};
  participatedPlayerGameList = {};
  participatedGameList = [];
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

    this.gs.GetAllParticipatedGames().subscribe(
      res => {
        this.participatedPlayerGameList = res;
        for(const prop in this.participatedPlayerGameList){
          var gameId = this.participatedPlayerGameList[prop]["gameId"];
          this.gs.GetGame(+gameId).subscribe(res => {
            // this.participatedGameList = {...res};
            console.log("Found games");
            console.log(res);
            this.participatedGameList.push(res);
          },(error) => {
            console.error("Unable to get game with id " + gameId);
          });
        }
      },
      (error) => {
        console.log("Error on getParticipatedGames");
        console.log(error);
      }
    );
    console.log(this.participatedGameList);
  }

}
