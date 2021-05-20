import { GameService } from './../../../admin/game/game.service';
import { ToastrGlobalService } from './../../../shared/toastr-global.service';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-game-task-flag-element',
  templateUrl: './game-task-flag-element.component.html',
  styleUrls: ['./game-task-flag-element.component.scss']
})
export class GameTaskFlagElementComponent implements OnInit {

  constructor(
    private toastr: ToastrService,
    private gs: GameService
  ) { }
  @Input() taskId: string;
  @Input() gameId: string;
  @Input() LeverteFlagg: number = 0;
  flag: string;
  Delivering: boolean = false;
  ngOnInit(): void {
  }

  @Output() myEvent = new EventEmitter<string>();

  callParent() {
    this.myEvent.emit("");
  }

  public DeliverFlag = () => {
    console.log(this.flag);
    this.gs.DeliverFlag(+this.taskId,+this.gameId,this.flag).subscribe(res => {
      if(res+"" == "true"){
        this.toastr.success("TASK COMPLETED!");
        window.location.reload();
      }else {
        this.toastr.warning("Incorrect flag");
        this.Delivering = false;
        this.LeverteFlagg++;
        if(+this.LeverteFlagg > 4){
          this.toastr.warning("Maximum amount of failed flags reached!")
          window.location.reload();
        }
      }
    },
    (error) => {
      this.Delivering = false;
      console.error("FLAG WAS NOT DELIVERED");
      this.toastr.error("Error: Flag was not delivered");
    });
  }
  public handleChange = (val, evnt) => {
    this.flag = val;
  }

}
