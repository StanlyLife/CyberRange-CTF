import { ToastrService } from 'ngx-toastr';
import { GameVmElementComponent } from './../game-vm-element/game-vm-element.component';
import { DatePipe } from '@angular/common';
import { Subscription, timer } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { GameService } from './../../../admin/game/game.service';
import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-game-play',
  templateUrl: './game-play.component.html',
  styleUrls: ['./game-play.component.scss']
})
export class GamePlayComponent implements OnInit {
  public id: number;
  public PlayerTasks = {};
  public gameInfo = {};
  GameInfoLoaded = false;
  public TaskAvailable: boolean = false;
  public vmInfo : boolean = false;

  public gameCategory: string;

  public tid: number = 0;
  public tid2: number = 0;
  public tid3: number = 0;


  constructor(
    private gs: GameService, 
    private activatedRoute: ActivatedRoute,
    private datePipe: DatePipe,
    private toastr: ToastrService
    ) { }

  /*
   *
   * 
   * Timer
   * 
   * 
  */
    countDown:Subscription;
    counter: number;
    tick = 1000;
    dateToday = new Date();
    dateEnd : number;
    dateText : number = 1;
    ConvertStringToNumber(input: string) {
      var numeric = Number(input);
      return numeric;
   }
  
  
    StartCounter() {
      
      let dateTodayString = new Date(this.datePipe.transform(this.dateToday, "yyyy-MM-ddTHH:mm:ss")).getTime();
      let dateEndString = new Date(this.datePipe.transform(this.dateEnd, "yyyy-MM-ddTHH:mm:ss")).getTime();
      this.tid = dateTodayString;
      this.tid2 = dateEndString;
      this.dateText = dateEndString - dateTodayString;
      this.tid3 = this.dateText;
      this.counter =this.dateText /1000;
      this.countDown = timer(0, this.tick)
        .subscribe(() => {
          if(this.counter > 0){
            --this.counter;
          }
        });
    }
    ngOnDestroy(){
      this.countDown=null;
    }
  
    /*
     *
     * Timer
     * 
     * 
    */




  ngOnInit(): void {
    this.id = +this.activatedRoute.snapshot.paramMap.get('id');
    this.gs.GetallTasksForGameForUser(this.id).subscribe(res => {
      console.log("PLAYER TASKS FOR GAME: ");
      console.log(res);
      this.PlayerTasks = res;
      this.TaskAvailable = true;
    },
    (error) => {
      console.error("COILD NOT FIND PLAYER TASKS FOR GAME ID: " + this.id);
    });
    this.gs.GetGameInfo(this.id).subscribe(res => {
      console.log(res)
      this.gameCategory = res["game"]["category"]
      this.gameInfo = res;
      this.GameInfoLoaded = true;
      this.dateEnd = this.gameInfo["game"]["endDate"];
      this.StartCounter();
    });
  }

  public ToogleVmInfo = () => {
    this.vmInfo = !this.vmInfo;
  }
  stats =  false;
  public ToogleStats = () => {
    this.stats = !this.stats;
  }


  FinishGame(){
    if (confirm('Do you want to finish the game? YOU CAN NOT UNDO THIS CHANGE')) {
      this.gs.FinishGame(this.id).subscribe(res => {
        if(res+"" == "true"){
          this.toastr.success("Finished game, well played!");
        }else {
          this.toastr.info("Game was not finished, have you already finished the game?");
        }
      }, error => {
        this.toastr.error("Unable to finish game!");
      });
    }else {
      this.toastr.info("Game was not finished");
    }
  }

}
