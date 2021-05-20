import { GamestartedGuard } from './../../../../../shared/guards/gamestarted.guard';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-player-stats-component',
  templateUrl: './player-stats-component.component.html',
  styleUrls: ['./player-stats-component.component.scss']
})
export class PlayerStatsComponentComponent implements OnInit {

  @Input() FirstName : any;
  @Input() LastName : any;
  @Input() UserName : any;
  @Input() UserId : any;
  @Input() Email : any;
  @Input() ProfilePic : any;
  @Input() BannerPic : any;
  @Input() Points : any;
  @Input() Level : any;
  @Input() Biography: any;
  @Input() Id: any;
  @Input() Place: any;
  @Input() IsActive: any;
  @Input() GameState: any;
  constructor() { }

  ngOnInit(): void {
    console.log(this.GameState);
  }

}
