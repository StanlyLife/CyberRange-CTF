import { TaskService } from './../task.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-task-dashboard',
  templateUrl: './task-dashboard.component.html',
  styleUrls: ['./task-dashboard.component.scss']
})
export class TaskDashboardComponent implements OnInit {

  tasks = {};
  constructor(private ts : TaskService) { }


  ngOnInit(): void {
    this.ts.GetAllTasks().subscribe(res => {
      console.log("GOT ALL TASKS");
      console.log(res);
      this.tasks = res;
    },
    (error) => {
      console.log("Could not get all tasks");      
    });
  }

}
