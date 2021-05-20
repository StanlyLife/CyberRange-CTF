import { DatePipe } from '@angular/common';
import { error } from 'selenium-webdriver';
import { ToastrService } from 'ngx-toastr';
import { GameService } from '../../../admin/game/game.service';
import { Component, Input, OnInit } from '@angular/core';
import { BuiltinTypeName } from '@angular/compiler';
import { timer, Subscription } from 'rxjs';

@Component({
  selector: 'app-game-element',
  templateUrl: './game-element.component.html',
  styleUrls: ['./game-element.component.scss']
})
export class GameElementComponent implements OnInit {

  constructor(private gs: GameService, private toastr: ToastrService, private datePipe: DatePipe) { }
  @Input() gameName: string;
  @Input() gameId: string;
  @Input() Icon: string;
  @Input() Description: string;
  @Input() Category: string;
  @Input() start: string;
  @Input() Participated: boolean = false;
  @Input() Enddate: string;
  @Input() Hidden: string;
  @Input() PasswordRequired: string;
  @Input() State: string;
  @Input() TotalTimeSpent: string;
  @Input() TotalPointsRecieved: string;
  @Input() MaxTime: string;
  @Input() MaxPoints: string;


  /*
   *
   * Timer
   *
   *  
  */
    countDown:Subscription;
    counter: number;
    tick = 1000;
    ConvertStringToNumber(input: string) {
      var numeric = Number(input);
      return numeric;
   }
  
  
    StartCounter() {
      
      let dateTodayString = new Date(this.datePipe.transform(new Date(), "yyyy-MM-ddTHH:mm:ss")).getTime();
      let dateEndString = new Date(this.datePipe.transform(this.Enddate, "yyyy-MM-ddTHH:mm:ss")).getTime();
      this.counter =this.counter /1000;
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



  //Is player participant
  AllGamesParticipant: any = false;
  //Has retrieved information
  hasResolved : boolean = false;
  //Game has started
  started = false;
  //game has ended
  ended = false;
  //Countdown until start
  countdown = false;
  ngOnInit(): void {


    if(this.gameId != null && this.Participated == false){
      this.gs.HasParticipated(+this.gameId)
      .subscribe(res => {
        this.AllGamesParticipant = res;
        this.hasResolved = true;
        },(error) => {
          this.toastr.error("Unable to check if user is participant in game " + this.gameId);
          console.error("Error on check if user is participant");
        });
        
      }else {
        this.gs.GetGameStateInfo(+this.gameId).subscribe(res => {
          this.State = res["state"];
          this.TotalPointsRecieved = res["totalPoints"];
          this.TotalTimeSpent = res["totalTimeSpent"];
          this.MaxTime = res["maxTime"];
          this.MaxPoints = res["maxPoints"];
          console.log("REEEEEEEEEEEEEEEEEES");
          console.log(res);
          if(this.State == "finished"){
            this.started = false;
          }
          this.hasResolved = true;
        },error => {
          this.toastr.error("Unable to get game state info for: " + this.gameName);
          this.hasResolved = true;
        });
    
      }
      if(new Date(this.Enddate) < new Date() && this.Enddate != ""){
        this.ended = true;
      }else if(new Date(this.start) < new Date()){
        this.started = true;
      }else {
        //86400000 = 24 hours in milliseconds
        if(new Date(this.start).getTime() - new Date().getTime() < 86400000){
          this.countdown = true;
          this.counter = new Date(this.start).getTime() - new Date().getTime();
          this.StartCounter();
        }
      }
  }


  btnDisabled = false;

  public disableBtn = () => {
    this.btnDisabled = true;
  }

  public participate = (id) =>{
    this.btnDisabled = true;
    this.gs.ParticipateGame(+id).subscribe(
      res =>
      {
        location.reload();
        this.btnDisabled = false;
      },
      (error) => {
        this.btnDisabled = false;
        this.toastr.error("Error on participate game");
        console.error(error.errorMessage);
        // location.reload();
      }
    );
  }


  public modal : boolean = false;
  TogglePasswordModal(){
    this.modal = !this.modal;
  }
  public stats : boolean = false;
  ToggleStatisticsModal(){
    this.stats = !this.stats;
  }

}
