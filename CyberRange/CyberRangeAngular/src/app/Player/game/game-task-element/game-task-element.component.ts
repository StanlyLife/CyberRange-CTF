import { map } from 'rxjs/operators';
import { interval, Observable, timer, Subscription } from 'rxjs';
import { GameTaskFlagElementComponent } from './../game-task-flag-element/game-task-flag-element.component';
import { TaskModel } from './../../../admin/task/task-model';
import { GameService } from './../../../admin/game/game.service';
import { ActivatedRoute } from '@angular/router';
import { Component, Injector, Input, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { TaskService } from 'src/app/shared/task.service';

@Component({
  selector: 'app-game-task-element',
  templateUrl: './game-task-element.component.html',
  styleUrls: ['./game-task-element.component.scss'],
})
export class GameTaskElementComponent implements OnInit {

  @Input() state: string = "";
  @Input() taskName: string;
  @Input() taskId: string;
  @Input() Icon: string;
  @Input() Description: string;
  @Input() PointsAchievable: string;
  @Input() PointsRecieved: string;
  @Input() Duration: string;
  @Input() Timespent: string;
  @Input() Flag: string;
  @Input() RandomFlag: string;
  @Input() GameId: string;
  @Input() GameCategory: string;
  @Input() VmTemplateName: string;
  @Input() DeliveredFlags: string;
  //Tells the view about the origin
  @Input() Page: string;
  //Tells wether it is processing or not
  processing = false;
  public TaskModal : number;

  public ModalOpen : boolean = false;
  public DescriptionOpen : boolean = false;
  public vmInfo : boolean = false;
  
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

  overhundredminutes = false;
  StartCounter() {
    if(localStorage.getItem("cd"+"-t-"+this.taskId+"-g-"+this.GameId)){
      this.counter = this.ConvertStringToNumber(localStorage.getItem("cd"+"-t-"+this.taskId+"-g-"+this.GameId));
    }else {
      this.counter = this.ConvertStringToNumber(this.Duration) * 60;
    }

    this.countDown = timer(0, this.tick)
    .subscribe(() => {
      --this.counter;
      localStorage.setItem("cd"+"-t-"+this.taskId+"-g-"+this.GameId, this.counter+"");
      if(+this.counter > 6000){
        console.log(this.counter);
        this.overhundredminutes = true;
      }else {
        this.overhundredminutes = false;
      }
        if(this.counter <= 0 && this.state != "finished"){
          //SET TASK TIME IN LOCAL STORAGE
          //SET TASK STATE TO FINISHED
          this.ts.SetTaskFinished(this.taskId,this.GameId).subscribe();
          this.state = "finished";
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




  constructor(
    private gs:  GameService,
    private toastr: ToastrService,
    private activatedRoute: ActivatedRoute,
    private ts: TaskService
  ) { }
  public id: number;

  ngOnInit(): void {
    this.id = +this.activatedRoute.snapshot.paramMap.get('id');
    this.ts.GetPlayerTask(this.taskId,this.id).subscribe(res => {
      console.log("GETPLAYERTASK RES");
      this.PointsRecieved = res["pointsRecieved"]
      this.Timespent = res["timeSpent"]
      this.DeliveredFlags = res["numberOfFailedflags"]
    },error => {
      this.toastr.error("Unable to get finished game info");
      console.error(error);
    });
    if(this.state == "started") {
      this.StartCounter();
    }
  }

  public StartTask = () => {
    this.processing = true;
    this.gs.StartTaskForUserForGameForTask(+this.taskId, this.id).subscribe(res => {
      this.toastr.success("STARTED GAME");
      this.state = "started";
      this.StartCounter();
      this.processing = false;
    },
    (error) => {
      this.processing = false;
      console.error("CANNOT START TASK");
      this.toastr.error("Task could not be started");
    })
  }

  public toggleModal(){
    this.ModalOpen = !this.ModalOpen;
  }
  public toggleDescription(){
    this.DescriptionOpen = !this.DescriptionOpen;
  }
  public DeliverAnswer = (modalTaskId) => {
    this.TaskModal = modalTaskId;
    this.toggleModal();
  }

  public ToogleVmInfo = () => {
    this.vmInfo = !this.vmInfo;
  }

}
