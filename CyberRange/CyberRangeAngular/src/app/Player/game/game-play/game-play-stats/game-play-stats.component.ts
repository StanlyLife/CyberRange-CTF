import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';
import { GameService } from './../../../../admin/game/game.service';
import { ProfileService } from './../../../../shared/profile.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-game-play-stats',
  templateUrl: './game-play-stats.component.html',
  styleUrls: ['./game-play-stats.component.scss']
})
export class GamePlayStatsComponent implements OnInit {

  constructor(
    private gs: GameService, 
    private activatedRoute: ActivatedRoute,
    private toastr: ToastrService
    ) { }
  Id: number;
  public Stats : any = {};
  public resolved: boolean = false;
  ngOnInit(): void {
    this.Id = +this.activatedRoute.snapshot.paramMap.get('id');
    this.gs.GetGameStatsInfoForGame(this.Id).subscribe(res => {
      console.log(res);
      this.Stats = res;
      this.resolved = true;
    }, error => {
      this.toastr.error("Unable to get stas");
    });
  }

}
