import { ToastrService } from 'ngx-toastr';
import { GameService } from './../../../admin/game/game.service';
import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-game-participate-modal-element',
  templateUrl: './game-participate-modal-element.component.html',
  styleUrls: ['./game-participate-modal-element.component.scss']
})
export class GameParticipateModalElementComponent implements OnInit {

  constructor(private gs: GameService, private toastr: ToastrService) { }
  @Input() gameId: number;
  @Input() gameName: string;
  ngOnInit(): void {
  }


  @Output() myEvent = new EventEmitter<string>();

  callParent() {
    this.myEvent.emit("");
  }
  password: string;
  public handleChange = (val, evnt) => {
    this.password = val;
  }

  ParticipateGameWithPassword(){
    this.gs.ParticipateGamePassword(this.gameId, this.password).subscribe(res => {
      console.log("REEEEEEEEEEEEEEEEEEEEES");
      console.log(res);
      if(res +"" == "true"){
        this.toastr.success("Password correct");
        window.location.reload();
      }else {
        this.toastr.warning("Wrong password");
      }
    });
  }
}
