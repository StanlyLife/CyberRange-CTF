import { VmService } from './../../../shared/vm.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TaskService } from './../task.service';
import { TaskModel } from '../task-model';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-task-create',
  templateUrl: './task-create.component.html',
  styleUrls: ['./task-create.component.scss']
})
export class TaskCreateComponent implements OnInit {

  taskCreateForm: FormGroup;
  public taskModel : TaskModel = {
    TaskId: null,
    Icon: "",
    Name: "Task name",
    Description: "",
    Duration: 15,
    State: "",
    MaxPoints: 15,
    RandomFlag: false,
    Flag: "flagXKongKda",
    TemplateName: "CHOOSE VM TEMPLATE", 
  };

  vmTemplates = {};

  constructor(
    private ts: TaskService,
    private toastr: ToastrService,
    private router: Router,
    private vms: VmService
    ) { }

  ngOnInit(): void {
    this.vms.GetVmTemplates().subscribe(res => {
      this.vmTemplates = res
    }, error => {
      this.toastr.error("Unable to retrieve vm tempaltes");
      console.error(error);
      console.error(error.errorMessage);
    })

      this.taskCreateForm = new FormGroup({
        Icon: new FormControl(this.taskModel.Icon, []),
        Name: 
        new FormControl(this.taskModel.Name, [
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(50)
        ]),
        Description: 
        new FormControl(this.taskModel.Description, [
          Validators.required,
          Validators.minLength(20),
          Validators.maxLength(250)
        ]),
        Duration: new FormControl(this.taskModel.Duration, []),
        State: new FormControl(this.taskModel.State, []),
        MaxPoints: new FormControl(this.taskModel.MaxPoints, []),
        RandomFlag: new FormControl(this.taskModel.RandomFlag, []),
        Flag: new FormControl(this.taskModel.Flag, []),
        TemplateName: new FormControl(this.taskModel.TemplateName, []),
    });
  }
  public CreateTask = () => {
    console.log("Tried create task");
    this.taskModel = new TaskModel(this.taskCreateForm.value);
    this.ts.CreateTask(this.taskModel)
    .subscribe(res => {
      this.toastr.success("Task created");
      this.router.navigate(["/admin/task"]);
    },
    (error) => {
      this.toastr.error("Error on create task");
      this.toastr.warning(JSON.stringify(error));
      console.error(JSON.stringify(error));
    });
  }

  setNewImage(image: string): void {
    this.taskModel.TemplateName = image + "";
}

}
