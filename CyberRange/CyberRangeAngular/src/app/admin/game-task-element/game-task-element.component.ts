import { ToastrGlobalService } from './../../shared/toastr-global.service';
import { GameService } from './../game/game.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-game-task-element',
  templateUrl: './game-task-element.component.html',
  styleUrls: ['./game-task-element.component.scss']
})
export class GameTaskElementComponent implements OnInit {


  @Output() AddToGame = new EventEmitter<string>();
  callParent() {
    this.AddToGame.emit("myString");
  }

  constructor(private gs: GameService,private toastr: ToastrService) { }
  @Input() taskName: string;
  @Input() taskId: string;
  @Input() Icon: string;
  @Input() Description: string;
  @Input() Points: string;
  @Input() Duration: string;
  @Input() Flag: string;
  @Input() RandomFlag: string;
  @Input() State: string;
  @Input() GameId: string;
  //Tells the view about the origin
  @Input() Page: string;
  //True if task is added to game
  // @Input() Added: boolean = false;
  
  /*
  *
  * LocalState
  * ----------
  * Based upon spawn, if spawn is under tasks that game already has
  * its local state should be added, else available.
  * These states never change in the component, only in the html.
  * ----------
  * Added - Added to game
  * Available - Not added to game
  */
  @Input() LocalState: string;

  //Directs whether the component should be visible
  public visible = true;
  public DescriptionOpen = false;

  toggleDescription() {
    this.DescriptionOpen = !this.DescriptionOpen;
  }



  ngOnInit(): void {
    this.CheckIfAdded();
  }

public AddTaskToGame = (taskId) => {
  this.gs.AddTaskToGame(taskId,+this.GameId).subscribe(res => {
    if(res+"" == "true"){
      this.callParent();
      this.toastr.success("Added task to game");
      this.CheckIfAdded();
      this.RemoveTask();
    }else {
      this.toastr.warning("Something happened, check if task already is a part of game");
    }
  },(error) => {
    this.toastr.error("Could not add task to game");
  });
}

public RemoveTask = () => {
  this.visible = false;
}

public CheckIfAdded = () => {
  var otherTasks = document.querySelector("#task" + this.taskId);
  if(otherTasks != null && this.LocalState == "Available"){
    this.visible = false;
  }
}

RemoveTaskFromGame() {
  this.gs.RemoveTaskFromGame(+this.GameId,+this.taskId).subscribe(res => {
    if(res + "" == "true"){
      this.toastr.success("Game removed");
      this.RemoveTask();
    }else {
      this.toastr.warning("Task was not removed from game, backend ERROR!");
    }
  }, error => {
    this.toastr.error("ERROR! Check console");
    console.error(error);
    console.error(error.errorMessage);
  });
}

}
